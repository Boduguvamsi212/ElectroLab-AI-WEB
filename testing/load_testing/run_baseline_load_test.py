import os
import sys
import time
import json
import random
import threading
import statistics
import datetime
import urllib.request
import urllib.error
import shutil

# Reconfigure stdout/stderr for Windows UTF-8 console output
try:
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')
except Exception:
    pass

# Import the Excel generator
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from generate_load_test_excel import create_load_test_excel_report

BASE_URL = "http://localhost:5000"
DURATION_SEC = 60
CONCURRENT_USERS = 100
WEB_USERS_COUNT = 50
MOBILE_USERS_COUNT = 50

# Materials pool for simulated runs
MATERIALS = [
    "Stainless Steel 316L",
    "Carbon Steel 1018",
    "Alloy C276 (Hastelloy)",
    "Titanium Grade 5",
    "Copper-Nickel 90/10"
]

class RequestRecord:
    __slots__ = ("req_id", "timestamp_offset", "user_id", "platform", "method", "endpoint", "status_code", "latency_ms", "second_bin", "success")
    def __init__(self, req_id, timestamp_offset, user_id, platform, method, endpoint, status_code, latency_ms, second_bin, success):
        self.req_id = req_id
        self.timestamp_offset = timestamp_offset
        self.user_id = user_id
        self.platform = platform
        self.method = method
        self.endpoint = endpoint
        self.status_code = status_code
        self.latency_ms = latency_ms
        self.second_bin = second_bin
        self.success = success

def make_request(method, path, body=None, token=None):
    url = f"{BASE_URL}{path}"
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    
    data = json.dumps(body).encode("utf-8") if body else None
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    
    t0 = time.perf_counter()
    status_code = 0
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            status_code = resp.status
            if method != "HEAD":
                resp.read()
    except urllib.error.HTTPError as e:
        status_code = e.code
    except Exception as e:
        status_code = 599  # connection error
    t1 = time.perf_counter()
    latency_ms = (t1 - t0) * 1000.0
    return status_code, latency_ms

def virtual_user_worker(user_id, platform, stop_event, test_start_time, results_list, lock, live_tracker):
    local_records = []
    req_counter = 0
    auth_token = None

    # Step 0: Initial Login to obtain Token
    try:
        login_body = {"email": "alex@corrosion.lab", "password": "password123"}
        url = f"{BASE_URL}/api/auth/login"
        req = urllib.request.Request(url, data=json.dumps(login_body).encode("utf-8"), headers={"Content-Type": "application/json"}, method="POST")
        with urllib.request.urlopen(req, timeout=10) as resp:
            if resp.status == 200:
                payload = json.loads(resp.read().decode("utf-8"))
                auth_token = payload.get("token")
    except Exception:
        pass

    while not stop_event.is_set():
        # Pick realistic user actions based on platform
        if platform == "Web Workstation":
            actions = [
                ("GET", "/api/diagnostics", None, False),
                ("GET", "/api/materials", None, False),
                ("POST", "/api/measurements", {
                    "material": random.choice(MATERIALS),
                    "initVoltage": round(random.uniform(-0.6, -0.2), 2),
                    "finalVoltage": round(random.uniform(0.2, 0.6), 2),
                    "scanRate": round(random.uniform(0.1, 0.3), 3),
                    "pH": round(random.uniform(2.0, 9.0), 1),
                    "temperature": round(random.uniform(20.0, 60.0), 1),
                    "current": round(random.uniform(0.1, 2.5), 2)
                }, False),
                ("GET", "/api/predictions/latest", None, False),
                ("GET", "/api/measurements", None, False),
                ("GET", "/download", None, False)
            ]
        else: # Mobile Android App
            actions = [
                ("POST", "/api/auth/login", {"email": "alex@corrosion.lab", "password": "password123"}, False),
                ("GET", "/api/auth/profile", None, True),
                ("GET", "/api/diagnostics", None, False),
                ("POST", "/api/measurements", {
                    "material": random.choice(MATERIALS),
                    "initVoltage": -0.25,
                    "finalVoltage": 0.25,
                    "scanRate": 0.166,
                    "pH": 7.0,
                    "temperature": 25.0,
                    "current": 1.0
                }, False),
                ("GET", "/api/predictions/latest", None, False),
                ("GET", "/api/calibration", None, False),
                ("HEAD", "/apk", None, False)
            ]

        # Execute one action
        action = random.choice(actions)
        method, path, body, need_auth = action
        token_to_send = auth_token if need_auth else None

        req_time = time.time()
        offset_sec = req_time - test_start_time
        sec_bin = int(offset_sec)
        if sec_bin < 0:
            sec_bin = 0
        elif sec_bin >= DURATION_SEC:
            sec_bin = DURATION_SEC - 1

        req_counter += 1
        req_id = f"{user_id}-{req_counter:04d}"

        status, lat_ms = make_request(method, path, body, token_to_send)
        is_success = 200 <= status < 400

        record = RequestRecord(
            req_id=req_id,
            timestamp_offset=f"+{offset_sec:05.2f}s",
            user_id=user_id,
            platform=platform,
            method=method,
            endpoint=path,
            status_code=status,
            latency_ms=lat_ms,
            second_bin=sec_bin,
            success=is_success
        )
        local_records.append(record)
        with lock:
            live_tracker["count"] += 1

        # Realistic think time pacing: 20ms to 80ms between calls
        time.sleep(random.uniform(0.020, 0.080))

    with lock:
        results_list.extend(local_records)

def run_load_test():
    print("=" * 70)
    print(" [ELECTROLAB AI] -- CONCURRENT BASELINE LOAD TESTING")
    print(f" Target API: {BASE_URL}")
    print(f" Concurrency: {CONCURRENT_USERS} Virtual Users ({WEB_USERS_COUNT} Web + {MOBILE_USERS_COUNT} Mobile)")
    print(f" Duration: {DURATION_SEC} Seconds (1 Minute Continuous)")
    print("=" * 70)

    # Preflight check
    try:
        with urllib.request.urlopen(f"{BASE_URL}/api/diagnostics", timeout=5) as r:
            if r.status != 200:
                print(f"Preflight error: Backend returned status {r.status}")
                return
    except Exception as e:
        print(f"Preflight check failed: cannot reach {BASE_URL}. Error: {e}")
        return

    print("Preflight check passed. Launching 100 virtual user threads...")

    stop_event = threading.Event()
    results = []
    lock = threading.Lock()
    live_tracker = {"count": 0}
    threads = []

    test_start_time = time.time()

    # Spawn 50 Web Users
    for i in range(1, WEB_USERS_COUNT + 1):
        uid = f"WEB-USR-{i:02d}"
        t = threading.Thread(target=virtual_user_worker, args=(uid, "Web Workstation", stop_event, test_start_time, results, lock, live_tracker))
        t.daemon = True
        threads.append(t)

    # Spawn 50 Mobile App Users
    for i in range(1, MOBILE_USERS_COUNT + 1):
        uid = f"APP-USR-{i:02d}"
        t = threading.Thread(target=virtual_user_worker, args=(uid, "Mobile Android App", stop_event, test_start_time, results, lock, live_tracker))
        t.daemon = True
        threads.append(t)

    for t in threads:
        t.start()

    # Countdown loop across 60 seconds with live progress
    for sec in range(1, DURATION_SEC + 1):
        time.sleep(1.0)
        with lock:
            count_now = live_tracker["count"]
            rps_now = count_now / sec
        sys.stdout.write(f"\r[Progress: {sec:02d}/{DURATION_SEC}s] Completed: {count_now:,} requests | Current RPS: {rps_now:.1f} req/sec | Concurrency: {CONCURRENT_USERS} VU")
        sys.stdout.flush()

    stop_event.set()
    print("\n\nTest completed! Waiting for all worker threads to finalize...")
    for t in threads:
        t.join(timeout=2.0)

    total_duration = time.time() - test_start_time
    total_requests = len(results)
    successful_requests = sum(1 for r in results if r.success)
    failed_requests = total_requests - successful_requests
    overall_rps = total_requests / total_duration if total_duration > 0 else 0

    latencies = [r.latency_ms for r in results]
    latencies.sort()
    avg_latency = statistics.mean(latencies) if latencies else 0
    min_latency = latencies[0] if latencies else 0
    max_latency = latencies[-1] if latencies else 0
    p50_latency = latencies[int(len(latencies) * 0.50)] if latencies else 0
    p90_latency = latencies[int(len(latencies) * 0.90)] if latencies else 0
    p95_latency = latencies[int(len(latencies) * 0.95)] if latencies else 0
    p99_latency = latencies[int(len(latencies) * 0.99)] if latencies else 0
    success_rate = (successful_requests / total_requests * 100.0) if total_requests > 0 else 100.0

    print("=" * 70)
    print(" [ELECTROLAB AI] -- BASELINE LOAD TEST SUMMARY METRICS")
    print("=" * 70)
    print(f" Total Requests Completed: {total_requests:,}")
    print(f" Actual Test Duration:    {total_duration:.2f} seconds")
    print(f" Requests Per Second (RPS): {overall_rps:.2f} req/sec")
    print(f" Response Time - Average: {avg_latency:.2f} ms")
    print(f" Response Time - Min:     {min_latency:.2f} ms (Fastest)")
    print(f" Response Time - Max:     {max_latency:.2f} ms (Slowest)")
    print(f" Response Time - Median:  {p50_latency:.2f} ms")
    print(f" Response Time - P95:     {p95_latency:.2f} ms")
    print(f" Response Time - P99:     {p99_latency:.2f} ms")
    print(f" Successful Requests:     {successful_requests:,} ({success_rate:.2f}%)")
    print(f" Failed Requests:         {failed_requests}")
    print("=" * 70)

    # 1. Summary Data Dict
    summary_data = {
        "duration_sec": round(total_duration, 1),
        "total_requests": total_requests,
        "successful_requests": successful_requests,
        "failed_requests": failed_requests,
        "rps": round(overall_rps, 1),
        "avg_latency_ms": round(avg_latency, 1),
        "min_latency_ms": round(min_latency, 1),
        "max_latency_ms": round(max_latency, 1),
        "p50_latency_ms": round(p50_latency, 1),
        "p90_latency_ms": round(p90_latency, 1),
        "p95_latency_ms": round(p95_latency, 1),
        "p99_latency_ms": round(p99_latency, 1),
        "success_rate": round(success_rate, 2)
    }

    # 2. Platform Stats (Web vs Mobile)
    platform_stats = {}
    for p_name, u_count in [("Web Workstation", WEB_USERS_COUNT), ("Mobile Android App", MOBILE_USERS_COUNT)]:
        p_recs = [r for r in results if r.platform == p_name]
        p_lats = sorted([r.latency_ms for r in p_recs]) if p_recs else [0]
        p_success = sum(1 for r in p_recs if r.success)
        platform_stats[p_name] = {
            "users": u_count,
            "total_requests": len(p_recs),
            "rps": round(len(p_recs) / total_duration, 1),
            "avg_latency_ms": round(statistics.mean(p_lats), 1) if p_lats else 0,
            "min_latency_ms": round(p_lats[0], 1) if p_lats else 0,
            "max_latency_ms": round(p_lats[-1], 1) if p_lats else 0,
            "p95_latency_ms": round(p_lats[int(len(p_lats) * 0.95)], 1) if p_lats else 0,
            "success_rate": round((p_success / len(p_recs) * 100.0), 2) if p_recs else 100.0
        }

    # 3. Endpoint Stats Breakdown
    ep_map = {}
    for r in results:
        key = (r.endpoint, r.method)
        if key not in ep_map:
            ep_map[key] = []
        ep_map[key].append(r)

    endpoint_stats = []
    for (url, method), recs in sorted(ep_map.items()):
        e_lats = sorted([r.latency_ms for r in recs])
        e_errors = sum(1 for r in recs if not r.success)
        
        # Determine scope
        platforms = set(r.platform for r in recs)
        scope = "Shared (Web & App)" if len(platforms) > 1 else list(platforms)[0]
        
        endpoint_stats.append({
            "url": url,
            "method": method,
            "scope": scope,
            "calls": len(recs),
            "rps": round(len(recs) / total_duration, 1),
            "avg_ms": round(statistics.mean(e_lats), 1),
            "min_ms": round(e_lats[0], 1),
            "max_ms": round(e_lats[-1], 1),
            "p95_ms": round(e_lats[int(len(e_lats) * 0.95)], 1),
            "errors": e_errors
        })

    # 4. Second-by-Second Timeline Stats
    timeline_stats = []
    for s in range(DURATION_SEC):
        sec_recs = [r for r in results if r.second_bin == s]
        if sec_recs:
            s_lats = sorted([r.latency_ms for r in sec_recs])
            s_success = sum(1 for r in sec_recs if r.success)
            s_errors = len(sec_recs) - s_success
            timeline_stats.append({
                "second": s + 1,
                "users": CONCURRENT_USERS,
                "requests": len(sec_recs),
                "avg_ms": round(statistics.mean(s_lats), 1),
                "min_ms": round(s_lats[0], 1),
                "max_ms": round(s_lats[-1], 1),
                "p95_ms": round(s_lats[int(len(s_lats) * 0.95)], 1),
                "success_count": s_success,
                "error_count": s_errors,
                "success_rate": round(s_success / len(sec_recs) * 100.0, 1)
            })
        else:
            timeline_stats.append({
                "second": s + 1,
                "users": CONCURRENT_USERS,
                "requests": 0,
                "avg_ms": 0.0,
                "min_ms": 0.0,
                "max_ms": 0.0,
                "p95_ms": 0.0,
                "success_count": 0,
                "error_count": 0,
                "success_rate": 100.0
            })

    # 5. Sample traces (take 500 representative records evenly distributed)
    step = max(1, len(results) // 500)
    sample_traces = []
    for i in range(0, len(results), step):
        r = results[i]
        sample_traces.append({
            "req_id": r.req_id,
            "timestamp_offset": r.timestamp_offset,
            "user_id": r.user_id,
            "platform": r.platform,
            "method": r.method,
            "endpoint": r.endpoint,
            "status_code": r.status_code,
            "latency_ms": round(r.latency_ms, 1)
        })
        if len(sample_traces) >= 500:
            break

    # Generate Excel Report
    script_dir = os.path.dirname(os.path.abspath(__file__))
    workspace_root = os.path.abspath(os.path.join(script_dir, "..", ".."))
    
    excel_report_name = "ElectroLab_AI_Load_Testing_Report.xlsx"
    target_excel_path1 = os.path.join(script_dir, excel_report_name)
    target_excel_path2 = os.path.join(workspace_root, excel_report_name)

    print("\nGenerating professional multi-sheet Excel Report...")
    create_load_test_excel_report(summary_data, endpoint_stats, platform_stats, timeline_stats, sample_traces, target_excel_path1)
    
    # Copy to workspace root
    shutil.copy2(target_excel_path1, target_excel_path2)
    print(f"Report also copied to root: {target_excel_path2}")

    # Copy to Mobile App repo: C:\Users\vamsi B\OneDrive\Desktop\ai_corrosion_mobile
    mobile_repo_dir = r"C:\Users\vamsi B\OneDrive\Desktop\ai_corrosion_mobile"
    if os.path.exists(mobile_repo_dir):
        mobile_testing_dir = os.path.join(mobile_repo_dir, "testing", "load_testing")
        os.makedirs(mobile_testing_dir, exist_ok=True)
        shutil.copy2(target_excel_path1, os.path.join(mobile_repo_dir, excel_report_name))
        shutil.copy2(target_excel_path1, os.path.join(mobile_testing_dir, excel_report_name))
        shutil.copy2(__file__, os.path.join(mobile_testing_dir, "run_baseline_load_test.py"))
        shutil.copy2(os.path.join(script_dir, "generate_load_test_excel.py"), os.path.join(mobile_testing_dir, "generate_load_test_excel.py"))
        print(f"Successfully copied Load Testing suite and report to Mobile Repo: {mobile_repo_dir}")

    # Also save JSON summary
    summary_json_path = os.path.join(script_dir, "load_test_summary.json")
    with open(summary_json_path, "w", encoding="utf-8") as f:
        json.dump({
            "summary": summary_data,
            "platform_stats": platform_stats,
            "endpoint_stats": endpoint_stats
        }, f, indent=2)
    print(f"JSON summary saved to: {summary_json_path}")

    print("\nLOAD TESTING RUN COMPLETED SUCCESSFULLY!")

if __name__ == "__main__":
    run_load_test()

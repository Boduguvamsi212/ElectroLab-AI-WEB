package com.electrolab.corrosion.network;

import com.electrolab.corrosion.models.Alert;
import com.electrolab.corrosion.models.Calibration;
import com.electrolab.corrosion.models.DiagnosticsResponse;
import com.electrolab.corrosion.models.DiscussionMessage;
import com.electrolab.corrosion.models.LoginResponse;
import com.electrolab.corrosion.models.Material;
import com.electrolab.corrosion.models.Measurement;
import com.electrolab.corrosion.models.MeasurementRequest;

import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;

public interface ApiService {

    // ── Authentication ──────────────────────────────────────────
    @POST("auth/login")
    Call<LoginResponse> login(@Body Map<String, String> body);

    @POST("auth/signup")
    Call<LoginResponse> signup(@Body Map<String, String> body);

    @GET("auth/profile")
    Call<LoginResponse> getProfile(@Header("Authorization") String token);

    @POST("auth/profile")
    Call<LoginResponse> updateProfile(@Header("Authorization") String token,
                                       @Body Map<String, String> body);

    // ── Measurements ─────────────────────────────────────────────
    @GET("measurements")
    Call<List<Measurement>> getMeasurements();

    @POST("measurements")
    Call<Measurement> createMeasurement(@Body MeasurementRequest request);

    @GET("predictions/latest")
    Call<Measurement> getLatestPrediction();

    // ── Materials ────────────────────────────────────────────────
    @GET("materials")
    Call<List<Material>> getMaterials();

    // ── Calibration ──────────────────────────────────────────────
    @GET("calibration")
    Call<List<Calibration>> getCalibrations();

    @POST("calibration")
    Call<Calibration> createCalibration(@Header("Authorization") String token,
                                         @Body Map<String, String> body);

    // ── Hardware Diagnostics ─────────────────────────────────────
    @GET("diagnostics")
    Call<DiagnosticsResponse> getDiagnostics();

    // ── Discussion ───────────────────────────────────────────────
    @GET("discussion")
    Call<List<DiscussionMessage>> getDiscussion();

    @POST("discussion")
    Call<DiscussionMessage> postMessage(@Body Map<String, String> body);

    // ── Alerts ───────────────────────────────────────────────────
    @GET("alerts")
    Call<List<Alert>> getAlerts();

    // ── Settings ─────────────────────────────────────────────────
    @GET("settings")
    Call<Map<String, Object>> getSettings();

    @POST("settings")
    Call<Map<String, Object>> updateSettings(@Body Map<String, Object> body);
}

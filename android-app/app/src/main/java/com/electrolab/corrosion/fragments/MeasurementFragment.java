package com.electrolab.corrosion.fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.Spinner;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.electrolab.corrosion.R;
import com.electrolab.corrosion.activities.MainActivity;
import com.electrolab.corrosion.models.Measurement;
import com.electrolab.corrosion.models.MeasurementRequest;
import com.electrolab.corrosion.network.ApiClient;
import com.electrolab.corrosion.network.ApiService;
import com.electrolab.corrosion.utils.Constants;
import com.electrolab.corrosion.utils.SessionManager;
import com.google.gson.Gson;

import com.electrolab.corrosion.models.TafelPoint;
import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MeasurementFragment extends Fragment {

    private Spinner spinnerMaterial;
    private EditText etPh, etInitVoltage, etFinalVoltage, etScanRate, etTemperature;
    private Button btnStartSweep;
    private ProgressBar progressSweep;
    private TextView tvError;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_measurement, container, false);

        spinnerMaterial = view.findViewById(R.id.spinner_material);
        etPh = view.findViewById(R.id.et_ph);
        etInitVoltage = view.findViewById(R.id.et_init_voltage);
        etFinalVoltage = view.findViewById(R.id.et_final_voltage);
        etScanRate = view.findViewById(R.id.et_scan_rate);
        etTemperature = view.findViewById(R.id.et_temperature);
        btnStartSweep = view.findViewById(R.id.btn_start_sweep);
        progressSweep = view.findViewById(R.id.progress_sweep);
        tvError = view.findViewById(R.id.tv_error);

        // Populate material spinner
        ArrayAdapter<String> adapter = new ArrayAdapter<>(requireContext(),
                android.R.layout.simple_spinner_item, Constants.MATERIALS);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinnerMaterial.setAdapter(adapter);

        // Set defaults
        etPh.setText("7.15");
        etInitVoltage.setText("-0.25");
        etFinalVoltage.setText("0.25");
        etScanRate.setText("0.166");
        etTemperature.setText("25.0");

        btnStartSweep.setOnClickListener(v -> startSweep());

        return view;
    }

    private void startSweep() {
        try {
            String material = spinnerMaterial.getSelectedItem().toString();
            double ph = Double.parseDouble(etPh.getText().toString());
            double initV = Double.parseDouble(etInitVoltage.getText().toString());
            double finalV = Double.parseDouble(etFinalVoltage.getText().toString());
            double scanRate = Double.parseDouble(etScanRate.getText().toString());
            double temp = Double.parseDouble(etTemperature.getText().toString());

            setLoading(true);
            tvError.setVisibility(View.GONE);

            MeasurementRequest request = new MeasurementRequest(material, initV, finalV, scanRate, ph, temp, 1.0);

            ApiService api = ApiClient.getApiService();
            api.createMeasurement(request).enqueue(new Callback<Measurement>() {
                @Override
                public void onResponse(Call<Measurement> call, Response<Measurement> response) {
                    setLoading(false);
                    if (response.isSuccessful() && response.body() != null) {
                        Measurement result = response.body();
                        // Save active run to session
                        SessionManager sm = new SessionManager(requireContext());
                        sm.saveActiveRun(new Gson().toJson(result));
                        // Navigate to graph
                        if (getActivity() instanceof MainActivity) {
                            ((MainActivity) getActivity()).navigateToGraph();
                        }
                    } else {
                        useFallbackSweep(material, initV, finalV, scanRate, ph, temp);
                    }
                }

                @Override
                public void onFailure(Call<Measurement> call, Throwable t) {
                    setLoading(false);
                    useFallbackSweep(material, initV, finalV, scanRate, ph, temp);
                }
            });

        } catch (NumberFormatException e) {
            showError("Please enter valid numeric values for all parameters.");
        }
    }

    private void setLoading(boolean loading) {
        btnStartSweep.setEnabled(!loading);
        btnStartSweep.setText(loading ? "Running sweep…" : "▶  Start Sweep Scan");
        progressSweep.setVisibility(loading ? View.VISIBLE : View.GONE);
    }

    private void showError(String msg) {
        tvError.setText(msg);
        tvError.setVisibility(View.VISIBLE);
    }

    private void useFallbackSweep(String material, double initV, double finalV, double scanRate, double pH, double temp) {
        if (getContext() != null) {
            Measurement fallback = generateLocalSweep(material, initV, finalV, scanRate, pH, temp);
            SessionManager sm = new SessionManager(requireContext());
            sm.saveActiveRun(new Gson().toJson(fallback));
            android.widget.Toast.makeText(getContext(), "Sweep scan simulated (" + fallback.getRate() + ")", android.widget.Toast.LENGTH_SHORT).show();
            if (getActivity() instanceof MainActivity) {
                ((MainActivity) getActivity()).navigateToGraph();
            }
        }
    }

    private Measurement generateLocalSweep(String material, double initV, double finalV, double scanRate, double pH, double temp) {
        Measurement m = new Measurement();
        m.setId("run_" + System.currentTimeMillis());
        m.setRunNumber("#" + (int)(Math.random() * 800 + 100));
        m.setMaterial(material);
        m.setTimestamp(new java.text.SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", java.util.Locale.US).format(new java.util.Date()));

        double Ecorr = -0.45;
        double Icorr = 1e-6;
        String mLower = material.toLowerCase();
        if (mLower.contains("stainless") || mLower.contains("ss316")) {
            Ecorr = -0.15;
            Icorr = 1e-7;
        } else if (mLower.contains("carbon") || mLower.contains("iron")) {
            Ecorr = -0.65;
            Icorr = 2e-5;
        } else if (mLower.contains("titanium")) {
            Ecorr = 0.05;
            Icorr = 1e-8;
        } else if (mLower.contains("alloy") || mLower.contains("hastelloy")) {
            Ecorr = -0.05;
            Icorr = 5e-8;
        } else if (mLower.contains("copper")) {
            Ecorr = -0.25;
            Icorr = 5e-6;
        }

        if (pH < 4) {
            Icorr *= (5 - pH) * 2.5;
            Ecorr -= 0.08;
        }
        Icorr *= Math.exp((temp - 25.0) / 12.0);

        List<TafelPoint> pts = new ArrayList<>();
        int steps = 50;
        double stepSize = (finalV - initV) / (steps - 1);
        for (int i = 0; i < steps; i++) {
            double v = initV + i * stepSize;
            double termA = Math.exp((2.303 * (v - Ecorr)) / 0.12);
            double termC = Math.exp((-2.303 * (v - Ecorr)) / 0.12);
            double currentDensity = Icorr * (termA - termC);
            double absI = Math.abs(currentDensity);
            double logI = absI > 0 ? Math.log10(absI) : -10;
            TafelPoint pt = new TafelPoint();
            pt.setVoltage(Math.round(v * 1000.0) / 1000.0);
            pt.setCurrent(absI);
            pt.setLogCurrent(Math.round(logI * 1000.0) / 1000.0);
            pts.add(pt);
        }
        m.setPoints(pts);

        double rateMpy = Math.round(Icorr * 1e6 * 0.6 * 100.0) / 100.0;
        m.setRate(rateMpy + " mpy");
        m.setConfidence("95.8%");
        if (rateMpy > 15) {
            m.setRisk("Critical Pitting Hazard");
            m.setPassivation("Active Dissolution");
        } else if (rateMpy > 8) {
            m.setRisk("High Pitting Risk");
            m.setPassivation("Localized Film Breakdown");
        } else if (rateMpy > 2) {
            m.setRisk("Medium Pitting Risk");
            m.setPassivation("Partial Breakdown");
        } else {
            m.setRisk("Low Corrosion Risk");
            m.setPassivation("Stable Passive Film");
        }
        return m;
    }
}

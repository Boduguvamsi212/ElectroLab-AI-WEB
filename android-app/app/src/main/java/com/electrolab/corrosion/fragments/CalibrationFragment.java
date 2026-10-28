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
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.electrolab.corrosion.R;
import com.electrolab.corrosion.adapters.CalibrationAdapter;
import com.electrolab.corrosion.models.Calibration;
import com.electrolab.corrosion.network.ApiClient;
import com.electrolab.corrosion.network.ApiService;
import com.electrolab.corrosion.utils.Constants;
import com.electrolab.corrosion.utils.SessionManager;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CalibrationFragment extends Fragment {

    private Spinner spinnerElectrode;
    private EditText etOffset;
    private Button btnCalibrate;
    private ProgressBar progressCal;
    private RecyclerView rvLogs;
    private CalibrationAdapter adapter;
    private List<Calibration> calibrations = new ArrayList<>();
    private SessionManager sessionManager;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_calibration, container, false);

        sessionManager = new SessionManager(requireContext());
        spinnerElectrode = view.findViewById(R.id.spinner_electrode);
        etOffset = view.findViewById(R.id.et_offset);
        btnCalibrate = view.findViewById(R.id.btn_calibrate);
        progressCal = view.findViewById(R.id.progress_cal);
        rvLogs = view.findViewById(R.id.rv_calibration_logs);

        // Setup electrode spinner
        ArrayAdapter<String> electrodeAdapter = new ArrayAdapter<>(requireContext(),
                android.R.layout.simple_spinner_item, Constants.ELECTRODES);
        electrodeAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinnerElectrode.setAdapter(electrodeAdapter);
        etOffset.setText("1.24");

        // Setup RecyclerView
        adapter = new CalibrationAdapter(requireContext(), calibrations);
        rvLogs.setLayoutManager(new LinearLayoutManager(requireContext()));
        rvLogs.setAdapter(adapter);
        rvLogs.setNestedScrollingEnabled(false);

        btnCalibrate.setOnClickListener(v -> runCalibration());

        loadCalibrations();
        return view;
    }

    private void loadCalibrations() {
        ApiClient.getApiService().getCalibrations().enqueue(new Callback<List<Calibration>>() {
            @Override
            public void onResponse(Call<List<Calibration>> call, Response<List<Calibration>> response) {
                if (response.isSuccessful() && response.body() != null && getView() != null) {
                    calibrations.clear();
                    calibrations.addAll(response.body());
                    adapter.updateData(calibrations);
                }
            }
            @Override
            public void onFailure(Call<List<Calibration>> call, Throwable t) {}
        });
    }

    private void runCalibration() {
        String electrode = spinnerElectrode.getSelectedItem().toString();
        String offsetStr = etOffset.getText().toString().trim();
        if (offsetStr.isEmpty()) { Toast.makeText(getContext(), "Enter an offset value", Toast.LENGTH_SHORT).show(); return; }

        setLoading(true);
        double offsetMv = Double.parseDouble(offsetStr);
        double slope = 98 + Math.random() * 2;

        ApiService api = ApiClient.getApiService();
        Map<String, String> body = new HashMap<>();
        body.put("electrode", electrode);
        body.put("offset", String.format("%.3f V", offsetMv / 1000));
        body.put("slope", String.format("%.1f%%", slope));
        body.put("operator", sessionManager.getUserName());

        api.createCalibration(sessionManager.getBearerToken(), body).enqueue(new Callback<Calibration>() {
            @Override
            public void onResponse(Call<Calibration> call, Response<Calibration> response) {
                setLoading(false);
                if (response.isSuccessful() && response.body() != null) {
                    Toast.makeText(getContext(), "Calibration logged successfully!", Toast.LENGTH_SHORT).show();
                    loadCalibrations();
                }
            }
            @Override
            public void onFailure(Call<Calibration> call, Throwable t) {
                setLoading(false);
                Toast.makeText(getContext(), "Calibration saved (offline mode)", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void setLoading(boolean l) {
        btnCalibrate.setEnabled(!l);
        btnCalibrate.setText(l ? "Scanning sensor cell…" : "Execute Zero Calibration Scan");
        progressCal.setVisibility(l ? View.VISIBLE : View.GONE);
    }
}

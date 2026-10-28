package com.electrolab.corrosion.fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.electrolab.corrosion.R;
import com.electrolab.corrosion.activities.MainActivity;
import com.electrolab.corrosion.models.Measurement;
import com.electrolab.corrosion.network.ApiClient;
import com.electrolab.corrosion.network.ApiService;
import com.electrolab.corrosion.utils.SessionManager;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class DashboardFragment extends Fragment {

    private TextView tvTotalRuns, tvConfidence;
    private TextView tvDashMaterial, tvDashRate, tvDashRisk;
    private Button btnNewMeasurement, btnViewHistory;
    private SessionManager sessionManager;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_dashboard, container, false);

        sessionManager = new SessionManager(requireContext());

        tvTotalRuns = view.findViewById(R.id.tv_total_runs);
        tvConfidence = view.findViewById(R.id.tv_confidence);
        tvDashMaterial = view.findViewById(R.id.tv_dash_material);
        tvDashRate = view.findViewById(R.id.tv_dash_rate);
        tvDashRisk = view.findViewById(R.id.tv_dash_risk);
        btnNewMeasurement = view.findViewById(R.id.btn_new_measurement);
        btnViewHistory = view.findViewById(R.id.btn_view_history);

        // Quick actions
        btnNewMeasurement.setOnClickListener(v -> {
            if (getActivity() instanceof MainActivity) {
                ((MainActivity) getActivity()).loadFragment(new MeasurementFragment(), "Measurement Input", 0, 1);
            }
        });

        btnViewHistory.setOnClickListener(v -> {
            if (getActivity() instanceof MainActivity) {
                ((MainActivity) getActivity()).loadFragment(new HistoryFragment(), "Experiment History", 0, 4);
            }
        });

        loadLatestPrediction();
        return view;
    }

    private void loadLatestPrediction() {
        ApiService api = ApiClient.getApiService();
        api.getLatestPrediction().enqueue(new Callback<Measurement>() {
            @Override
            public void onResponse(Call<Measurement> call, Response<Measurement> response) {
                if (response.isSuccessful() && response.body() != null && getView() != null) {
                    Measurement m = response.body();
                    tvDashMaterial.setText(m.getMaterial());
                    tvDashRate.setText(m.getRate());
                    tvDashRisk.setText(m.getRisk());
                    tvConfidence.setText(m.getConfidence());
                }
            }

            @Override
            public void onFailure(Call<Measurement> call, Throwable t) {
                // Keep default mock values in XML
            }
        });

        // Load total runs count
        api.getMeasurements().enqueue(new Callback<java.util.List<Measurement>>() {
            @Override
            public void onResponse(Call<java.util.List<Measurement>> call,
                                   Response<java.util.List<Measurement>> response) {
                if (response.isSuccessful() && response.body() != null && getView() != null) {
                    tvTotalRuns.setText(String.valueOf(response.body().size()));
                }
            }

            @Override
            public void onFailure(Call<java.util.List<Measurement>> call, Throwable t) {}
        });
    }
}

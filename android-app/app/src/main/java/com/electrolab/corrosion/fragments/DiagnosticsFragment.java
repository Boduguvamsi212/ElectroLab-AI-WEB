package com.electrolab.corrosion.fragments;

import android.graphics.Color;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.electrolab.corrosion.R;
import com.electrolab.corrosion.models.DiagnosticsResponse;
import com.electrolab.corrosion.network.ApiClient;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class DiagnosticsFragment extends Fragment {

    private Button btnRunDiag;
    private ProgressBar progressDiag;
    private TextView tvError;
    private LinearLayout layoutChannels, layoutChecklist, layoutChecklistItems, layoutStatusOk;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_diagnostics, container, false);

        btnRunDiag = view.findViewById(R.id.btn_run_diag);
        progressDiag = view.findViewById(R.id.progress_diag);
        tvError = view.findViewById(R.id.tv_error);
        layoutChannels = view.findViewById(R.id.layout_channels);
        layoutChecklist = view.findViewById(R.id.layout_checklist);
        layoutChecklistItems = view.findViewById(R.id.layout_checklist_items);
        layoutStatusOk = view.findViewById(R.id.layout_status_ok);

        btnRunDiag.setOnClickListener(v -> runDiagnostics());

        // Auto-load on open
        runDiagnostics();
        return view;
    }

    private void runDiagnostics() {
        btnRunDiag.setEnabled(false);
        btnRunDiag.setText("Scanning channels…");
        progressDiag.setVisibility(View.VISIBLE);
        tvError.setVisibility(View.GONE);
        layoutChannels.setVisibility(View.GONE);
        layoutChecklist.setVisibility(View.GONE);
        layoutStatusOk.setVisibility(View.GONE);

        ApiClient.getApiService().getDiagnostics().enqueue(new Callback<DiagnosticsResponse>() {
            @Override
            public void onResponse(Call<DiagnosticsResponse> call, Response<DiagnosticsResponse> response) {
                if (getView() == null) return;
                progressDiag.setVisibility(View.GONE);
                btnRunDiag.setEnabled(true);
                btnRunDiag.setText("♥  Start System Diagnostics");

                if (response.isSuccessful() && response.body() != null) {
                    DiagnosticsResponse data = response.body();
                    bindChannels(data.getChannels());
                    bindChecklist(data.getChecks());
                    if ("Healthy".equals(data.getStatus())) {
                        layoutStatusOk.setVisibility(View.VISIBLE);
                    }
                } else {
                    tvError.setText("Failed to load diagnostics from server.");
                    tvError.setVisibility(View.VISIBLE);
                }
            }

            @Override
            public void onFailure(Call<DiagnosticsResponse> call, Throwable t) {
                if (getView() == null) return;
                progressDiag.setVisibility(View.GONE);
                btnRunDiag.setEnabled(true);
                btnRunDiag.setText("♥  Start System Diagnostics");
                tvError.setText("Cannot reach backend server. Showing offline mode.");
                tvError.setVisibility(View.VISIBLE);
            }
        });
    }

    private void bindChannels(List<DiagnosticsResponse.Channel> channels) {
        if (channels == null || getContext() == null) return;
        layoutChannels.removeAllViews();

        for (DiagnosticsResponse.Channel ch : channels) {
            // Inflate channel card
            View card = LayoutInflater.from(requireContext()).inflate(R.layout.item_channel, layoutChannels, false);

            TextView tvId = card.findViewById(R.id.tv_channel_id);
            TextView tvStatus = card.findViewById(R.id.tv_channel_status);
            TextView tvLimit = card.findViewById(R.id.tv_volt_limit);
            TextView tvNoise = card.findViewById(R.id.tv_noise_ratio);

            tvId.setText(ch.getId() + " (" + ch.getName() + ")");
            tvStatus.setText(ch.getStatus());
            tvLimit.setText("Limit: " + ch.getVoltLimit());
            tvNoise.setText("Noise density ratio: " + ch.getNoiseRatio());

            boolean isOk = "OK".equals(ch.getStatus());
            tvStatus.setTextColor(Color.parseColor(isOk ? "#4ADE80" : "#F87171"));
            tvStatus.setBackgroundResource(isOk ? R.drawable.badge_success : R.drawable.badge_danger);

            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
            params.setMargins(0, 0, 0, 24);
            card.setLayoutParams(params);

            layoutChannels.addView(card);
        }
        layoutChannels.setVisibility(View.VISIBLE);
    }

    private void bindChecklist(DiagnosticsResponse.Checks checks) {
        if (checks == null || getContext() == null) return;
        layoutChecklistItems.removeAllViews();

        addCheckRow("Potentiostat Cell Lock:", checks.isPotentiostatLock() ? "LOCKED (Armed)" : "DISARMED",
                checks.isPotentiostatLock() ? "#4ADE80" : "#FBBF24");
        addCheckRow("Impedance ADC Analyzer:", checks.getImpedanceAnalyzerADC(), "#FFFFFF");
        addCheckRow("Electrolyte Temperature:", checks.getTemperatureProbe(), "#FFFFFF");
        addCheckRow("Cooling Enclosure Fans:", checks.getCoolingFans(), "#FFFFFF");
        addCheckRow("Flash Storage:", checks.getFlashStorage(), "#FFFFFF");

        layoutChecklist.setVisibility(View.VISIBLE);
    }

    private void addCheckRow(String label, String value, String valueColor) {
        LinearLayout row = new LinearLayout(requireContext());
        row.setOrientation(LinearLayout.HORIZONTAL);
        LinearLayout.LayoutParams rowParams = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
        rowParams.setMargins(0, 0, 0, 16);
        row.setLayoutParams(rowParams);

        TextView tvLabel = new TextView(requireContext());
        tvLabel.setText(label);
        tvLabel.setTextColor(Color.parseColor("#A5B4FC"));
        tvLabel.setTextSize(12f);
        tvLabel.setTypeface(android.graphics.Typeface.MONOSPACE);
        LinearLayout.LayoutParams labelParams = new LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f);
        tvLabel.setLayoutParams(labelParams);

        TextView tvValue = new TextView(requireContext());
        tvValue.setText(value);
        tvValue.setTextColor(Color.parseColor(valueColor));
        tvValue.setTextSize(12f);
        tvValue.setTypeface(android.graphics.Typeface.MONOSPACE);

        row.addView(tvLabel);
        row.addView(tvValue);
        layoutChecklistItems.addView(row);
    }
}

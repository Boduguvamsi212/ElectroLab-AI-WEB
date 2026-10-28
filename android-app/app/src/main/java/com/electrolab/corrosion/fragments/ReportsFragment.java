package com.electrolab.corrosion.fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.electrolab.corrosion.R;
import com.electrolab.corrosion.models.Measurement;
import com.electrolab.corrosion.network.ApiClient;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ReportsFragment extends Fragment {

    private TextView tvReportTotal, tvReportAvgRate, tvReportHighRisk;
    private Button btnGeneratePdf;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_reports, container, false);

        tvReportTotal = view.findViewById(R.id.tv_report_total);
        tvReportAvgRate = view.findViewById(R.id.tv_report_avg_rate);
        tvReportHighRisk = view.findViewById(R.id.tv_report_high_risk);
        btnGeneratePdf = view.findViewById(R.id.btn_generate_pdf);

        btnGeneratePdf.setOnClickListener(v ->
                Toast.makeText(getContext(), "PDF report generation requires desktop sync.", Toast.LENGTH_LONG).show());

        loadReportStats();
        return view;
    }

    private void loadReportStats() {
        ApiClient.getApiService().getMeasurements().enqueue(new Callback<List<Measurement>>() {
            @Override
            public void onResponse(Call<List<Measurement>> call, Response<List<Measurement>> response) {
                if (getView() == null) return;
                if (response.isSuccessful() && response.body() != null) {
                    List<Measurement> list = response.body();
                    tvReportTotal.setText(String.valueOf(list.size()));

                    int highRisk = 0;
                    for (Measurement m : list) {
                        if (m.getRisk().toLowerCase().contains("high") ||
                                m.getRisk().toLowerCase().contains("critical")) {
                            highRisk++;
                        }
                    }
                    tvReportHighRisk.setText(highRisk + " runs");
                }
            }

            @Override
            public void onFailure(Call<List<Measurement>> call, Throwable t) {}
        });
    }
}

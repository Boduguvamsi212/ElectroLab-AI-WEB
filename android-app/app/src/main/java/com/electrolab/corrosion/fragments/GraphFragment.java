package com.electrolab.corrosion.fragments;

import android.graphics.Color;
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
import com.electrolab.corrosion.models.TafelPoint;
import com.electrolab.corrosion.network.ApiClient;
import com.electrolab.corrosion.utils.SessionManager;
import com.github.mikephil.charting.charts.LineChart;
import com.github.mikephil.charting.components.XAxis;
import com.github.mikephil.charting.components.YAxis;
import com.github.mikephil.charting.data.Entry;
import com.github.mikephil.charting.data.LineData;
import com.github.mikephil.charting.data.LineDataSet;
import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class GraphFragment extends Fragment {

    private LineChart lineChart;
    private TextView tvTitle, tvMaterial, tvRate, tvRisk, tvConfidence, tvPassivation;
    private Button btnViewResults;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_graph, container, false);

        lineChart = view.findViewById(R.id.line_chart);
        tvTitle = view.findViewById(R.id.tv_graph_title);
        tvMaterial = view.findViewById(R.id.tv_graph_material);
        tvRate = view.findViewById(R.id.tv_rate);
        tvRisk = view.findViewById(R.id.tv_risk);
        tvConfidence = view.findViewById(R.id.tv_confidence);
        tvPassivation = view.findViewById(R.id.tv_passivation);
        btnViewResults = view.findViewById(R.id.btn_view_results);

        setupChart();
        loadActiveRun();

        btnViewResults.setOnClickListener(v -> {
            if (getActivity() instanceof MainActivity) {
                ((MainActivity) getActivity()).loadFragment(new AIPredictionFragment(), "AI Predictions", 1, 3);
            }
        });

        return view;
    }

    private void setupChart() {
        lineChart.setBackgroundColor(Color.TRANSPARENT);
        lineChart.getDescription().setEnabled(false);
        lineChart.setDrawGridBackground(false);
        lineChart.getLegend().setTextColor(Color.parseColor("#A5B4FC"));
        lineChart.getLegend().setTextSize(11f);

        XAxis xAxis = lineChart.getXAxis();
        xAxis.setPosition(XAxis.XAxisPosition.BOTTOM);
        xAxis.setTextColor(Color.parseColor("#A5B4FC"));
        xAxis.setGridColor(Color.parseColor("#1A1E40AF"));
        xAxis.setAxisLineColor(Color.parseColor("#06B6D4"));
        xAxis.setLabelCount(5);

        YAxis leftAxis = lineChart.getAxisLeft();
        leftAxis.setTextColor(Color.parseColor("#A5B4FC"));
        leftAxis.setGridColor(Color.parseColor("#1A1E40AF"));
        leftAxis.setAxisLineColor(Color.parseColor("#06B6D4"));

        lineChart.getAxisRight().setEnabled(false);
    }

    private void loadActiveRun() {
        SessionManager sm = new SessionManager(requireContext());
        String runJson = sm.getActiveRun();

        if (runJson != null) {
            Measurement run = new Gson().fromJson(runJson, Measurement.class);
            populateChart(run);
            return;
        }

        // Fallback: fetch latest from backend
        ApiClient.getApiService().getLatestPrediction().enqueue(new Callback<Measurement>() {
            @Override
            public void onResponse(Call<Measurement> call, Response<Measurement> response) {
                if (response.isSuccessful() && response.body() != null && getView() != null) {
                    populateChart(response.body());
                }
            }
            @Override
            public void onFailure(Call<Measurement> call, Throwable t) {}
        });
    }

    private void populateChart(Measurement run) {
        if (run == null || getView() == null) return;

        tvMaterial.setText("Material: " + run.getMaterial());
        tvRate.setText(run.getRate());
        tvRisk.setText(run.getRisk());
        tvConfidence.setText(run.getConfidence());
        tvPassivation.setText(run.getPassivation());

        // Set risk color
        boolean highRisk = run.getRisk().toLowerCase().contains("high") ||
                run.getRisk().toLowerCase().contains("critical");
        tvRisk.setTextColor(Color.parseColor(highRisk ? "#F87171" : "#FBBF24"));

        List<TafelPoint> points = run.getPoints();
        if (points == null || points.isEmpty()) return;

        List<Entry> entries = new ArrayList<>();
        for (TafelPoint pt : points) {
            entries.add(new Entry((float) pt.getVoltage(), (float) pt.getLogCurrent()));
        }

        LineDataSet dataSet = new LineDataSet(entries, "log|i| vs E (Tafel Curve)");
        dataSet.setColor(Color.parseColor("#06B6D4"));
        dataSet.setLineWidth(2.5f);
        dataSet.setDrawCircles(false);
        dataSet.setDrawValues(false);
        dataSet.setMode(LineDataSet.Mode.CUBIC_BEZIER);

        LineData lineData = new LineData(dataSet);
        lineChart.setData(lineData);
        lineChart.invalidate();
        lineChart.animateX(800);
    }
}

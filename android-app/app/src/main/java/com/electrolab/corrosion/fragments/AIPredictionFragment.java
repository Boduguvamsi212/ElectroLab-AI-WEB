package com.electrolab.corrosion.fragments;

import android.graphics.Color;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.electrolab.corrosion.R;
import com.electrolab.corrosion.models.Measurement;
import com.electrolab.corrosion.network.ApiClient;
import com.electrolab.corrosion.utils.SessionManager;
import com.google.gson.Gson;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AIPredictionFragment extends Fragment {

    private ProgressBar progressPrediction;
    private TextView tvRiskLabel, tvPredMaterial, tvPredRate, tvPredConfidence, tvPredPassivation;
    private LinearLayout layoutRecommendations;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_ai_prediction, container, false);

        progressPrediction = view.findViewById(R.id.progress_prediction);
        tvRiskLabel = view.findViewById(R.id.tv_risk_label);
        tvPredMaterial = view.findViewById(R.id.tv_pred_material);
        tvPredRate = view.findViewById(R.id.tv_pred_rate);
        tvPredConfidence = view.findViewById(R.id.tv_pred_confidence);
        tvPredPassivation = view.findViewById(R.id.tv_pred_passivation);
        layoutRecommendations = view.findViewById(R.id.layout_recommendations);

        loadPrediction();
        return view;
    }

    private void loadPrediction() {
        progressPrediction.setVisibility(View.VISIBLE);

        // Try session first
        SessionManager sm = new SessionManager(requireContext());
        String runJson = sm.getActiveRun();
        if (runJson != null) {
            Measurement run = new Gson().fromJson(runJson, Measurement.class);
            bindData(run);
            progressPrediction.setVisibility(View.GONE);
            return;
        }

        ApiClient.getApiService().getLatestPrediction().enqueue(new Callback<Measurement>() {
            @Override
            public void onResponse(Call<Measurement> call, Response<Measurement> response) {
                if (getView() == null) return;
                progressPrediction.setVisibility(View.GONE);
                if (response.isSuccessful() && response.body() != null) {
                    bindData(response.body());
                }
            }

            @Override
            public void onFailure(Call<Measurement> call, Throwable t) {
                if (getView() != null) progressPrediction.setVisibility(View.GONE);
            }
        });
    }

    private void bindData(Measurement run) {
        if (run == null || getView() == null) return;

        tvRiskLabel.setText(run.getRisk());
        boolean highRisk = run.getRisk().toLowerCase().contains("high") ||
                run.getRisk().toLowerCase().contains("critical");
        tvRiskLabel.setTextColor(Color.parseColor(highRisk ? "#F87171" : "#FBBF24"));

        tvPredMaterial.setText(run.getMaterial());
        tvPredRate.setText(run.getRate());
        tvPredConfidence.setText(run.getConfidence());
        tvPredPassivation.setText(run.getPassivation());

        buildRecommendations(run);
    }

    private void buildRecommendations(Measurement run) {
        layoutRecommendations.removeAllViews();

        String mat = run.getMaterial().toLowerCase();
        String[][] actions;

        if (mat.contains("carbon")) {
            actions = new String[][]{
                {"Apply Protective Barrier Coating",
                 "Coat carbon steel with a dual-layer epoxy or high-durability polyurethane. Delays electrolyte interaction by 5-7 years."},
                {"Impressed Current Cathodic Protection (ICCP)",
                 "Apply negative potential polarization to suppress anodic iron dissolution zones."}
            };
        } else if (mat.contains("stainless")) {
            actions = new String[][]{
                {"Chemical Passivation Bath (ASTM A967)",
                 "Treat with nitric/citric acid solution to enrich surface chromium oxide passive film."},
                {"Mitigate Chloride Concentration",
                 "Ensure halide exposure remains under 150 ppm to prevent passive film breakdown."}
            };
        } else {
            actions = new String[][]{
                {"Corrosion Inhibitor Injection",
                 "Introduce film-forming organic amine inhibitors to block surface active sites."},
                {"Regular Potentiodynamic Monitoring",
                 "Perform calibration and baseline sweeps every 30 days to catch active transitions."}
            };
        }

        for (String[] action : actions) {
            View card = LayoutInflater.from(requireContext()).inflate(
                    android.R.layout.two_line_list_item, null);
            LinearLayout recommendation = new LinearLayout(requireContext());
            recommendation.setOrientation(LinearLayout.VERTICAL);
            recommendation.setBackgroundResource(R.drawable.bg_card_glass);
            recommendation.setPadding(32, 24, 32, 24);

            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
            params.setMargins(0, 0, 0, 20);
            recommendation.setLayoutParams(params);

            TextView tvTitle = new TextView(requireContext());
            tvTitle.setText(action[0]);
            tvTitle.setTextColor(Color.WHITE);
            tvTitle.setTextSize(13f);
            tvTitle.setTypeface(android.graphics.Typeface.DEFAULT_BOLD);
            recommendation.addView(tvTitle);

            TextView tvDesc = new TextView(requireContext());
            tvDesc.setText(action[1]);
            tvDesc.setTextColor(Color.parseColor("#A5B4FC"));
            tvDesc.setTextSize(12f);
            tvDesc.setLineSpacing(4f, 1.3f);
            recommendation.addView(tvDesc);

            layoutRecommendations.addView(recommendation);
        }
    }
}

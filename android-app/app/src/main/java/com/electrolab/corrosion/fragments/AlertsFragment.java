package com.electrolab.corrosion.fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ProgressBar;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.electrolab.corrosion.R;
import com.electrolab.corrosion.adapters.AlertAdapter;
import com.electrolab.corrosion.models.Alert;
import com.electrolab.corrosion.network.ApiClient;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AlertsFragment extends Fragment {

    private RecyclerView rvAlerts;
    private ProgressBar progressAlerts;
    private AlertAdapter adapter;
    private List<Alert> alerts = new ArrayList<>();

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_alerts, container, false);

        rvAlerts = view.findViewById(R.id.rv_alerts);
        progressAlerts = view.findViewById(R.id.progress_alerts);

        adapter = new AlertAdapter(requireContext(), alerts);
        rvAlerts.setLayoutManager(new LinearLayoutManager(requireContext()));
        rvAlerts.setAdapter(adapter);

        loadAlerts();
        return view;
    }

    private void loadAlerts() {
        progressAlerts.setVisibility(View.VISIBLE);
        ApiClient.getApiService().getAlerts().enqueue(new Callback<List<Alert>>() {
            @Override
            public void onResponse(Call<List<Alert>> call, Response<List<Alert>> response) {
                if (getView() == null) return;
                progressAlerts.setVisibility(View.GONE);
                if (response.isSuccessful() && response.body() != null) {
                    alerts.clear();
                    alerts.addAll(response.body());
                    adapter.updateData(alerts);
                }
            }

            @Override
            public void onFailure(Call<List<Alert>> call, Throwable t) {
                if (getView() != null) progressAlerts.setVisibility(View.GONE);
            }
        });
    }
}

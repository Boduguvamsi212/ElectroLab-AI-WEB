package com.electrolab.corrosion.fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.electrolab.corrosion.R;
import com.electrolab.corrosion.adapters.HistoryAdapter;
import com.electrolab.corrosion.models.Measurement;
import com.electrolab.corrosion.network.ApiClient;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class HistoryFragment extends Fragment {

    private RecyclerView rvHistory;
    private ProgressBar progressHistory;
    private TextView tvEmpty;
    private HistoryAdapter adapter;
    private List<Measurement> measurements = new ArrayList<>();

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_history, container, false);

        rvHistory = view.findViewById(R.id.rv_history);
        progressHistory = view.findViewById(R.id.progress_history);
        tvEmpty = view.findViewById(R.id.tv_empty);

        adapter = new HistoryAdapter(requireContext(), measurements, measurement -> {
            // On click: store as active run and navigate to graph
            com.electrolab.corrosion.utils.SessionManager sm =
                    new com.electrolab.corrosion.utils.SessionManager(requireContext());
            sm.saveActiveRun(new com.google.gson.Gson().toJson(measurement));
            if (getActivity() instanceof com.electrolab.corrosion.activities.MainActivity) {
                ((com.electrolab.corrosion.activities.MainActivity) getActivity())
                        .loadFragment(new GraphFragment(), "Tafel Graph", 0, 2);
            }
        });

        rvHistory.setLayoutManager(new LinearLayoutManager(requireContext()));
        rvHistory.setAdapter(adapter);

        loadHistory();
        return view;
    }

    private void loadHistory() {
        progressHistory.setVisibility(View.VISIBLE);
        ApiClient.getApiService().getMeasurements().enqueue(new Callback<List<Measurement>>() {
            @Override
            public void onResponse(Call<List<Measurement>> call, Response<List<Measurement>> response) {
                if (getView() == null) return;
                progressHistory.setVisibility(View.GONE);
                if (response.isSuccessful() && response.body() != null) {
                    measurements.clear();
                    measurements.addAll(response.body());
                    adapter.updateData(measurements);
                    tvEmpty.setVisibility(measurements.isEmpty() ? View.VISIBLE : View.GONE);
                } else {
                    tvEmpty.setVisibility(View.VISIBLE);
                }
            }

            @Override
            public void onFailure(Call<List<Measurement>> call, Throwable t) {
                if (getView() != null) {
                    progressHistory.setVisibility(View.GONE);
                    tvEmpty.setVisibility(View.VISIBLE);
                }
            }
        });
    }
}

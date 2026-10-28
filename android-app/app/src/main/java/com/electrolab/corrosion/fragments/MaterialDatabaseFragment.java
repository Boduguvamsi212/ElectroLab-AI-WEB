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
import com.electrolab.corrosion.adapters.MaterialAdapter;
import com.electrolab.corrosion.models.Material;
import com.electrolab.corrosion.network.ApiClient;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MaterialDatabaseFragment extends Fragment {

    private RecyclerView rvMaterials;
    private ProgressBar progressMaterials;
    private MaterialAdapter adapter;
    private List<Material> materials = new ArrayList<>();

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_material_database, container, false);

        rvMaterials = view.findViewById(R.id.rv_materials);
        progressMaterials = view.findViewById(R.id.progress_materials);

        adapter = new MaterialAdapter(requireContext(), materials);
        rvMaterials.setLayoutManager(new LinearLayoutManager(requireContext()));
        rvMaterials.setAdapter(adapter);

        loadMaterials();
        return view;
    }

    private void loadMaterials() {
        progressMaterials.setVisibility(View.VISIBLE);
        ApiClient.getApiService().getMaterials().enqueue(new Callback<List<Material>>() {
            @Override
            public void onResponse(Call<List<Material>> call, Response<List<Material>> response) {
                if (getView() == null) return;
                progressMaterials.setVisibility(View.GONE);
                if (response.isSuccessful() && response.body() != null) {
                    materials.clear();
                    materials.addAll(response.body());
                    adapter.updateData(materials);
                }
            }

            @Override
            public void onFailure(Call<List<Material>> call, Throwable t) {
                if (getView() != null) progressMaterials.setVisibility(View.GONE);
            }
        });
    }
}

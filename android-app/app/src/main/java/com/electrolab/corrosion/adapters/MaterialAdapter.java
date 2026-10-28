package com.electrolab.corrosion.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.electrolab.corrosion.R;
import com.electrolab.corrosion.models.Material;
import java.util.List;

public class MaterialAdapter extends RecyclerView.Adapter<MaterialAdapter.ViewHolder> {
    private List<Material> materials;
    private final Context context;

    public MaterialAdapter(Context context, List<Material> materials) {
        this.context = context;
        this.materials = materials;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.item_material, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Material m = materials.get(position);
        holder.tvName.setText(m.getName());
        holder.tvClass.setText(m.getMaterialClass());
        holder.tvDescription.setText(m.getDescription());
        holder.tvDensity.setText(m.getDensity());
        holder.tvEqWeight.setText(m.getEqWeight());
        holder.tvPitting.setText(m.getPittingResistance());
    }

    @Override
    public int getItemCount() { return materials != null ? materials.size() : 0; }

    public void updateData(List<Material> data) { this.materials = data; notifyDataSetChanged(); }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvName, tvClass, tvDescription, tvDensity, tvEqWeight, tvPitting;
        ViewHolder(@NonNull View v) {
            super(v);
            tvName = v.findViewById(R.id.tv_mat_name);
            tvClass = v.findViewById(R.id.tv_mat_class);
            tvDescription = v.findViewById(R.id.tv_mat_description);
            tvDensity = v.findViewById(R.id.tv_density);
            tvEqWeight = v.findViewById(R.id.tv_eq_weight);
            tvPitting = v.findViewById(R.id.tv_pitting);
        }
    }
}

package com.electrolab.corrosion.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.electrolab.corrosion.R;
import com.electrolab.corrosion.models.Measurement;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class HistoryAdapter extends RecyclerView.Adapter<HistoryAdapter.ViewHolder> {
    private List<Measurement> measurements;
    private Context context;
    private OnItemClickListener listener;

    public interface OnItemClickListener {
        void onItemClick(Measurement measurement);
    }

    public HistoryAdapter(Context context, List<Measurement> measurements, OnItemClickListener listener) {
        this.context = context;
        this.measurements = measurements;
        this.listener = listener;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.item_history, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Measurement m = measurements.get(position);
        holder.tvRunNumber.setText(m.getRunNumber());
        holder.tvMaterial.setText(m.getMaterial());
        holder.tvRate.setText("Rate: " + m.getRate());

        // Risk badge
        holder.tvRiskBadge.setText(m.getRisk());
        boolean isHighRisk = m.getRisk().toLowerCase().contains("high") || m.getRisk().toLowerCase().contains("critical");
        holder.tvRiskBadge.setTextColor(context.getResources().getColor(isHighRisk ? R.color.colorDanger : R.color.colorWarning, null));

        // Timestamp formatting
        try {
            SimpleDateFormat inputFmt = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.US);
            SimpleDateFormat outputFmt = new SimpleDateFormat("MMM d, HH:mm", Locale.US);
            Date date = inputFmt.parse(m.getTimestamp());
            holder.tvTimestamp.setText(outputFmt.format(date));
        } catch (Exception e) {
            holder.tvTimestamp.setText("—");
        }

        holder.itemView.setOnClickListener(v -> {
            if (listener != null) listener.onItemClick(m);
        });
    }

    @Override
    public int getItemCount() {
        return measurements != null ? measurements.size() : 0;
    }

    public void updateData(List<Measurement> newData) {
        this.measurements = newData;
        notifyDataSetChanged();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvRunNumber, tvMaterial, tvRate, tvRiskBadge, tvTimestamp;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            tvRunNumber = itemView.findViewById(R.id.tv_run_number);
            tvMaterial = itemView.findViewById(R.id.tv_material);
            tvRate = itemView.findViewById(R.id.tv_rate);
            tvRiskBadge = itemView.findViewById(R.id.tv_risk_badge);
            tvTimestamp = itemView.findViewById(R.id.tv_timestamp);
        }
    }
}

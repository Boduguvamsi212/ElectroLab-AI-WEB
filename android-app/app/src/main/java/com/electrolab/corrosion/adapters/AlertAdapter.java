package com.electrolab.corrosion.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.electrolab.corrosion.R;
import com.electrolab.corrosion.models.Alert;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class AlertAdapter extends RecyclerView.Adapter<AlertAdapter.ViewHolder> {
    private List<Alert> alerts;
    private final Context context;

    public AlertAdapter(Context context, List<Alert> alerts) {
        this.context = context;
        this.alerts = alerts;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.item_alert, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Alert a = alerts.get(position);
        holder.tvTitle.setText(a.getTitle());
        holder.tvDescription.setText(a.getDescription());
        holder.tvSeverity.setText(a.getSeverity() != null ? a.getSeverity() : "Warning");
        holder.tvStatus.setText("● " + (a.getStatus() != null ? a.getStatus() : "Active"));
        try {
            SimpleDateFormat inputFmt = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.US);
            SimpleDateFormat outputFmt = new SimpleDateFormat("MMM d", Locale.US);
            Date date = inputFmt.parse(a.getTimestamp());
            holder.tvTime.setText(outputFmt.format(date));
        } catch (Exception e) { holder.tvTime.setText(""); }
    }

    @Override
    public int getItemCount() { return alerts != null ? alerts.size() : 0; }

    public void updateData(List<Alert> data) { this.alerts = data; notifyDataSetChanged(); }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvTitle, tvDescription, tvSeverity, tvStatus, tvTime;
        ViewHolder(@NonNull View v) {
            super(v);
            tvTitle = v.findViewById(R.id.tv_alert_title);
            tvDescription = v.findViewById(R.id.tv_alert_description);
            tvSeverity = v.findViewById(R.id.tv_severity);
            tvStatus = v.findViewById(R.id.tv_alert_status);
            tvTime = v.findViewById(R.id.tv_alert_time);
        }
    }
}

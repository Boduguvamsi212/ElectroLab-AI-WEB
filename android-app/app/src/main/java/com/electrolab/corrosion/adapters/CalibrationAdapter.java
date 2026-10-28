package com.electrolab.corrosion.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.electrolab.corrosion.R;
import com.electrolab.corrosion.models.Calibration;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class CalibrationAdapter extends RecyclerView.Adapter<CalibrationAdapter.ViewHolder> {
    private List<Calibration> calibrations;
    private Context context;

    public CalibrationAdapter(Context context, List<Calibration> calibrations) {
        this.context = context;
        this.calibrations = calibrations;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.item_calibration, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Calibration c = calibrations.get(position);
        holder.tvElectrode.setText(c.getElectrode());
        holder.tvSlope.setText(c.getSlope() + " Slope");
        holder.tvOffsetOperator.setText("Offset: " + c.getOffset() + " | " + c.getOperator());

        try {
            SimpleDateFormat inputFmt = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.US);
            SimpleDateFormat outputFmt = new SimpleDateFormat("MMM d", Locale.US);
            Date date = inputFmt.parse(c.getTimestamp());
            holder.tvCalDate.setText(outputFmt.format(date));
        } catch (Exception e) {
            holder.tvCalDate.setText("—");
        }
    }

    @Override
    public int getItemCount() {
        return calibrations != null ? calibrations.size() : 0;
    }

    public void updateData(List<Calibration> newData) {
        this.calibrations = newData;
        notifyDataSetChanged();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvElectrode, tvSlope, tvOffsetOperator, tvCalDate;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            tvElectrode = itemView.findViewById(R.id.tv_electrode);
            tvSlope = itemView.findViewById(R.id.tv_slope);
            tvOffsetOperator = itemView.findViewById(R.id.tv_offset_operator);
            tvCalDate = itemView.findViewById(R.id.tv_cal_date);
        }
    }
}

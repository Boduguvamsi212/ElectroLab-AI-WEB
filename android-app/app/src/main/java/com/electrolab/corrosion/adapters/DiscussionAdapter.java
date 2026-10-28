package com.electrolab.corrosion.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.electrolab.corrosion.R;
import com.electrolab.corrosion.models.DiscussionMessage;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class DiscussionAdapter extends RecyclerView.Adapter<DiscussionAdapter.ViewHolder> {
    private List<DiscussionMessage> messages;
    private final Context context;

    public DiscussionAdapter(Context context, List<DiscussionMessage> messages) {
        this.context = context;
        this.messages = messages;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.item_discussion, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        DiscussionMessage msg = messages.get(position);
        holder.tvSender.setText(msg.getSender());
        holder.tvRole.setText(msg.getRole());
        holder.tvContent.setText(msg.getContent());
        try {
            SimpleDateFormat inputFmt = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.US);
            SimpleDateFormat outputFmt = new SimpleDateFormat("HH:mm", Locale.US);
            Date date = inputFmt.parse(msg.getTimestamp());
            holder.tvTime.setText(outputFmt.format(date));
        } catch (Exception e) { holder.tvTime.setText(""); }
    }

    @Override
    public int getItemCount() { return messages != null ? messages.size() : 0; }

    public void updateData(List<DiscussionMessage> data) { this.messages = data; notifyDataSetChanged(); }
    public void addMessage(DiscussionMessage msg) { messages.add(msg); notifyItemInserted(messages.size() - 1); }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvSender, tvRole, tvContent, tvTime;
        ViewHolder(@NonNull View v) {
            super(v);
            tvSender = v.findViewById(R.id.tv_sender);
            tvRole = v.findViewById(R.id.tv_role);
            tvContent = v.findViewById(R.id.tv_content);
            tvTime = v.findViewById(R.id.tv_msg_time);
        }
    }
}

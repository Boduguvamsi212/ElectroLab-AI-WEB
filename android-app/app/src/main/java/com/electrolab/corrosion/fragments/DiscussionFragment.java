package com.electrolab.corrosion.fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.electrolab.corrosion.R;
import com.electrolab.corrosion.adapters.DiscussionAdapter;
import com.electrolab.corrosion.models.DiscussionMessage;
import com.electrolab.corrosion.network.ApiClient;
import com.electrolab.corrosion.utils.SessionManager;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class DiscussionFragment extends Fragment {

    private RecyclerView rvMessages;
    private EditText etMessage;
    private Button btnSend;
    private DiscussionAdapter adapter;
    private List<DiscussionMessage> messages = new ArrayList<>();
    private SessionManager sessionManager;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_discussion, container, false);

        sessionManager = new SessionManager(requireContext());
        rvMessages = view.findViewById(R.id.rv_messages);
        etMessage = view.findViewById(R.id.et_message);
        btnSend = view.findViewById(R.id.btn_send);

        adapter = new DiscussionAdapter(requireContext(), messages);
        rvMessages.setLayoutManager(new LinearLayoutManager(requireContext()));
        rvMessages.setAdapter(adapter);

        btnSend.setOnClickListener(v -> sendMessage());

        loadMessages();
        return view;
    }

    private void loadMessages() {
        ApiClient.getApiService().getDiscussion().enqueue(new Callback<List<DiscussionMessage>>() {
            @Override
            public void onResponse(Call<List<DiscussionMessage>> call, Response<List<DiscussionMessage>> response) {
                if (getView() == null) return;
                if (response.isSuccessful() && response.body() != null) {
                    messages.clear();
                    messages.addAll(response.body());
                    adapter.updateData(messages);
                    rvMessages.scrollToPosition(messages.size() - 1);
                }
            }

            @Override
            public void onFailure(Call<List<DiscussionMessage>> call, Throwable t) {}
        });
    }

    private void sendMessage() {
        String content = etMessage.getText().toString().trim();
        if (content.isEmpty()) return;

        etMessage.setText("");
        btnSend.setEnabled(false);

        Map<String, String> body = new HashMap<>();
        body.put("sender", sessionManager.getUserName());
        body.put("role", sessionManager.getUserRole());
        body.put("content", content);

        ApiClient.getApiService().postMessage(body).enqueue(new Callback<DiscussionMessage>() {
            @Override
            public void onResponse(Call<DiscussionMessage> call, Response<DiscussionMessage> response) {
                if (getView() == null) return;
                btnSend.setEnabled(true);
                if (response.isSuccessful() && response.body() != null) {
                    adapter.addMessage(response.body());
                    rvMessages.scrollToPosition(messages.size() - 1);
                }
            }

            @Override
            public void onFailure(Call<DiscussionMessage> call, Throwable t) {
                if (getView() != null) {
                    btnSend.setEnabled(true);
                    Toast.makeText(getContext(), "Failed to send message", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }
}

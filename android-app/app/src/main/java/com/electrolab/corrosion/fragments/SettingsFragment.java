package com.electrolab.corrosion.fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.electrolab.corrosion.R;
import com.electrolab.corrosion.network.ApiClient;
import com.electrolab.corrosion.utils.Constants;
import com.electrolab.corrosion.utils.SessionManager;

import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SettingsFragment extends Fragment {

    private TextView tvConnStatus, tvSessionUser, tvTokenStatus;
    private Button btnTestConn;
    private SessionManager sessionManager;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_settings, container, false);

        sessionManager = new SessionManager(requireContext());
        tvConnStatus = view.findViewById(R.id.tv_conn_status);
        tvSessionUser = view.findViewById(R.id.tv_session_user);
        tvTokenStatus = view.findViewById(R.id.tv_token_status);
        btnTestConn = view.findViewById(R.id.btn_test_conn);

        // Populate session info
        tvSessionUser.setText(sessionManager.getUserName());
        tvTokenStatus.setText(sessionManager.isLoggedIn() ? "✓ Active" : "✗ Expired");

        btnTestConn.setOnClickListener(v -> testConnection());

        // Auto-test on open
        testConnection();
        return view;
    }

    private void testConnection() {
        tvConnStatus.setText("Pinging…");
        tvConnStatus.setTextColor(requireContext().getResources().getColor(R.color.colorTextMuted, null));
        btnTestConn.setEnabled(false);

        ApiClient.getApiService().getSettings().enqueue(new Callback<Map<String, Object>>() {
            @Override
            public void onResponse(Call<Map<String, Object>> call, Response<Map<String, Object>> response) {
                if (getView() == null) return;
                btnTestConn.setEnabled(true);
                if (response.isSuccessful()) {
                    tvConnStatus.setText("● ONLINE");
                    tvConnStatus.setTextColor(requireContext().getResources().getColor(R.color.colorSuccess, null));
                } else {
                    tvConnStatus.setText("⚠ DEGRADED");
                    tvConnStatus.setTextColor(requireContext().getResources().getColor(R.color.colorWarning, null));
                }
            }

            @Override
            public void onFailure(Call<Map<String, Object>> call, Throwable t) {
                if (getView() == null) return;
                btnTestConn.setEnabled(true);
                tvConnStatus.setText("✗ OFFLINE");
                tvConnStatus.setTextColor(requireContext().getResources().getColor(R.color.colorDanger, null));
                Toast.makeText(getContext(),
                        "Backend unreachable. Using 10.0.2.2:5000 for emulator.",
                        Toast.LENGTH_LONG).show();
            }
        });
    }
}

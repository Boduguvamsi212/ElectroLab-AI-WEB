package com.electrolab.corrosion.fragments;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.electrolab.corrosion.R;
import com.electrolab.corrosion.activities.WelcomeActivity;
import com.electrolab.corrosion.models.LoginResponse;
import com.electrolab.corrosion.network.ApiClient;
import com.electrolab.corrosion.utils.SessionManager;

import java.util.HashMap;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ProfileFragment extends Fragment {

    private TextView tvName, tvRole, tvInstitution;
    private EditText etName, etRole, etInstitution;
    private Button btnSave, btnLogout;
    private SessionManager sessionManager;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_profile, container, false);

        sessionManager = new SessionManager(requireContext());
        tvName = view.findViewById(R.id.tv_profile_name);
        tvRole = view.findViewById(R.id.tv_profile_role);
        tvInstitution = view.findViewById(R.id.tv_profile_institution);
        etName = view.findViewById(R.id.et_name);
        etRole = view.findViewById(R.id.et_role);
        etInstitution = view.findViewById(R.id.et_institution);
        btnSave = view.findViewById(R.id.btn_save_profile);
        btnLogout = view.findViewById(R.id.btn_logout);

        // Pre-fill from session
        tvName.setText(sessionManager.getUserName());
        tvRole.setText(sessionManager.getUserRole());
        tvInstitution.setText(sessionManager.getUserInstitution());
        etName.setText(sessionManager.getUserName());
        etRole.setText(sessionManager.getUserRole());
        etInstitution.setText(sessionManager.getUserInstitution());

        btnSave.setOnClickListener(v -> saveProfile());
        btnLogout.setOnClickListener(v -> logout());

        return view;
    }

    private void saveProfile() {
        String name = etName.getText().toString().trim();
        String role = etRole.getText().toString().trim();
        String institution = etInstitution.getText().toString().trim();

        if (name.isEmpty()) { Toast.makeText(getContext(), "Name cannot be empty", Toast.LENGTH_SHORT).show(); return; }

        // Update session locally
        sessionManager.saveSession(sessionManager.getToken(), name, role,
                sessionManager.getUserEmail(), institution);

        // Update display
        tvName.setText(name);
        tvRole.setText(role);
        tvInstitution.setText(institution);

        // Try updating backend
        Map<String, String> body = new HashMap<>();
        body.put("name", name);
        body.put("role", role);
        body.put("institution", institution);

        ApiClient.getApiService().updateProfile(sessionManager.getBearerToken(), body)
                .enqueue(new Callback<LoginResponse>() {
                    @Override
                    public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                        Toast.makeText(getContext(), "Profile updated successfully!", Toast.LENGTH_SHORT).show();
                    }
                    @Override
                    public void onFailure(Call<LoginResponse> call, Throwable t) {
                        Toast.makeText(getContext(), "Profile saved locally.", Toast.LENGTH_SHORT).show();
                    }
                });
    }

    private void logout() {
        sessionManager.clearSession();
        Intent intent = new Intent(getActivity(), WelcomeActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
    }
}

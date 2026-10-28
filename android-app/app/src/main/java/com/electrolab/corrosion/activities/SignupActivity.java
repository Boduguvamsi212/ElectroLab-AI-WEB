package com.electrolab.corrosion.activities;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.Spinner;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.electrolab.corrosion.R;
import com.electrolab.corrosion.models.LoginResponse;
import com.electrolab.corrosion.network.ApiClient;
import com.electrolab.corrosion.network.ApiService;
import com.electrolab.corrosion.utils.Constants;
import com.electrolab.corrosion.utils.SessionManager;

import java.util.HashMap;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SignupActivity extends AppCompatActivity {

    private EditText etName, etEmail, etPassword;
    private Spinner spinnerRole;
    private Button btnSignup;
    private ProgressBar progressSignup;
    private TextView tvError, tvSuccess, tvLoginLink;
    private SessionManager sessionManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);

        sessionManager = new SessionManager(this);
        etName = findViewById(R.id.et_name);
        etEmail = findViewById(R.id.et_email);
        etPassword = findViewById(R.id.et_password);
        spinnerRole = findViewById(R.id.spinner_role);
        btnSignup = findViewById(R.id.btn_signup);
        progressSignup = findViewById(R.id.progress_signup);
        tvError = findViewById(R.id.tv_error);
        tvSuccess = findViewById(R.id.tv_success);
        tvLoginLink = findViewById(R.id.tv_login_link);

        // Populate role spinner
        ArrayAdapter<String> roleAdapter = new ArrayAdapter<>(this,
                android.R.layout.simple_spinner_item, Constants.ROLES);
        roleAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinnerRole.setAdapter(roleAdapter);

        btnSignup.setOnClickListener(v -> attemptSignup());
        tvLoginLink.setOnClickListener(v -> {
            startActivity(new Intent(SignupActivity.this, LoginActivity.class));
            finish();
        });
    }

    private void attemptSignup() {
        String name = etName.getText().toString().trim();
        String email = etEmail.getText().toString().trim();
        String password = etPassword.getText().toString().trim();
        String role = spinnerRole.getSelectedItem().toString();

        if (name.isEmpty() || email.isEmpty() || password.isEmpty()) {
            showError("All fields are required.");
            return;
        }

        setLoading(true);
        tvError.setVisibility(View.GONE);
        tvSuccess.setVisibility(View.GONE);

        ApiService apiService = ApiClient.getApiService();
        Map<String, String> body = new HashMap<>();
        body.put("name", name);
        body.put("email", email);
        body.put("password", password);
        body.put("role", role);

        apiService.signup(body).enqueue(new Callback<LoginResponse>() {
            @Override
            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                setLoading(false);
                tvSuccess.setText("Account registered! Redirecting to login…");
                tvSuccess.setVisibility(View.VISIBLE);
                // Navigate to login after short delay
                tvSuccess.postDelayed(() -> {
                    startActivity(new Intent(SignupActivity.this, LoginActivity.class));
                    finish();
                }, 1500);
            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable t) {
                setLoading(false);
                showError("Cannot reach server. Make sure the backend is running on port 5000 and your phone is on the same Wi-Fi as your PC.");
            }
        });
    }

    private void showError(String msg) { tvError.setText(msg); tvError.setVisibility(View.VISIBLE); setLoading(false); }
    private void setLoading(boolean l) {
        btnSignup.setVisibility(l ? View.GONE : View.VISIBLE);
        progressSignup.setVisibility(l ? View.VISIBLE : View.GONE);
    }
}

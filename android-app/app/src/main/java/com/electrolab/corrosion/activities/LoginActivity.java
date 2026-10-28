package com.electrolab.corrosion.activities;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

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

public class LoginActivity extends AppCompatActivity {

    private EditText etEmail, etPassword;
    private Button btnLogin;
    private ProgressBar progressLogin;
    private TextView tvError, tvSignupLink, tvForgot;
    private SessionManager sessionManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        sessionManager = new SessionManager(this);
        etEmail = findViewById(R.id.et_email);
        etPassword = findViewById(R.id.et_password);
        btnLogin = findViewById(R.id.btn_login);
        progressLogin = findViewById(R.id.progress_login);
        tvError = findViewById(R.id.tv_error);
        tvSignupLink = findViewById(R.id.tv_signup_link);
        tvForgot = findViewById(R.id.tv_forgot);

        btnLogin.setOnClickListener(v -> attemptLogin());

        tvSignupLink.setOnClickListener(v ->
                startActivity(new Intent(LoginActivity.this, SignupActivity.class)));

        tvForgot.setOnClickListener(v ->
                startActivity(new Intent(LoginActivity.this, ForgotPasswordActivity.class)));
    }

    private void attemptLogin() {
        String email = etEmail.getText().toString().trim();
        String password = etPassword.getText().toString().trim();

        if (email.isEmpty() || password.isEmpty()) {
            showError("Email and password are required.");
            return;
        }

        setLoading(true);
        tvError.setVisibility(View.GONE);

        // Try demo credentials fallback first (offline mode)
        if (email.equals(Constants.DEMO_EMAIL) && password.equals(Constants.DEMO_PASSWORD)) {
            sessionManager.saveSession(Constants.DEMO_TOKEN, Constants.DEMO_NAME,
                    Constants.DEMO_ROLE, email, "ElectroLab Research Center");
            goToSuccess();
            return;
        }

        ApiService apiService = ApiClient.getApiService();
        Map<String, String> body = new HashMap<>();
        body.put("email", email);
        body.put("password", password);

        apiService.login(body).enqueue(new Callback<LoginResponse>() {
            @Override
            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                setLoading(false);
                if (response.isSuccessful() && response.body() != null) {
                    LoginResponse data = response.body();
                    sessionManager.saveSession(data.getToken(), data.getName(), data.getRole(),
                            data.getEmail(), data.getInstitution());
                    goToSuccess();
                } else {
                    showError("Invalid credentials. Try alex@corrosion.lab / password123");
                }
            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable t) {
                setLoading(false);
                showError("Cannot reach server. Check that backend is running on port 5000.");
            }
        });
    }

    private void goToSuccess() {
        Intent intent = new Intent(LoginActivity.this, LoginSuccessActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        finish();
    }

    private void showError(String message) {
        tvError.setText(message);
        tvError.setVisibility(View.VISIBLE);
        setLoading(false);
    }

    private void setLoading(boolean loading) {
        btnLogin.setVisibility(loading ? View.GONE : View.VISIBLE);
        progressLogin.setVisibility(loading ? View.VISIBLE : View.GONE);
    }
}

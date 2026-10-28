package com.electrolab.corrosion.activities;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.electrolab.corrosion.R;

public class ForgotPasswordActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_forgot_password);

        EditText etEmail = findViewById(R.id.et_email);
        Button btnReset = findViewById(R.id.btn_reset);
        TextView tvInfo = findViewById(R.id.tv_info);
        TextView tvBack = findViewById(R.id.tv_back_login);

        btnReset.setOnClickListener(v -> {
            String email = etEmail.getText().toString().trim();
            if (!email.isEmpty()) {
                tvInfo.setText("If a research account exists for " + email + ", a reset token will be sent.");
                tvInfo.setVisibility(android.view.View.VISIBLE);
            }
        });

        tvBack.setOnClickListener(v -> {
            startActivity(new Intent(ForgotPasswordActivity.this, LoginActivity.class));
            finish();
        });
    }
}

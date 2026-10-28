package com.electrolab.corrosion.activities;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;

import com.electrolab.corrosion.R;

public class WelcomeActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_welcome);

        Button btnGetStarted = findViewById(R.id.btn_get_started);
        Button btnLoginExisting = findViewById(R.id.btn_login_existing);

        btnGetStarted.setOnClickListener(v ->
                startActivity(new Intent(WelcomeActivity.this, SignupActivity.class)));

        btnLoginExisting.setOnClickListener(v ->
                startActivity(new Intent(WelcomeActivity.this, LoginActivity.class)));
    }
}

package com.electrolab.corrosion.activities;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.animation.Animation;
import android.view.animation.ScaleAnimation;
import android.widget.Button;
import android.widget.ImageView;

import androidx.appcompat.app.AppCompatActivity;

import com.electrolab.corrosion.R;

public class LoginSuccessActivity extends AppCompatActivity {

    private final Handler handler = new Handler(Looper.getMainLooper());
    private Runnable autoRedirectRunnable;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login_success);

        ImageView ivIcon = findViewById(R.id.iv_success_icon);
        Button btnOpenDashboard = findViewById(R.id.btn_open_dashboard);

        // Gentle scale animation on checkmark icon
        ScaleAnimation scale = new ScaleAnimation(
                0.7f, 1.0f, 0.7f, 1.0f,
                Animation.RELATIVE_TO_SELF, 0.5f,
                Animation.RELATIVE_TO_SELF, 0.5f
        );
        scale.setDuration(450);
        ivIcon.startAnimation(scale);

        btnOpenDashboard.setOnClickListener(v -> proceedToDashboard());

        // Also auto-redirect after 2.5 seconds if user doesn't press button
        autoRedirectRunnable = this::proceedToDashboard;
        handler.postDelayed(autoRedirectRunnable, 2500);
    }

    private void proceedToDashboard() {
        if (autoRedirectRunnable != null) {
            handler.removeCallbacks(autoRedirectRunnable);
        }
        Intent intent = new Intent(LoginSuccessActivity.this, MainActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        finish();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (autoRedirectRunnable != null) {
            handler.removeCallbacks(autoRedirectRunnable);
        }
    }
}

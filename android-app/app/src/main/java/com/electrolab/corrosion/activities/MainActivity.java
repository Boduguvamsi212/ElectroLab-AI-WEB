package com.electrolab.corrosion.activities;

import android.annotation.SuppressLint;
import android.graphics.Bitmap;
import android.net.http.SslError;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.View;
import android.webkit.SslErrorHandler;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import com.electrolab.corrosion.R;
import com.electrolab.corrosion.utils.Constants;

public class MainActivity extends AppCompatActivity {

    private WebView webView;
    private SwipeRefreshLayout swipeRefresh;
    private ProgressBar progressBar;
    private LinearLayout layoutError;
    private TextView tvErrorDetails;
    private Button btnRetry;

    private boolean doubleBackToExitPressedOnce = false;
    private boolean hasLoadedSuccessfully = false;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.web_view);
        swipeRefresh = findViewById(R.id.swipe_refresh);
        progressBar = findViewById(R.id.web_progress);
        layoutError = findViewById(R.id.layout_error);
        tvErrorDetails = findViewById(R.id.tv_error_details);
        btnRetry = findViewById(R.id.btn_retry);

        // Configure SwipeRefreshLayout
        swipeRefresh.setColorSchemeColors(0xFF06B6D4, 0xFFA855F7);
        swipeRefresh.setProgressBackgroundColorSchemeColor(0xFF0E1E5B);
        swipeRefresh.setOnRefreshListener(() -> webView.reload());

        // Configure WebView settings
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setUseWideViewPort(true);
        settings.setLoadWithOverviewMode(true);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setSupportZoom(false);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);

        // WebChromeClient for page loading progress
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                if (newProgress < 100) {
                    progressBar.setVisibility(View.VISIBLE);
                    progressBar.setProgress(newProgress);
                } else {
                    progressBar.setVisibility(View.GONE);
                    swipeRefresh.setRefreshing(false);
                }
            }
        });

        // WebViewClient to handle navigation and errors
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                super.onPageStarted(view, url, favicon);
                progressBar.setVisibility(View.VISIBLE);
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                progressBar.setVisibility(View.GONE);
                swipeRefresh.setRefreshing(false);
                hasLoadedSuccessfully = true;
                layoutError.setVisibility(View.GONE);
                webView.setVisibility(View.VISIBLE);
            }

            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                super.onReceivedError(view, request, error);
                // Only show error overlay if main frame failed
                if (request != null && request.isForMainFrame() && !hasLoadedSuccessfully) {
                    showError("Could not reach " + Constants.WEB_URL + "\nCheck Wi-Fi connection.");
                }
            }

            @SuppressLint("WebViewClientOnReceivedSslError")
            @Override
            public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
                handler.proceed(); // Allow local self-signed or internal networks
            }
        });

        btnRetry.setOnClickListener(v -> loadApp());

        loadApp();
    }

    private void loadApp() {
        layoutError.setVisibility(View.GONE);
        webView.setVisibility(View.VISIBLE);
        hasLoadedSuccessfully = false;
        webView.loadUrl(Constants.WEB_URL);
    }

    private void showError(String message) {
        swipeRefresh.setRefreshing(false);
        progressBar.setVisibility(View.GONE);
        webView.setVisibility(View.GONE);
        layoutError.setVisibility(View.VISIBLE);
        if (tvErrorDetails != null) {
            tvErrorDetails.setText(message);
        }
    }

    // Compatibility methods for fragments
    public void loadFragment(androidx.fragment.app.Fragment fragment, String title, int groupPos, int childPos) {
        // Handled by web app router
    }

    public void navigateToGraph() {
        // Handled by web app router
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
            return;
        }

        if (doubleBackToExitPressedOnce) {
            super.onBackPressed();
            return;
        }

        this.doubleBackToExitPressedOnce = true;
        Toast.makeText(this, "Press back again to exit", Toast.LENGTH_SHORT).show();

        new Handler(Looper.getMainLooper()).postDelayed(() -> doubleBackToExitPressedOnce = false, 2000);
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (webView != null) webView.onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (webView != null) webView.onPause();
    }

    @Override
    protected void onDestroy() {
        if (webView != null) {
            webView.destroy();
        }
        super.onDestroy();
    }
}

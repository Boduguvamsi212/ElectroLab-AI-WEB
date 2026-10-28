package com.electrolab.corrosion.utils;

import android.content.Context;
import android.content.SharedPreferences;

public class SessionManager {
    private final SharedPreferences prefs;
    private final SharedPreferences.Editor editor;

    public SessionManager(Context context) {
        prefs = context.getSharedPreferences(Constants.PREF_NAME, Context.MODE_PRIVATE);
        editor = prefs.edit();
    }

    public void saveSession(String token, String name, String role, String email, String institution) {
        editor.putString(Constants.KEY_TOKEN, token);
        editor.putString(Constants.KEY_USER_NAME, name);
        editor.putString(Constants.KEY_USER_ROLE, role);
        editor.putString(Constants.KEY_USER_EMAIL, email);
        editor.putString(Constants.KEY_USER_INSTITUTION, institution != null ? institution : "ElectroLab Research Center");
        editor.apply();
    }

    public void clearSession() {
        editor.clear();
        editor.apply();
    }

    public boolean isLoggedIn() {
        String token = prefs.getString(Constants.KEY_TOKEN, null);
        return token != null && !token.isEmpty();
    }

    public String getToken() {
        return prefs.getString(Constants.KEY_TOKEN, null);
    }

    public String getUserName() {
        return prefs.getString(Constants.KEY_USER_NAME, Constants.DEMO_NAME);
    }

    public String getUserRole() {
        return prefs.getString(Constants.KEY_USER_ROLE, Constants.DEMO_ROLE);
    }

    public String getUserEmail() {
        return prefs.getString(Constants.KEY_USER_EMAIL, Constants.DEMO_EMAIL);
    }

    public String getUserInstitution() {
        return prefs.getString(Constants.KEY_USER_INSTITUTION, "ElectroLab Research Center");
    }

    public void saveActiveRun(String json) {
        editor.putString(Constants.KEY_ACTIVE_RUN, json);
        editor.apply();
    }

    public String getActiveRun() {
        return prefs.getString(Constants.KEY_ACTIVE_RUN, null);
    }

    public String getBearerToken() {
        String token = getToken();
        return token != null ? "Bearer " + token : null;
    }
}

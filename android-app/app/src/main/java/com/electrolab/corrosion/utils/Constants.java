package com.electrolab.corrosion.utils;

public class Constants {
    // Web app and backend endpoints
    public static final String WEB_URL = "http://192.168.1.3:5000/";
    public static final String BASE_URL = "http://192.168.1.3:5000/api/";

    // SharedPreferences keys
    public static final String PREF_NAME = "electrolab_prefs";
    public static final String KEY_TOKEN = "auth_token";
    public static final String KEY_USER_NAME = "user_name";
    public static final String KEY_USER_ROLE = "user_role";
    public static final String KEY_USER_EMAIL = "user_email";
    public static final String KEY_USER_INSTITUTION = "user_institution";
    public static final String KEY_ACTIVE_RUN = "active_run_json";

    // Material options
    public static final String[] MATERIALS = {
        "Carbon Steel 1018",
        "Stainless Steel 316L",
        "Alloy C276 (Hastelloy)",
        "Titanium Grade 5",
        "Copper-Nickel 90/10"
    };

    // Electrode options for calibration
    public static final String[] ELECTRODES = {
        "Saturated Calomel Electrode (SCE)",
        "Silver-Silver Chloride (Ag/AgCl)",
        "Reversible Hydrogen Electrode (RHE)"
    };

    // Roles for signup spinner
    public static final String[] ROLES = {
        "Senior Chemist",
        "Researcher",
        "Lab Manager",
        "Research Associate"
    };

    // Default credentials for demo fallback
    public static final String DEMO_EMAIL = "alex@corrosion.lab";
    public static final String DEMO_PASSWORD = "password123";
    public static final String DEMO_NAME = "Dr. Alex Carter";
    public static final String DEMO_ROLE = "Senior Chemist";
    public static final String DEMO_TOKEN = "mock_jwt_token_android";
}

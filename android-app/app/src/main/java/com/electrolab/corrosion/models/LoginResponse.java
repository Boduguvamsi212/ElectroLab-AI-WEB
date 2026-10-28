package com.electrolab.corrosion.models;

import com.google.gson.annotations.SerializedName;

public class LoginResponse {
    @SerializedName("token")
    private String token;

    @SerializedName("name")
    private String name;

    @SerializedName("role")
    private String role;

    @SerializedName("email")
    private String email;

    @SerializedName("institution")
    private String institution;

    public LoginResponse() {}

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getInstitution() { return institution; }
    public void setInstitution(String institution) { this.institution = institution; }
}

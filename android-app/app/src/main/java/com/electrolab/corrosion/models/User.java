package com.electrolab.corrosion.models;

import com.google.gson.annotations.SerializedName;

public class User {
    @SerializedName("id")
    private String id;

    @SerializedName("email")
    private String email;

    @SerializedName("name")
    private String name;

    @SerializedName("role")
    private String role;

    @SerializedName("institution")
    private String institution;

    public User() {}

    public User(String email, String name, String role, String institution) {
        this.email = email;
        this.name = name;
        this.role = role;
        this.institution = institution;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getName() { return name != null ? name : "Dr. Alex Carter"; }
    public void setName(String name) { this.name = name; }

    public String getRole() { return role != null ? role : "Senior Chemist"; }
    public void setRole(String role) { this.role = role; }

    public String getInstitution() { return institution != null ? institution : "ElectroLab Research Center"; }
    public void setInstitution(String institution) { this.institution = institution; }
}

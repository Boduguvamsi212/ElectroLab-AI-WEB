package com.electrolab.corrosion.models;

import com.google.gson.annotations.SerializedName;

public class Alert {
    @SerializedName("id")
    private String id;

    @SerializedName("title")
    private String title;

    @SerializedName("description")
    private String description;

    @SerializedName("severity")
    private String severity;

    @SerializedName("status")
    private String status;

    @SerializedName("timestamp")
    private String timestamp;

    public Alert() {}

    public String getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getSeverity() { return severity; }
    public String getStatus() { return status; }
    public String getTimestamp() { return timestamp; }
}

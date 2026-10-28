package com.electrolab.corrosion.models;

import com.google.gson.annotations.SerializedName;

public class Calibration {
    @SerializedName("id")
    private String id;

    @SerializedName("electrode")
    private String electrode;

    @SerializedName("offset")
    private String offset;

    @SerializedName("slope")
    private String slope;

    @SerializedName("operator")
    private String operator;

    @SerializedName("status")
    private String status;

    @SerializedName("timestamp")
    private String timestamp;

    public Calibration() {}

    public String getId() { return id; }
    public String getElectrode() { return electrode; }
    public String getOffset() { return offset; }
    public String getSlope() { return slope; }
    public String getOperator() { return operator; }
    public String getStatus() { return status; }
    public String getTimestamp() { return timestamp; }

    public void setId(String id) { this.id = id; }
    public void setElectrode(String electrode) { this.electrode = electrode; }
    public void setOffset(String offset) { this.offset = offset; }
    public void setSlope(String slope) { this.slope = slope; }
    public void setOperator(String operator) { this.operator = operator; }
    public void setStatus(String status) { this.status = status; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
}

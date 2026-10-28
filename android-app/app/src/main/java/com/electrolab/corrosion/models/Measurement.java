package com.electrolab.corrosion.models;

import com.google.gson.annotations.SerializedName;
import java.util.List;

public class Measurement {
    @SerializedName("id")
    private String id;

    @SerializedName("runNumber")
    private String runNumber;

    @SerializedName("material")
    private String material;

    @SerializedName("initVoltage")
    private double initVoltage;

    @SerializedName("finalVoltage")
    private double finalVoltage;

    @SerializedName("scanRate")
    private double scanRate;

    @SerializedName("pH")
    private double pH;

    @SerializedName("temperature")
    private double temperature;

    @SerializedName("current")
    private double current;

    @SerializedName("rate")
    private String rate;

    @SerializedName("risk")
    private String risk;

    @SerializedName("confidence")
    private String confidence;

    @SerializedName("passivation")
    private String passivation;

    @SerializedName("points")
    private List<TafelPoint> points;

    @SerializedName("timestamp")
    private String timestamp;

    public Measurement() {}

    // Getters
    public String getId() { return id; }
    public String getRunNumber() { return runNumber != null ? runNumber : "#000"; }
    public String getMaterial() { return material != null ? material : "Unknown"; }
    public double getInitVoltage() { return initVoltage; }
    public double getFinalVoltage() { return finalVoltage; }
    public double getScanRate() { return scanRate; }
    public double getPH() { return pH; }
    public double getTemperature() { return temperature; }
    public double getCurrent() { return current; }
    public String getRate() { return rate != null ? rate : "N/A"; }
    public String getRisk() { return risk != null ? risk : "Unknown"; }
    public String getConfidence() { return confidence != null ? confidence : "N/A"; }
    public String getPassivation() { return passivation != null ? passivation : "N/A"; }
    public List<TafelPoint> getPoints() { return points; }
    public String getTimestamp() { return timestamp; }

    // Setters
    public void setId(String id) { this.id = id; }
    public void setRunNumber(String runNumber) { this.runNumber = runNumber; }
    public void setMaterial(String material) { this.material = material; }
    public void setRate(String rate) { this.rate = rate; }
    public void setRisk(String risk) { this.risk = risk; }
    public void setConfidence(String confidence) { this.confidence = confidence; }
    public void setPassivation(String passivation) { this.passivation = passivation; }
    public void setPoints(List<TafelPoint> points) { this.points = points; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
}

package com.electrolab.corrosion.models;

import com.google.gson.annotations.SerializedName;

public class MeasurementRequest {
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

    public MeasurementRequest(String material, double initVoltage, double finalVoltage,
                               double scanRate, double pH, double temperature, double current) {
        this.material = material;
        this.initVoltage = initVoltage;
        this.finalVoltage = finalVoltage;
        this.scanRate = scanRate;
        this.pH = pH;
        this.temperature = temperature;
        this.current = current;
    }

    public String getMaterial() { return material; }
    public double getInitVoltage() { return initVoltage; }
    public double getFinalVoltage() { return finalVoltage; }
    public double getScanRate() { return scanRate; }
    public double getPH() { return pH; }
    public double getTemperature() { return temperature; }
    public double getCurrent() { return current; }
}

package com.electrolab.corrosion.models;

import com.google.gson.annotations.SerializedName;

public class TafelPoint {
    @SerializedName("voltage")
    private double voltage;

    @SerializedName("current")
    private double current;

    @SerializedName("logCurrent")
    private double logCurrent;

    public TafelPoint() {}

    public double getVoltage() { return voltage; }
    public void setVoltage(double voltage) { this.voltage = voltage; }

    public double getCurrent() { return current; }
    public void setCurrent(double current) { this.current = current; }

    public double getLogCurrent() { return logCurrent; }
    public void setLogCurrent(double logCurrent) { this.logCurrent = logCurrent; }
}

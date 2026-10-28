package com.electrolab.corrosion.models;

import com.google.gson.annotations.SerializedName;
import java.util.List;

public class DiagnosticsResponse {
    @SerializedName("status")
    private String status;

    @SerializedName("channels")
    private List<Channel> channels;

    @SerializedName("checks")
    private Checks checks;

    public DiagnosticsResponse() {}

    public String getStatus() { return status; }
    public List<Channel> getChannels() { return channels; }
    public Checks getChecks() { return checks; }

    public static class Channel {
        @SerializedName("id")
        private String id;

        @SerializedName("name")
        private String name;

        @SerializedName("currentVal")
        private String currentVal;

        @SerializedName("noiseRatio")
        private String noiseRatio;

        @SerializedName("voltLimit")
        private String voltLimit;

        @SerializedName("status")
        private String status;

        public String getId() { return id; }
        public String getName() { return name; }
        public String getCurrentVal() { return currentVal; }
        public String getNoiseRatio() { return noiseRatio; }
        public String getVoltLimit() { return voltLimit; }
        public String getStatus() { return status; }
    }

    public static class Checks {
        @SerializedName("potentiostatLock")
        private boolean potentiostatLock;

        @SerializedName("impedanceAnalyzerADC")
        private String impedanceAnalyzerADC;

        @SerializedName("temperatureProbe")
        private String temperatureProbe;

        @SerializedName("coolingFans")
        private String coolingFans;

        @SerializedName("flashStorage")
        private String flashStorage;

        public boolean isPotentiostatLock() { return potentiostatLock; }
        public String getImpedanceAnalyzerADC() { return impedanceAnalyzerADC; }
        public String getTemperatureProbe() { return temperatureProbe; }
        public String getCoolingFans() { return coolingFans; }
        public String getFlashStorage() { return flashStorage; }
    }
}

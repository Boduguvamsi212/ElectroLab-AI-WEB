package com.electrolab.corrosion.models;

import com.google.gson.annotations.SerializedName;

public class Material {
    @SerializedName("name")
    private String name;

    @SerializedName("class")
    private String materialClass;

    @SerializedName("density")
    private String density;

    @SerializedName("eqWeight")
    private String eqWeight;

    @SerializedName("pittingResistance")
    private String pittingResistance;

    @SerializedName("description")
    private String description;

    public Material() {}

    public String getName() { return name; }
    public String getMaterialClass() { return materialClass; }
    public String getDensity() { return density; }
    public String getEqWeight() { return eqWeight; }
    public String getPittingResistance() { return pittingResistance; }
    public String getDescription() { return description; }

    public void setName(String name) { this.name = name; }
    public void setMaterialClass(String materialClass) { this.materialClass = materialClass; }
    public void setDensity(String density) { this.density = density; }
    public void setEqWeight(String eqWeight) { this.eqWeight = eqWeight; }
    public void setPittingResistance(String pittingResistance) { this.pittingResistance = pittingResistance; }
    public void setDescription(String description) { this.description = description; }
}

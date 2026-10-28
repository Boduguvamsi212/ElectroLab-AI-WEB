package com.electrolab.corrosion.models;

import com.google.gson.annotations.SerializedName;

public class DiscussionMessage {
    @SerializedName("id")
    private String id;

    @SerializedName("sender")
    private String sender;

    @SerializedName("role")
    private String role;

    @SerializedName("content")
    private String content;

    @SerializedName("timestamp")
    private String timestamp;

    public DiscussionMessage() {}

    public DiscussionMessage(String sender, String role, String content) {
        this.sender = sender;
        this.role = role;
        this.content = content;
    }

    public String getId() { return id; }
    public String getSender() { return sender; }
    public String getRole() { return role; }
    public String getContent() { return content; }
    public String getTimestamp() { return timestamp; }

    public void setId(String id) { this.id = id; }
    public void setSender(String sender) { this.sender = sender; }
    public void setRole(String role) { this.role = role; }
    public void setContent(String content) { this.content = content; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
}

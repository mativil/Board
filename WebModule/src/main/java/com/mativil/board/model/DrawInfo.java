package com.mativil.board.model;

/**
 * Created by Ivan on 16.02.2017.
 */
public class DrawInfo {
    private String clientId;
    private String type;
    private double x;
    private double y;

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public DrawInfo() {
    }

    public DrawInfo(String clientId, String type, double x, double y) {
        this.clientId = clientId;
        this.type = type;
        this.x = x;
        this.y = y;
    }

    @Override
    public String toString() {
        return "DrawInfo{" +
                "clientId='" + clientId + '\'' +
                ", type='" + type + '\'' +
                ", x=" + x +
                ", y=" + y +
                '}';
    }
}

package com.meetingrooms.meeting_room_backend.dto;

public class DashboardResponse {

    private long users;
    private long rooms;
    private long reservations;
    private long availableRooms;
    private long maintenanceRooms;

    public DashboardResponse() {
    }

    public DashboardResponse(long users,
                             long rooms,
                             long reservations,
                             long availableRooms,
                             long maintenanceRooms) {

        this.users = users;
        this.rooms = rooms;
        this.reservations = reservations;
        this.availableRooms = availableRooms;
        this.maintenanceRooms = maintenanceRooms;
    }

    public long getUsers() {
        return users;
    }

    public void setUsers(long users) {
        this.users = users;
    }

    public long getRooms() {
        return rooms;
    }

    public void setRooms(long rooms) {
        this.rooms = rooms;
    }

    public long getReservations() {
        return reservations;
    }

    public void setReservations(long reservations) {
        this.reservations = reservations;
    }

    public long getAvailableRooms() {
        return availableRooms;
    }

    public void setAvailableRooms(long availableRooms) {
        this.availableRooms = availableRooms;
    }

    public long getMaintenanceRooms() {
        return maintenanceRooms;
    }

    public void setMaintenanceRooms(long maintenanceRooms) {
        this.maintenanceRooms = maintenanceRooms;
    }
}
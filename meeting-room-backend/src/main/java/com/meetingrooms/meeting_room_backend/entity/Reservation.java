package com.meetingrooms.meeting_room_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "reservations")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Utilisateur qui réserve
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Salle réservée
    @ManyToOne
    @JoinColumn(name = "meeting_room_id", nullable = false)
    private MeetingRoom meetingRoom;

    // Date de réservation
    @Column(nullable = false)
    private LocalDate reservationDate;

    // Heure de début
    @Column(nullable = false)
    private LocalTime startTime;

    // Heure de fin
    @Column(nullable = false)
    private LocalTime endTime;

    // Statut (PENDING, APPROVED, CANCELLED...)
    @Column(nullable = false)
    private String status;

    public Reservation() {
    }

    public Reservation(Long id,
                       User user,
                       MeetingRoom meetingRoom,
                       LocalDate reservationDate,
                       LocalTime startTime,
                       LocalTime endTime,
                       String status) {
        this.id = id;
        this.user = user;
        this.meetingRoom = meetingRoom;
        this.reservationDate = reservationDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public MeetingRoom getMeetingRoom() {
        return meetingRoom;
    }

    public void setMeetingRoom(MeetingRoom meetingRoom) {
        this.meetingRoom = meetingRoom;
    }

    public LocalDate getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(LocalDate reservationDate) {
        this.reservationDate = reservationDate;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
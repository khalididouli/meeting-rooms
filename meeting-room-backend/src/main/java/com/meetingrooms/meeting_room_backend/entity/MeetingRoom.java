package com.meetingrooms.meeting_room_backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "meeting_rooms")
@Data
@NoArgsConstructor
public class MeetingRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Room name is required")
    @Column(nullable = false)
    private String name;

    @Positive(message = "Capacity must be greater than 0")
    @Column(nullable = false)
    private Integer capacity;

    @NotBlank(message = "Location is required")
    @Column(nullable = false)
    private String location;

    @NotBlank(message = "Equipment is required")
    @Column(nullable = false)
    private String equipment;

    @NotBlank(message = "Status is required")
    @Column(nullable = false)
    private String status;
}
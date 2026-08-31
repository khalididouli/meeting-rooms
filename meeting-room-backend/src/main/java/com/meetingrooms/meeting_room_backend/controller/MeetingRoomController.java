package com.meetingrooms.meeting_room_backend.controller;

import com.meetingrooms.meeting_room_backend.entity.MeetingRoom;
import com.meetingrooms.meeting_room_backend.service.MeetingRoomService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meeting-rooms")
public class MeetingRoomController {

    private final MeetingRoomService meetingRoomService;

    public MeetingRoomController(MeetingRoomService meetingRoomService) {
        this.meetingRoomService = meetingRoomService;
    }

    // Ajouter une salle
    @PostMapping
    public MeetingRoom createMeetingRoom(@Valid @RequestBody MeetingRoom meetingRoom) {
        return meetingRoomService.saveMeetingRoom(meetingRoom);
    }

    // Afficher toutes les salles 
    @GetMapping
    public Page<MeetingRoom> getAllMeetingRooms(Pageable pageable) {
        return meetingRoomService.getMeetingRooms(pageable);
    }

    // Recherche par statut
    @GetMapping("/search/status")
    public List<MeetingRoom> searchByStatus(@RequestParam String status) {
        return meetingRoomService.getRoomsByStatus(status);
    }

    // Recherche par capacité
    @GetMapping("/search/capacity")
    public List<MeetingRoom> searchByCapacity(@RequestParam Integer capacity) {
        return meetingRoomService.getRoomsByCapacity(capacity);
    }

    // Recherche par localisation
    @GetMapping("/search/location")
    public List<MeetingRoom> searchByLocation(@RequestParam String location) {
        return meetingRoomService.getRoomsByLocation(location);
    }

    // Chercher une salle par ID
    @GetMapping("/{id}")
    public MeetingRoom getMeetingRoomById(@PathVariable Long id) {
        return meetingRoomService.getMeetingRoomById(id).orElse(null);
    }

    // Modifier une salle
    @PutMapping("/{id}")
    public MeetingRoom updateMeetingRoom(
            @PathVariable Long id,
            @Valid @RequestBody MeetingRoom meetingRoom) {

        return meetingRoomService.updateMeetingRoom(id, meetingRoom);
    }

    // Supprimer une salle
    @DeleteMapping("/{id}")
    public void deleteMeetingRoom(@PathVariable Long id) {
        meetingRoomService.deleteMeetingRoom(id);
    }
}
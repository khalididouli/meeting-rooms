package com.meetingrooms.meeting_room_backend.service;

import com.meetingrooms.meeting_room_backend.entity.MeetingRoom;
import com.meetingrooms.meeting_room_backend.repository.MeetingRoomRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MeetingRoomService {

    private final MeetingRoomRepository meetingRoomRepository;

    public MeetingRoomService(MeetingRoomRepository meetingRoomRepository) {
        this.meetingRoomRepository = meetingRoomRepository;
    }

    // Ajouter une salle
    public MeetingRoom saveMeetingRoom(MeetingRoom meetingRoom) {
        return meetingRoomRepository.save(meetingRoom);
    }

    // Pagination
    public Page<MeetingRoom> getMeetingRooms(Pageable pageable) {
        return meetingRoomRepository.findAll(pageable);
    }

    // Afficher toutes les salles
    public List<MeetingRoom> getAllMeetingRooms() {
        return meetingRoomRepository.findAll();
    }

    // Chercher une salle par ID
    public Optional<MeetingRoom> getMeetingRoomById(Long id) {
        return meetingRoomRepository.findById(id);
    }

    // Recherche par statut
    public List<MeetingRoom> getRoomsByStatus(String status) {
        return meetingRoomRepository.findByStatus(status);
    }

    // Recherche par capacité
    public List<MeetingRoom> getRoomsByCapacity(Integer capacity) {
        return meetingRoomRepository.findByCapacity(capacity);
    }

    // Recherche par localisation
    public List<MeetingRoom> getRoomsByLocation(String location) {
        return meetingRoomRepository.findByLocationContainingIgnoreCase(location);
    }

    // Modifier une salle
    public MeetingRoom updateMeetingRoom(Long id, MeetingRoom meetingRoom) {

        MeetingRoom room = meetingRoomRepository.findById(id).orElseThrow();

        room.setName(meetingRoom.getName());
        room.setCapacity(meetingRoom.getCapacity());
        room.setLocation(meetingRoom.getLocation());
        room.setEquipment(meetingRoom.getEquipment());
        room.setStatus(meetingRoom.getStatus());

        return meetingRoomRepository.save(room);
    }

    // Supprimer une salle
    public void deleteMeetingRoom(Long id) {
        meetingRoomRepository.deleteById(id);
    }
}
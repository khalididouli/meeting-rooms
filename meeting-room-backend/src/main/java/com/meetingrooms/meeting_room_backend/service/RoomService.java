package com.meetingrooms.meeting_room_backend.service;

import com.meetingrooms.meeting_room_backend.entity.MeetingRoom;
import com.meetingrooms.meeting_room_backend.repository.MeetingRoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    private final MeetingRoomRepository meetingRoomRepository;

    public RoomService(MeetingRoomRepository meetingRoomRepository) {
        this.meetingRoomRepository = meetingRoomRepository;
    }

    // Ajouter une salle
    public MeetingRoom saveMeetingRoom(MeetingRoom meetingRoom) {
        return meetingRoomRepository.save(meetingRoom);
    }

    // Afficher toutes les salles
    public List<MeetingRoom> getAllMeetingRooms() {
        return meetingRoomRepository.findAll();
    }

    // Chercher une salle par ID
    public Optional<MeetingRoom> getMeetingRoomById(Long id) {
        return meetingRoomRepository.findById(id);
    }

    // Modifier une salle
    public MeetingRoom updateMeetingRoom(Long id, MeetingRoom meetingRoom) {

        return meetingRoomRepository.findById(id).map(existingRoom -> {

            existingRoom.setName(meetingRoom.getName());
            existingRoom.setCapacity(meetingRoom.getCapacity());
            existingRoom.setLocation(meetingRoom.getLocation());
            existingRoom.setEquipment(meetingRoom.getEquipment());
            existingRoom.setStatus(meetingRoom.getStatus());

            return meetingRoomRepository.save(existingRoom);

        }).orElse(null);
    }

    // Supprimer une salle
    public void deleteMeetingRoom(Long id) {
        meetingRoomRepository.deleteById(id);
    }
}
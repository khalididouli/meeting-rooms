package com.meetingrooms.meeting_room_backend.repository;

import com.meetingrooms.meeting_room_backend.entity.MeetingRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MeetingRoomRepository extends JpaRepository<MeetingRoom, Long> {

    // Recherche par statut
    List<MeetingRoom> findByStatus(String status);

    // Recherche par capacité
    List<MeetingRoom> findByCapacity(Integer capacity);

    // Recherche par localisation
    List<MeetingRoom> findByLocationContainingIgnoreCase(String location);

}
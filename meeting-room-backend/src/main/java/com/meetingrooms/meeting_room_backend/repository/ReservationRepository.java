package com.meetingrooms.meeting_room_backend.repository;

import com.meetingrooms.meeting_room_backend.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByMeetingRoomIdAndReservationDate(
            Long meetingRoomId,
            LocalDate reservationDate
    );
}
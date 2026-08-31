package com.meetingrooms.meeting_room_backend.service;

import com.meetingrooms.meeting_room_backend.repository.MeetingRoomRepository;
import com.meetingrooms.meeting_room_backend.repository.ReservationRepository;
import com.meetingrooms.meeting_room_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardService {

    private final UserRepository userRepository;
    private final MeetingRoomRepository meetingRoomRepository;
    private final ReservationRepository reservationRepository;

    public DashboardService(
            UserRepository userRepository,
            MeetingRoomRepository meetingRoomRepository,
            ReservationRepository reservationRepository) {

        this.userRepository = userRepository;
        this.meetingRoomRepository = meetingRoomRepository;
        this.reservationRepository = reservationRepository;
    }

    public Map<String, Long> getDashboardStats() {

        Map<String, Long> stats = new HashMap<>();

        stats.put("users", userRepository.count());
        stats.put("meetingRooms", meetingRoomRepository.count());
        stats.put("reservations", reservationRepository.count());

        return stats;
    }
}
package com.meetingrooms.meeting_room_backend.service;

import com.meetingrooms.meeting_room_backend.entity.Reservation;
import com.meetingrooms.meeting_room_backend.repository.ReservationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    // Ajouter une réservation
    public Reservation saveReservation(Reservation reservation) {

        List<Reservation> reservations =
                reservationRepository.findByMeetingRoomIdAndReservationDate(
                        reservation.getMeetingRoom().getId(),
                        reservation.getReservationDate()
                );

        for (Reservation r : reservations) {

            boolean conflict =
                    reservation.getStartTime().isBefore(r.getEndTime())
                    && reservation.getEndTime().isAfter(r.getStartTime());

            if (conflict) {
                throw new RuntimeException(
                        "Cette salle est déjà réservée pendant cette période."
                );
            }
        }

        return reservationRepository.save(reservation);
    }

    // Afficher toutes les réservations
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    // Chercher par ID
    public Optional<Reservation> getReservationById(Long id) {
        return reservationRepository.findById(id);
    }

    // Modifier
    public Reservation updateReservation(Long id, Reservation reservation) {

        Reservation oldReservation =
                reservationRepository.findById(id).orElseThrow();

        oldReservation.setUser(reservation.getUser());
        oldReservation.setMeetingRoom(reservation.getMeetingRoom());
        oldReservation.setReservationDate(reservation.getReservationDate());
        oldReservation.setStartTime(reservation.getStartTime());
        oldReservation.setEndTime(reservation.getEndTime());
        oldReservation.setStatus(reservation.getStatus());

        return reservationRepository.save(oldReservation);
    }

    // Supprimer
    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }
}
package com.meetingrooms.meeting_room_backend.service;

import com.meetingrooms.meeting_room_backend.dto.UserDTO;
import com.meetingrooms.meeting_room_backend.entity.User;
import com.meetingrooms.meeting_room_backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Convert User -> UserDTO
    private UserDTO convertToDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole()
        );
    }

    // Ajouter un utilisateur
    public UserDTO saveUser(User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(user);

        return convertToDTO(savedUser);
    }

    // Afficher tous les utilisateurs
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Chercher par ID
    public Optional<UserDTO> getUserById(Long id) {
        return userRepository.findById(id)
                .map(this::convertToDTO);
    }

    // Chercher par Email
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Modifier un utilisateur
    public UserDTO updateUser(Long id, User user) {

        return userRepository.findById(id).map(existingUser -> {

            existingUser.setFirstName(user.getFirstName());
            existingUser.setLastName(user.getLastName());
            existingUser.setEmail(user.getEmail());

            existingUser.setPassword(
                    passwordEncoder.encode(user.getPassword())
            );

            existingUser.setRole(user.getRole());

            User updatedUser = userRepository.save(existingUser);

            return convertToDTO(updatedUser);

        }).orElse(null);
    }

    // Supprimer
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
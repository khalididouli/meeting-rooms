package com.meetingrooms.meeting_room_backend.controller;

import com.meetingrooms.meeting_room_backend.dto.UserDTO;
import com.meetingrooms.meeting_room_backend.entity.User;
import com.meetingrooms.meeting_room_backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Ajouter un utilisateur
    @PostMapping
    public UserDTO createUser(@Valid @RequestBody User user) {
        return userService.saveUser(user);
    }

    // Afficher tous les utilisateurs
    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    // Chercher un utilisateur par ID
    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable Long id) {
        return userService.getUserById(id).orElse(null);
    }

    // Modifier un utilisateur
    @PutMapping("/{id}")
    public UserDTO updateUser(
            @PathVariable Long id,
            @Valid @RequestBody User user) {

        return userService.updateUser(id, user);
    }

    // Supprimer un utilisateur
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
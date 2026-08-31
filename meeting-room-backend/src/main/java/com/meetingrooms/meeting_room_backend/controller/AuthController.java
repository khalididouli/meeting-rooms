package com.meetingrooms.meeting_room_backend.controller;

import com.meetingrooms.meeting_room_backend.dto.LoginRequest;
import com.meetingrooms.meeting_room_backend.dto.LoginResponse;
import com.meetingrooms.meeting_room_backend.dto.RegisterRequest;
import com.meetingrooms.meeting_room_backend.dto.UserDTO;
import com.meetingrooms.meeting_room_backend.entity.User;
import com.meetingrooms.meeting_room_backend.security.JwtService;
import com.meetingrooms.meeting_room_backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserService userService;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtService jwtService,
                          UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userService = userService;
    }

    // Register
    @PostMapping("/register")
    public UserDTO register(@Valid @RequestBody RegisterRequest request) {

        User user = new User();

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(request.getRole());

        return userService.saveUser(user);
    }

    // Login
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        String token = jwtService.generateToken(request.getEmail());

        return new LoginResponse(token);
    }
}
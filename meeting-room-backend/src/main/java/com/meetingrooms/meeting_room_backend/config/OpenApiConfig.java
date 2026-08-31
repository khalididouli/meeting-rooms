package com.meetingrooms.meeting_room_backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI meetingRoomAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Meeting Room Reservation API")
                        .description("API for managing users, meeting rooms and reservations")
                        .version("1.0"));
    }
}
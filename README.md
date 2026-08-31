# Meeting Room Management System

## Description

Meeting Room Management System is a web application that allows companies to manage meeting rooms and reservations.

The application was developed using:

- Spring Boot
- React + Vite
- MySQL
- Docker
- JWT Authentication

---

## Features

### Authentication
- Login
- JWT Authentication
- Role Management

### Users
- Add User
- Update User
- Delete User
- List Users

### Meeting Rooms
- Add Meeting Room
- Update Meeting Room
- Delete Meeting Room
- Search Rooms

### Reservations
- Add Reservation
- Update Reservation
- Delete Reservation
- Prevent reservation conflicts

---

## Technologies

Backend
- Spring Boot
- Spring Security
- Spring Data JPA
- MySQL

Frontend
- React
- Vite
- Axios
- Bootstrap

Deployment
- Docker
- Docker Compose

---

## Project Structure

meeting_rooms/
│
├── meeting-room-backend
├── meeting-room-frontend
├── docker-compose.yml
├── README.md
└── database/
    └── meeting_rooms_db.sql

---

## Run Project

```bash
docker compose up --build
```

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:8080
```

---

## Author

Khaled Idouli

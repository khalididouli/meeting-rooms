import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";

import Users from "../pages/users/Users";
import MeetingRooms from "../pages/meetingRooms/MeetingRooms";
import Reservations from "../pages/reservations/Reservations";

function AppRouter() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/users" element={<Users />} />

                <Route path="/meeting-rooms" element={<MeetingRooms />} />

                <Route path="/reservations" element={<Reservations />} />

            </Routes>

        </BrowserRouter>

    );

}

export default AppRouter;
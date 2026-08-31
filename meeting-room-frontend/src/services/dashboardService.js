import { getUsers } from "./userService";
import { getMeetingRooms } from "./meetingRoomService";
import { getReservations } from "./reservationService";


export const getDashboardStats = async () => {

    const users = await getUsers();

    const rooms = await getMeetingRooms();

    const reservations = await getReservations();


    const availableRooms = rooms.filter(
        room => room.status === "AVAILABLE"
    ).length;


    return {
        users: users.length,
        rooms: rooms.length,
        reservations: reservations.length,
        availableRooms
    };

};
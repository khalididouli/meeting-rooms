import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";

import {
    getReservations,
    addReservation,
    updateReservation,
    deleteReservation
} from "../../services/reservationService";

import { getUsers } from "../../services/userService";
import { getMeetingRooms } from "../../services/meetingRoomService";

function Reservations() {

    const [reservations, setReservations] = useState([]);

    const [users, setUsers] = useState([]);
    const [rooms, setRooms] = useState([]);

    const [userId, setUserId] = useState("");
    const [roomId, setRoomId] = useState("");

    const [reservationDate, setReservationDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const [status, setStatus] = useState("PENDING");

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {

        loadReservations();
        loadUsers();
        loadRooms();

    }, []);

    const loadReservations = async () => {

        try {

            const data = await getReservations();

            setReservations(data);

        } catch (error) {

            console.log(error);

        }

    };

    const loadUsers = async () => {

        try {

            const data = await getUsers();

            setUsers(data);

        } catch (error) {

            console.log(error);

        }

    };

    const loadRooms = async () => {

        try {

            const data = await getMeetingRooms();

            setRooms(data);

        } catch (error) {

            console.log(error);

        }

    };    const clearForm = () => {

        setEditingId(null);

        setUserId("");
        setRoomId("");

        setReservationDate("");
        setStartTime("");
        setEndTime("");

        setStatus("PENDING");

    };

    const handleAddReservation = async () => {

        try {

            await addReservation({

                user: {
                    id: userId
                },

                meetingRoom: {
                    id: roomId
                },

                reservationDate,
                startTime,
                endTime,
                status

            });

            alert("Reservation ajoutée avec succès");

            clearForm();

            loadReservations();

        } catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Erreur");

        }

    };

    const handleEditReservation = (reservation) => {

        setEditingId(reservation.id);

        setUserId(reservation.user.id);

        setRoomId(reservation.meetingRoom.id);

        setReservationDate(reservation.reservationDate);

        setStartTime(reservation.startTime);

        setEndTime(reservation.endTime);

        setStatus(reservation.status);

    };

    const handleUpdateReservation = async () => {

        try {

            await updateReservation(editingId, {

                user: {
                    id: userId
                },

                meetingRoom: {
                    id: roomId
                },

                reservationDate,
                startTime,
                endTime,
                status

            });

            alert("Reservation modifiée");

            clearForm();

            loadReservations();

        } catch (error) {

            console.log(error);

            alert("Erreur");

        }

    };

    const handleDeleteReservation = async (id) => {

        if (!window.confirm("Supprimer cette réservation ?"))
            return;

        try {

            await deleteReservation(id);

            loadReservations();

        } catch (error) {

            console.log(error);

        }

    };    return (

        <DashboardLayout>

            <h2 className="mb-4">Reservations</h2>

            <div className="card shadow mb-4">

                <div className="card-body">

                    <h4 className="mb-3">

                        {editingId ? "Update Reservation" : "Add Reservation"}

                    </h4>

                    <div className="row mb-3">

                        <div className="col">

                            <select
                                className="form-select"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                            >

                                <option value="">Select User</option>

                                {users.map(user => (

                                    <option
                                        key={user.id}
                                        value={user.id}
                                    >

                                        {user.firstName} {user.lastName}

                                    </option>

                                ))}

                            </select>

                        </div>

                        <div className="col">

                            <select
                                className="form-select"
                                value={roomId}
                                onChange={(e) => setRoomId(e.target.value)}
                            >

                                <option value="">Select Room</option>

                                {rooms.map(room => (

                                    <option
                                        key={room.id}
                                        value={room.id}
                                    >

                                        {room.name}

                                    </option>

                                ))}

                            </select>

                        </div>

                    </div>

                    <div className="row mb-3">

                        <div className="col">

                            <input
                                type="date"
                                className="form-control"
                                value={reservationDate}
                                onChange={(e) => setReservationDate(e.target.value)}
                            />

                        </div>

                        <div className="col">

                            <input
                                type="time"
                                className="form-control"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />

                        </div>

                        <div className="col">

                            <input
                                type="time"
                                className="form-control"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />

                        </div>

                        <div className="col">

                            <select
                                className="form-select"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >

                                <option value="PENDING">PENDING</option>
                                <option value="APPROVED">APPROVED</option>
                                <option value="CANCELLED">CANCELLED</option>

                            </select>

                        </div>

                    </div>

                    {editingId ? (

                        <>
                            <button
                                className="btn btn-warning me-2"
                                onClick={handleUpdateReservation}
                            >
                                Update
                            </button>

                            <button
                                className="btn btn-secondary"
                                onClick={clearForm}
                            >
                                Cancel
                            </button>
                        </>

                    ) : (

                        <button
                            className="btn btn-success"
                            onClick={handleAddReservation}
                        >
                            Add Reservation
                        </button>

                    )}

                </div>

            </div>

            <table className="table table-bordered table-striped shadow">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>
                        <th>User</th>
                        <th>Meeting Room</th>
                        <th>Date</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Status</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {reservations.map((reservation) => (

                        <tr key={reservation.id}>

                            <td>{reservation.id}</td>

                            <td>

                                {reservation.user.firstName} {reservation.user.lastName}

                            </td>

                            <td>

                                {reservation.meetingRoom.name}

                            </td>

                            <td>{reservation.reservationDate}</td>

                            <td>{reservation.startTime}</td>

                            <td>{reservation.endTime}</td>

                            <td>{reservation.status}</td>

                            <td>

                                <button
                                    className="btn btn-primary btn-sm me-2"
                                    onClick={() => handleEditReservation(reservation)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeleteReservation(reservation.id)}
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </DashboardLayout>

    );

}


export default Reservations;
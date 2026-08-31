import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
    getMeetingRooms,
    addMeetingRoom,
    updateMeetingRoom,
    deleteMeetingRoom
} from "../../services/meetingRoomService";

function MeetingRooms() {

    const [rooms, setRooms] = useState([]);

    const [name, setName] = useState("");
    const [capacity, setCapacity] = useState("");
    const [location, setLocation] = useState("");
    const [equipment, setEquipment] = useState("");
    const [status, setStatus] = useState("AVAILABLE");

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadRooms();
    }, []);

    const loadRooms = async () => {

        try {

            const data = await getMeetingRooms();
            setRooms(data);

        } catch (error) {

            console.log(error);
            alert("Erreur lors du chargement");

        }

    };

    const clearForm = () => {

        setEditingId(null);

        setName("");
        setCapacity("");
        setLocation("");
        setEquipment("");
        setStatus("AVAILABLE");

    };

    const handleAddRoom = async () => {

        try {

            await addMeetingRoom({

                name,
                capacity,
                location,
                equipment,
                status

            });

            alert("Meeting Room ajoutée");

            clearForm();

            loadRooms();

        } catch (error) {

            console.log(error);
            alert("Erreur");

        }

    };

    const handleEditRoom = (room) => {

        setEditingId(room.id);

        setName(room.name);
        setCapacity(room.capacity);
        setLocation(room.location);
        setEquipment(room.equipment);
        setStatus(room.status);

    };

    const handleUpdateRoom = async () => {

        try {

            await updateMeetingRoom(editingId, {

                name,
                capacity,
                location,
                equipment,
                status

            });

            alert("Meeting Room modifiée");

            clearForm();

            loadRooms();

        } catch (error) {

            console.log(error);
            alert("Erreur");

        }

    };

    const handleDeleteRoom = async (id) => {

        if (!window.confirm("Supprimer cette salle ?"))
            return;

        try {

            await deleteMeetingRoom(id);

            loadRooms();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <DashboardLayout>

            <h2 className="mb-4">
                Meeting Rooms
            </h2>

            <div className="card shadow mb-4">

                <div className="card-body">

                    <h4 className="mb-3">

                        {editingId ? "Update Room" : "Add Room"}

                    </h4>

                    <div className="row mb-3">

                        <div className="col">

                            <input
                                className="form-control"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                        </div>

                        <div className="col">

                            <input
                                type="number"
                                className="form-control"
                                placeholder="Capacity"
                                value={capacity}
                                onChange={(e) => setCapacity(e.target.value)}
                            />

                        </div>

                    </div>

                    <div className="row mb-3">

                        <div className="col">

                            <input
                                className="form-control"
                                placeholder="Location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />

                        </div>

                        <div className="col">

                            <input
                                className="form-control"
                                placeholder="Equipment"
                                value={equipment}
                                onChange={(e) => setEquipment(e.target.value)}
                            />

                        </div>

                        <div className="col">

                            <select
                                className="form-select"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >

                                <option value="AVAILABLE">AVAILABLE</option>
                                <option value="OCCUPIED">OCCUPIED</option>
                                <option value="MAINTENANCE">MAINTENANCE</option>

                            </select>

                        </div>

                    </div>

                    {editingId ? (

                        <>
                            <button
                                className="btn btn-warning me-2"
                                onClick={handleUpdateRoom}
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
                            onClick={handleAddRoom}
                        >
                            Add Room
                        </button>

                    )}

                </div>

            </div>

            <table className="table table-bordered table-striped shadow">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>
                        <th>Name</th>
                        <th>Capacity</th>
                        <th>Location</th>
                        <th>Equipment</th>
                        <th>Status</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {rooms.map((room) => (

                        <tr key={room.id}>

                            <td>{room.id}</td>
                            <td>{room.name}</td>
                            <td>{room.capacity}</td>
                            <td>{room.location}</td>
                            <td>{room.equipment}</td>
                            <td>{room.status}</td>

                            <td>

                                <button
                                    className="btn btn-primary btn-sm me-2"
                                    onClick={() => handleEditRoom(room)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeleteRoom(room.id)}
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

export default MeetingRooms;
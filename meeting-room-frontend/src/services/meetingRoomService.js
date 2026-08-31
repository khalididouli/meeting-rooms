import axios from "axios";

const API_URL = "http://localhost:8080/api/meeting-rooms";

const getToken = () => localStorage.getItem("token");

export const getMeetingRooms = async () => {

    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    return response.data.content;
};

export const addMeetingRoom = async (room) => {

    const response = await axios.post(API_URL, room, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    return response.data;
};

export const updateMeetingRoom = async (id, room) => {

    const response = await axios.put(
        `${API_URL}/${id}`,
        room,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};

export const deleteMeetingRoom = async (id) => {

    await axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

};
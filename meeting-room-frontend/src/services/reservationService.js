import axios from "axios";

const API_URL = "http://localhost:8080/api/reservations";

const getToken = () => localStorage.getItem("token");

export const getReservations = async () => {

    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    return response.data;
};

export const addReservation = async (reservation) => {

    const response = await axios.post(API_URL, reservation, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    return response.data;
};

export const updateReservation = async (id, reservation) => {

    const response = await axios.put(
        `${API_URL}/${id}`,
        reservation,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};

export const deleteReservation = async (id) => {

    await axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

};
import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";

import { getDashboardStats } from "../../services/dashboardService";

import {
    FaUsers,
    FaBuilding,
    FaCalendarCheck,
    FaCheckCircle
} from "react-icons/fa";


function Dashboard() {

    const [stats, setStats] = useState({
        users: 0,
        rooms: 0,
        reservations: 0,
        availableRooms: 0
    });

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const loadStats = async () => {

            try {

                const data = await getDashboardStats();

                setStats(data);

            } catch (error) {

                console.error("Dashboard error:", error);

            } finally {

                setLoading(false);

            }

        };


        loadStats();

    }, []);



    const cards = [

        {
            title: "Total Users",
            value: stats.users,
            icon: <FaUsers size={35} />
        },

        {
            title: "Meeting Rooms",
            value: stats.rooms,
            icon: <FaBuilding size={35} />
        },

        {
            title: "Reservations",
            value: stats.reservations,
            icon: <FaCalendarCheck size={35} />
        },

        {
            title: "Available Rooms",
            value: stats.availableRooms,
            icon: <FaCheckCircle size={35} />
        }

    ];



    return (

        <DashboardLayout>

            <h2 className="mb-4">
                Dashboard
            </h2>


            <div className="row g-4">


                {cards.map((card, index) => (

                    <div className="col-md-6 col-lg-3" key={index}>


                        <div className="card shadow h-100">


                            <div className="card-body text-center">


                                <div className="mb-3">

                                    {card.icon}

                                </div>


                                <h5>
                                    {card.title}
                                </h5>


                                <h2>

                                    {loading ? "..." : card.value}

                                </h2>


                            </div>


                        </div>


                    </div>


                ))}


            </div>


        </DashboardLayout>

    );

}


export default Dashboard;
import { Link } from "react-router-dom";

function Sidebar() {
    return (

        <div
            className="bg-dark text-white p-3"
            style={{
                width: "250px",
                minHeight: "100vh"
            }}
        >

            <h3 className="text-center mb-4">
                Meeting Room
            </h3>

            <ul className="nav flex-column">

                <li className="nav-item mb-2">
                    <Link
                        className="nav-link text-white"
                        to="/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link
                        className="nav-link text-white"
                        to="/users"
                    >
                        Users
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link
                        className="nav-link text-white"
                        to="/meeting-rooms"
                    >
                        Meeting Rooms
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link
                        className="nav-link text-white"
                        to="/reservations"
                    >
                        Reservations
                    </Link>
                </li>

                <hr />

                <li className="nav-item">

                    <button
                        className="btn btn-danger w-100"
                        onClick={() => {

                            localStorage.removeItem("token");

                            window.location.href = "/";

                        }}
                    >
                        Logout
                    </button>

                </li>

            </ul>

        </div>

    );
}

export default Sidebar;
import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
    getUsers,
    addUser,
    deleteUser,
    updateUser
} from "../../services/userService";

function Users() {

    const [users, setUsers] = useState([]);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("USER");

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {

        try {

            const data = await getUsers();
            setUsers(data);

        } catch (error) {

            console.error(error);
            alert("Erreur lors du chargement des utilisateurs");

        }

    };

    const clearForm = () => {

        setEditingId(null);

        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setRole("USER");

    };

    const handleAddUser = async () => {

        try {

            await addUser({
                firstName,
                lastName,
                email,
                password,
                role
            });

            alert("Utilisateur ajouté avec succès");

            clearForm();

            loadUsers();

        } catch (error) {

            console.error(error);
            alert("Erreur lors de l'ajout");

        }

    };

    const handleEditUser = (user) => {

        setEditingId(user.id);

        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setPassword("");
        setRole(user.role);

    };

    const handleUpdateUser = async () => {

        try {

            await updateUser(editingId, {

                firstName,
                lastName,
                email,
                password,
                role

            });

            alert("Utilisateur modifié");

            clearForm();

            loadUsers();

        } catch (error) {

            console.error(error);
            alert("Erreur lors de la modification");

        }

    };

    const handleDeleteUser = async (id) => {

        if (!window.confirm("Voulez-vous supprimer cet utilisateur ?"))
            return;

        try {

            await deleteUser(id);

            alert("Utilisateur supprimé");

            loadUsers();

        } catch (error) {

            console.error(error);
            alert("Erreur lors de la suppression");

        }

    };

    return (

        <DashboardLayout>

            <h2 className="mb-4">Users</h2>

            <div className="card shadow mb-4">

                <div className="card-body">

                    <h4 className="mb-3">

                        {editingId ? "Update User" : "Add User"}

                    </h4>

                    <div className="row mb-3">

                        <div className="col">

                            <input
                                className="form-control"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />

                        </div>

                        <div className="col">

                            <input
                                className="form-control"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />

                        </div>

                    </div>

                    <div className="row mb-3">

                        <div className="col">

                            <input
                                className="form-control"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                        </div>

                        <div className="col">

                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                        </div>

                        <div className="col">

                            <select
                                className="form-select"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >

                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>

                            </select>

                        </div>

                    </div>

                    {editingId ? (

                        <>
                            <button
                                className="btn btn-warning me-2"
                                onClick={handleUpdateUser}
                            >
                                Update User
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
                            onClick={handleAddUser}
                        >
                            Add User
                        </button>

                    )}

                </div>

            </div>

            <table className="table table-bordered table-striped shadow">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {users.map((user) => (

                        <tr key={user.id}>

                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>

                            <td>

                                <button
                                    className="btn btn-primary btn-sm me-2"
                                    onClick={() => handleEditUser(user)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeleteUser(user.id)}
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

export default Users;
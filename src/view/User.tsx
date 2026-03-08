import "./User.css";
import {useModal} from "@ebay/nice-modal-react";
import UserModal from "@/component/modal/UserModal.tsx";

const users = [
    {
        id: 1,
        name: "John Doe",
        email: "john@email.com",
        role: "Admin",
        status: "Active"
    },
    {
        id: 2,
        name: "Sarah Smith",
        email: "sarah@email.com",
        role: "User",
        status: "Inactive"
    },
    {
        id: 3,
        name: "Mike Johnson",
        email: "mike@email.com",
        role: "User",
        status: "Active"
    }
];

export default function User() {
    const userModal = useModal(UserModal);
    return (
        <div className="users-page">

            <div className="users-header">
                <div>
                    <h1>Users</h1>
                    <p>Manage application users</p>
                </div>
                <div>
                    <button className={"save-btn"} style={{background: "#00798c"}} onClick={() => {
                        userModal.show();
                    }}>Create User
                    </button>
                </div>
            </div>

            <div className="table-container">
                <table className="users-table">

                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                    </tr>
                    </thead>

                    <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="user-name">{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>

                            <td>
                  <span
                      className={`status-badge ${
                          user.status === "Active"
                              ? "active"
                              : "inactive"
                      }`}
                  >
                    {user.status}
                  </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>

                </table>
            </div>

        </div>
    );
}
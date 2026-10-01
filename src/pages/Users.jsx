import React, { useState } from "react";

function Users() {
  const [systemUsers, setSystemUsers] = useState([
    {
      username: "admin",
      name: "System Administrator",
      role: "Admin",
      password: "admin123",
      active: true,
    },
    {
      username: "dg",
      name: "Director General",
      role: "Director General",
      password: "dg123",
      active: true,
    },
    {
      username: "manager",
      name: "Director / Manager",
      role: "Director / Manager",
      password: "manager123",
      active: true,
    },
    {
      username: "hr",
      name: "Human Resources",
      role: "Human Resources",
      password: "hr123",
      active: true,
    },
    {
      username: "assistant",
      name: "Assistant Manager",
      role: "Assistant Manager",
      password: "assistant123",
      active: true,
    },
    {
      username: "staff",
      name: "Staff Member",
      role: "Staff",
      password: "staff123",
      active: true,
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [newUser, setNewUser] = useState({
    username: "",
    name: "",
    password: "",
    role: "Staff",
  });

  const [message, setMessage] = useState("");

  // Activate / Deactivate user
  const toggleActive = (index) => {
    setSystemUsers(
      systemUsers.map((user, i) =>
        i === index ? { ...user, active: !user.active } : user
      )
    );
  };

  // Handle input changes
  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  // Add new user
  const addUser = (e) => {
    e.preventDefault();

    // Check required fields
    if (
      !newUser.username ||
      !newUser.name ||
      !newUser.password ||
      !newUser.role
    ) {
      setMessage("Please fill in all fields.");
      return;
    }

    // Check if username already exists
    const usernameExists = systemUsers.some(
      (user) =>
        user.username.toLowerCase() === newUser.username.toLowerCase()
    );

    if (usernameExists) {
      setMessage("Username already exists.");
      return;
    }

    const userToAdd = {
      username: newUser.username,
      name: newUser.name,
      password: newUser.password,
      role: newUser.role,
      active: true,
    };

    setSystemUsers([...systemUsers, userToAdd]);

    // Clear form
    setNewUser({
      username: "",
      name: "",
      password: "",
      role: "Staff",
    });

    setMessage("New user added successfully.");

    // Hide form
    setShowForm(false);
  };

  return (
    <div className="page">

      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2>Users & System Settings</h2>
          <p>Manage system users and their access status.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => {
            setShowForm(!showForm);
            setMessage("");
          }}
        >
          {showForm ? "Close Form" : "+ Add New User"}
        </button>
      </div>

      {/* Success / Error Message */}
      {message && (
        <div className="success-message">
          {message}
        </div>
      )}

      {/* Add User Form */}
      {showForm && (
        <div className="form-panel">

          <h3>Add New User</h3>

          <form onSubmit={addUser}>

            <div className="form-grid">

              {/* Full Name */}
              <div className="form-field">
                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  value={newUser.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />
              </div>

              {/* Username */}
              <div className="form-field">
                <label>Username</label>

                <input
                  type="text"
                  name="username"
                  value={newUser.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                />
              </div>

              {/* Password */}
              <div className="form-field">
                <label>Password</label>

                <input
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                />
              </div>

              {/* Role */}
              <div className="form-field">
                <label>Role</label>

                <select
                  name="role"
                  value={newUser.role}
                  onChange={handleChange}
                >
                  <option value="Admin">Admin</option>
                  <option value="Director General">
                    Director General
                  </option>
                  <option value="Director / Manager">
                    Director / Manager
                  </option>
                  <option value="Human Resources">
                    Human Resources
                  </option>
                  <option value="Assistant Manager">
                    Assistant Manager
                  </option>
                  <option value="Staff">
                    Staff
                  </option>
                </select>
              </div>

            </div>

            <div style={{ marginTop: "20px" }}>
              <button
                type="submit"
                className="primary-button"
              >
                Save User
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Users Table */}
      <div className="table-panel">

        <table>

          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Role</th>
              <th>Access</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {systemUsers.map((user, index) => (
              <tr key={user.username}>

                <td>{user.username}</td>

                <td>{user.name}</td>

                <td>{user.role}</td>

                <td>
                  <span
                    className={`status-badge ${
                      user.active
                        ? "validated"
                        : "duplicate"
                    }`}
                  >
                    {user.active ? "Active" : "Inactive"}
                  </span>
                </td>

                <td>

                  <button
                    className="small-button"
                    onClick={() => toggleActive(index)}
                  >
                    {user.active
                      ? "Deactivate"
                      : "Activate"}
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Users;
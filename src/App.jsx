import React, { useState } from "react";
import "./App.css";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import FraudIntake from "./pages/FraudIntake";
import Validation from "./pages/Validation";
import Assignment from "./pages/Assignment";
import Investigation from "./pages/Investigation";
import Evidence from "./pages/Evidence";
import Classification from "./pages/Classification";
import Actions from "./pages/Actions";
import Closure from "./pages/Closure";
import Reports from "./pages/Reports";
import Facilities from "./pages/Facilities";
import Members from "./pages/Members";
import Users from "./pages/Users";


// ======================================================
// USERS
// ======================================================

const users = [
  {
    username: "admin",
    password: "admin123",
    name: "System Administrator",
    role: "Admin",
  },

  {
    username: "dg",
    password: "dg123",
    name: "Director General",
    role: "Director General",
  },

  {
    username: "manager",
    password: "manager123",
    name: "Director / Manager",
    role: "Director / Manager",
  },

  {
    username: "hr",
    password: "hr123",
    name: "Human Resources",
    role: "Human Resources",
  },

  {
    username: "assistant",
    password: "assistant123",
    name: "Assistant Manager",
    role: "Assistant Manager",
  },

  {
    username: "staff",
    password: "staff123",
    name: "Staff Member",
    role: "Staff",
  },
];


// ======================================================
// ROLE PERMISSIONS
// ======================================================

const rolePermissions = {
  Admin: [
    "dashboard",
    "intake",
    "validation",
    "assignment",
    "investigation",
    "evidence",
    "classification",
    "action",
    "closure",
    "reports",
    "facilities",
    "members",
    "users",
  ],

  "Director General": [
    "dashboard",
    "intake",
    "validation",
    "assignment",
    "investigation",
    "evidence",
    "classification",
    "action",
    "closure",
    "reports",
    "facilities",
    "members",
  ],

  "Director / Manager": [
    "dashboard",
    "intake",
    "validation",
    "assignment",
    "investigation",
    "evidence",
    "classification",
    "action",
    "closure",
    "reports",
    "facilities",
    "members",
  ],

  "Human Resources": [
    "dashboard",
    "reports",
    "users",
    "members",
  ],

  "Assistant Manager": [
    "dashboard",
    "intake",
    "validation",
    "assignment",
    "investigation",
    "evidence",
    "reports",
    "facilities",
    "members",
  ],

  Staff: [
    "dashboard",
    "intake",
    "validation",
    "investigation",
    "evidence",
  ],
};


// ======================================================
// PAGE TITLES
// ======================================================

const pageTitles = {
  dashboard: "Executive Dashboard",
  intake: "Fraud Intelligence Intake",
  validation: "Validation & Deduplication",
  assignment: "Case Assignment",
  investigation: "Investigation Management",
  evidence: "Evidence Management",
  classification: "Classification & Decision",
  action: "Action / Recovery / Sanction",
  closure: "Case Closure",
  reports: "Reports & Analytics",
  facilities: "Facilities & Provider Intelligence",
  members: "Member Intelligence",
  users: "Users & System Settings",
};


// ======================================================
// LOGIN
// ======================================================

function Login({ onLogin }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [remember, setRemember] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = onLogin(username, password);

    if (!result) {
      setError("Username au password sio sahihi.");
    } else {
      setError("");
    }
  };

  return (
    <div className="login-page">

      {/* LEFT HERO SECTION */}
      <section className="login-hero">

        <div className="hero-overlay"></div>

        <div className="hero-content">

          <div className="zhsf-brand">

            <div className="zhsf-logo-large">
              ZHSF
            </div>

            <div className="zhsf-full-name">
              Zanzibar Health
              <br />
              Services Fund
            </div>

          </div>


          <div className="hero-title">

            <h1>
              Fraud Intelligence
            </h1>

            <h2>
              Case Management System
            </h2>

            <p>
              Detect fraud. Protect resources.
              <br />
              Ensure quality healthcare.
            </p>

          </div>


          <div className="hero-features">

            <div className="hero-feature">

              <div className="feature-icon">
                ✓
              </div>

              <div>
                <strong>
                  Fraud Detection
                </strong>

                <span>
                  Identify suspicious claims and patterns
                </span>
              </div>

            </div>


            <div className="hero-feature">

              <div className="feature-icon">
                ⌕
              </div>

              <div>
                <strong>
                  Case Management
                </strong>

                <span>
                  Track and manage investigations
                </span>
              </div>

            </div>


            <div className="hero-feature">

              <div className="feature-icon">
                ▮
              </div>

              <div>
                <strong>
                  Analytics & Reporting
                </strong>

                <span>
                  Data-driven insights for better decisions
                </span>
              </div>

            </div>

          </div>


          <div className="hero-footer">
            BETTER DATA&nbsp;&nbsp; | &nbsp;&nbsp;
            SAFER HEALTHCARE&nbsp;&nbsp; | &nbsp;&nbsp;
            STRONGER SYSTEMS
          </div>

        </div>

      </section>


      {/* RIGHT LOGIN SECTION */}
      <section className="login-right">

        <div className="login-decoration decoration-one"></div>

        <div className="login-decoration decoration-two"></div>


        <div className="login-card">

          <div className="login-card-header">

            <div className="login-logo">
              ZHSF
            </div>

            <h1>
              Fraud Intelligence
            </h1>

            <h2>
              Case Management System
            </h2>

            <p>
              Sign in to your account to continue
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}


            {/* USERNAME */}
            <div className="login-input-group">

              <label>
                <span className="input-icon">
                  ♙
                </span>

                Username
              </label>

              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                required
              />

            </div>


            {/* PASSWORD */}
            <div className="login-input-group">

              <label>
                <span className="input-icon">
                  🔒
                </span>

                Password
              </label>


              <div className="password-wrapper">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />


                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword
                    ? "◉"
                    : "◌"}
                </button>

              </div>

            </div>


            {/* OPTIONS */}
            <div className="login-options">

              <label className="remember-option">

                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) =>
                    setRemember(e.target.checked)
                  }
                />

                <span>
                  Remember me
                </span>

              </label>


              <button
                type="button"
                className="forgot-password"
                onClick={() =>
                  alert(
                    "Please contact the system administrator."
                  )
                }
              >
                Forgot password?
              </button>

            </div>


            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="login-button"
            >
              <span>
                →
              </span>

              Login
            </button>

          </form>


          {/* FOOTER */}
          <div className="login-card-footer">

            <div className="footer-shield">
              ✓
            </div>

            <div>

              <strong>
                Zanzibar Health Services Fund
              </strong>

              <span>
                Fraud Intelligence System v1.0
              </span>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}


// ======================================================
// MAIN APP
// ======================================================

function App() {

  const [currentUser, setCurrentUser] =
    useState(null);

  const [currentPage, setCurrentPage] =
    useState("dashboard");


  // ====================================================
  // LOGIN FUNCTION
  // ====================================================

  const handleLogin = (username, password) => {

    const user = users.find(
      (u) =>
        u.username === username &&
        u.password === password
    );

    if (user) {

      // Save the COMPLETE user object
      setCurrentUser(user);

      // Start from dashboard
      setCurrentPage("dashboard");

      return user;
    }

    return null;
  };


  // ====================================================
  // SHOW LOGIN IF USER IS NOT LOGGED IN
  // ====================================================

  if (!currentUser) {

    return (
      <Login
        onLogin={handleLogin}
      />
    );

  }


  // ====================================================
  // GET USER PERMISSIONS
  // ====================================================

  const allowedPages =
    rolePermissions[currentUser.role] || [];


  // ====================================================
  // NAVIGATION
  // ====================================================

  const navigate = (page) => {

    if (allowedPages.includes(page)) {

      setCurrentPage(page);

    }

  };


  // ====================================================
  // LOGOUT
  // ====================================================

  const logout = () => {

    setCurrentUser(null);

    setCurrentPage("dashboard");

  };


  // ====================================================
  // RENDER PAGE
  // ====================================================

  const renderPage = () => {

    switch (currentPage) {

      case "dashboard":
        return <Dashboard />;


      case "intake":
        return <FraudIntake />;


      case "validation":
        return <Validation />;


      case "assignment":
        return <Assignment />;


      case "investigation":
        return <Investigation />;


      case "evidence":
        return <Evidence />;


      case "classification":
        return <Classification />;


      case "action":
        return <Actions />;


      case "closure":
        return <Closure />;


      case "reports":
        return <Reports />;


      case "facilities":
        return <Facilities />;


      case "members":
        return <Members />;


      case "users":
        return <Users />;


      default:
        return <Dashboard />;

    }

  };


  // ====================================================
  // MAIN LAYOUT
  // ====================================================

  return (

    <MainLayout

      currentUser={currentUser}

      currentPage={currentPage}

      pageTitle={pageTitles[currentPage]}

      allowedPages={allowedPages}

      onNavigate={navigate}

      onLogout={logout}

    >

      {renderPage()}

    </MainLayout>

  );

}


export default App;
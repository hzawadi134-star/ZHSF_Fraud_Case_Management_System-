import React from "react";

function Navbar({ pageTitle, currentUser, onLogout }) {
  return (
    <header className="navbar">
      <div>
        <div className="breadcrumb">ZHSF / Fraud Intelligence</div>
        <h1>{pageTitle}</h1>
      </div>

      <div className="navbar-user">
        <div className="online-dot"></div>

        <div>
          <strong>{currentUser.name}</strong>
          <span>{currentUser.role}</span>
        </div>

        <button onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
}

export default Navbar;
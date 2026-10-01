import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout({
  children,
  currentPage,
  pageTitle,
  currentUser,
  allowedPages,
  onNavigate,
  onLogout,
}) {
  return (
    <div className="app-layout">
      <Sidebar
        currentPage={currentPage}
        allowedPages={allowedPages}
        onNavigate={onNavigate}
        currentUser={currentUser}
        onLogout={onLogout}
      />

      <div className="main-area">
        <Navbar
          pageTitle={pageTitle}
          currentUser={currentUser}
          onLogout={onLogout}
        />

        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}

export default MainLayout;
import React from "react";

function Sidebar({
  currentPage,
  allowedPages = [],
  onNavigate,
  currentUser,
  onLogout,
}) {
  const menu = [
    {
      section: "INTELLIGENCE",
      items: [
        ["dashboard", "▦", "Dashboard"],
        ["intake", "＋", "Fraud Intake"],
        ["validation", "✓", "Validation & Risk Scoring"],
        ["assignment", "⇄", "Case Assignment"],
      ],
    },
    {
      section: "CASE MANAGEMENT",
      items: [
        ["investigation", "⌕", "Investigation"],
        ["evidence", "▤", "Evidence Management"],
        ["classification", "◈", "Classification & Decision"],
        ["action", "₮", "Action / Recovery / Sanction"],
        ["closure", "✓", "Case Closure"],
      ],
    },
    {
      section: "MANAGEMENT",
      items: [
        ["reports", "▥", "Reports & Analytics"],
        ["facilities", "⌂", "Facilities & Providers"],
        ["members", "♙", "Members"],
        ["users", "⚙", "Users & Settings"],
      ],
    },
  ];

  // Kama allowedPages ipo vizuri, tumia permissions.
  // Kama haijatumwa bado, menu zote zitaonekana.
  const hasPermissions = Array.isArray(allowedPages) && allowedPages.length > 0;

  return (
    <aside className="sidebar">

      {/* BRAND */}
      <div className="brand">
        <div className="brand-logo">ZHSF</div>

        <div className="brand-text">
          <h2>Fraud Intelligence</h2>
          <span>Case Management</span>
        </div>
      </div>

      {/* MENU */}
      <div className="menu">

        {menu.map((group) => {
          const visibleItems = hasPermissions
            ? group.items.filter(([id]) => allowedPages.includes(id))
            : group.items;

          if (visibleItems.length === 0) {
            return null;
          }

          return (
            <div className="menu-group" key={group.section}>

              <div className="menu-title">
                {group.section}
              </div>

              {visibleItems.map(([id, icon, label]) => (
                <button
                  type="button"
                  key={id}
                  className={`menu-item ${
                    currentPage === id ? "active" : ""
                  }`}
                  onClick={() => onNavigate(id)}
                >
                  <span className="menu-icon">
                    {icon}
                  </span>

                  <span className="menu-label">
                    {label}
                  </span>
                </button>
              ))}

            </div>
          );
        })}

      </div>

      {/* CURRENT USER */}
      <div className="sidebar-user">

        <div className="user-avatar">
          {currentUser?.name
            ? currentUser.name.charAt(0).toUpperCase()
            : "U"}
        </div>

        <div className="user-details">
          <strong>
            {currentUser?.name || "User"}
          </strong>

          <span>
            {currentUser?.role || "Member"}
          </span>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="logout-small"
          title="Logout"
        >
          ↪
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;
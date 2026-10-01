import React from "react";

function Reports() {
  // Case Register data
  const caseRegister = [
    {
      caseId: "FRA-2026-00176",
      memberId: "DEMO-1001",
      facility: "Royal Medical Centre",
      fraudType: "Fraudulent Claim",
      amount: 4500000,
      status: "Confirmed Fraud",
      priority: "High",
    },
    {
      caseId: "FRA-2026-00175",
      memberId: "DEMO-1002",
      facility: "Ijitimai District Hospital",
      fraudType: "Document Fraud",
      amount: 2800000,
      status: "Pending",
      priority: "Medium",
    },
    {
      caseId: "FRA-2026-00174",
      memberId: "DEMO-1003",
      facility: "Vitongoji",
      fraudType: "Identity Fraud",
      amount: 1200000,
      status: "Duplicate",
      priority: "High",
    },
    {
      caseId: "FRA-2026-00173",
      memberId: "DEMO-1004",
      facility: "Micheweni District Hospital",
      fraudType: "Benefit Fraud",
      amount: 850000,
      status: "Pending",
      priority: "Low",
    },
    {
      caseId: "FRA-2026-00172",
      memberId: "DEMO-1005",
      facility: "Chumbuni District Hospital",
      fraudType: "Financial Fraud",
      amount: 6700000,
      status: "Confirmed Fraud",
      priority: "High",
    },
    {
      caseId: "FRA-2026-00171",
      memberId: "DEMO-1006",
      facility: "Lumumba Regional Hospital",
      fraudType: "Fraudulent Claim",
      amount: 1500000,
      status: "Not Fraud",
      priority: "Medium",
    },
  ];

  // Export Case Register as CSV
  const exportCaseRegister = () => {
    const headers = [
      "Case ID",
      "Member ID",
      "Facility",
      "Fraud Type",
      "Amount",
      "Status",
      "Priority",
    ];

    const rows = caseRegister.map((item) => [
      item.caseId,
      item.memberId,
      item.facility,
      item.fraudType,
      item.amount,
      item.status,
      item.priority,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "ZHSF_Case_Register.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="page">

      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h2>Reports & Analytics</h2>
        </div>

        <div className="navbar-user">
          <span>AFU Manager</span>
          <span>|</span>
          <span>ZHSF</span>
          <span>|</span>
          <span className="online-dot"></span>
          <span>Online</span>
        </div>
      </div>

      {/* MAIN REPORT PANEL */}
      <div className="reports-container">

        <div className="report-header">

          <div>
            <h2>Reports & Management Analytics</h2>

            <p>
              Operational dashboard for AFU management and decision support.
            </p>
          </div>

          {/* EXPORT BUTTON */}
          <button
            className="export-button"
            onClick={exportCaseRegister}
          >
            Export Case Register CSV
          </button>

        </div>

        {/* KPI CARDS */}
        <div className="report-kpi-grid">

          <div className="report-kpi-card">
            <span>Fraud among assessed</span>

            <strong>22.7%</strong>

            <small>
              27 confirmed / 119 assessed
            </small>
          </div>

          <div className="report-kpi-card">
            <span>Average complaints/day</span>

            <strong>5.7</strong>

            <small>
              176 over 31 days
            </small>
          </div>

          <div className="report-kpi-card">
            <span>Action recorded</span>

            <strong>89</strong>

            <small>
              50.6% of complaints
            </small>
          </div>

          <div className="report-kpi-card">
            <span>Unclassified</span>

            <strong>57</strong>

            <small>
              32.4% of complaints
            </small>
          </div>

        </div>

        {/* TWO COLUMN SECTION */}
        <div className="reports-two-columns">

          {/* RED FLAGS */}
          <div className="report-panel">

            <h3>Red Flags in Source Register</h3>

            <div className="report-list">

              <div className="report-list-row">
                <span>
                  Card used without member attendance
                </span>

                <span className="report-priority">
                  Priority
                </span>
              </div>

              <div className="report-list-row">
                <span>
                  Service not provided / partial
                </span>

                <span className="report-priority">
                  Priority
                </span>
              </div>

              <div className="report-list-row">
                <span>
                  Billing greater than service
                </span>

                <span className="report-priority">
                  Priority
                </span>
              </div>

              <div className="report-list-row">
                <span>
                  Duplicate / inconsistent billing
                </span>

                <span className="report-priority">
                  Priority
                </span>
              </div>

              <div className="report-list-row">
                <span>
                  Wrong authorization / registration
                </span>

                <span className="report-priority">
                  Priority
                </span>
              </div>

              <div className="report-list-row">
                <span>
                  Delayed / misdirected SMS
                </span>

                <span className="report-monitor">
                  Monitor
                </span>
              </div>

            </div>

          </div>

          {/* AGEING BUCKETS */}
          <div className="report-panel">

            <h3>Recommended Ageing Buckets</h3>

            <div className="ageing-list">

              <div className="ageing-row">
                <span>0–7 days</span>

                <span className="ageing-badge normal">
                  Normal
                </span>
              </div>

              <div className="ageing-row">
                <span>8–30 days</span>

                <span className="ageing-badge monitor">
                  Monitor
                </span>
              </div>

              <div className="ageing-row">
                <span>31–60 days</span>

                <span className="ageing-badge escalate">
                  Escalate
                </span>
              </div>

              <div className="ageing-row">
                <span>&gt;60 days</span>

                <span className="ageing-badge attention">
                  Management attention
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Reports;
import React from "react";

function Dashboard() {
  const trend = [
    2, 4, 5, 3, 6, 5, 4, 7, 3, 6, 4, 8, 5, 6, 25,
    5, 4, 6, 3, 5, 4, 7, 14, 5, 4, 6, 5, 12, 12, 4, 3,
  ];

  const facilities = [
    ["Ijitimai District Hospital", 18],
    ["Royal Medical Centre", 17],
    ["Vitongoji", 7],
    ["Micheweni District Hospital", 7],
    ["Kwa Mtipura Kituo cha Afya", 6],
    ["Chumbuni District Hospital", 6],
    ["Kivunge District Hospital", 5],
    ["Kinyasini", 5],
    ["Lumumba Regional Hospital", 5],
    ["Chuini Dispensary", 5],
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-heading">
        <div>
          <h2>Executive Dashboard</h2>
          <p>
            AFU Manager | ZHSF | <span className="online-text">● Online</span>
          </p>
        </div>
      </div>

      <div className="prototype-notice">
        Prototype data: seeded from the August 2026 Fraud Complaint Register.
        The workflow logic below is demonstrative and can be connected to ZHSF
        HIS/claims, membership, authorization, pharmacy, finance and
        call-centre systems.
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <span>Total complaints</span>
          <strong>176</strong>
          <small>August 2026</small>
        </div>

        <div className="kpi-card">
          <span>Confirmed fraud</span>
          <strong>27</strong>
          <small>15.3% of all complaints</small>
        </div>

        <div className="kpi-card">
          <span>Not fraud</span>
          <strong>77</strong>
          <small>43.8% of all complaints</small>
        </div>

        <div className="kpi-card">
          <span>Pending</span>
          <strong>15</strong>
          <small>8.5% of all complaints</small>
        </div>

        <div className="kpi-card">
          <span>Unclassified</span>
          <strong>57</strong>
          <small>32.4% — priority data gap</small>
        </div>
      </div>

      <section className="dashboard-section">
        <h3>Fraud Case Workflow</h3>

        <div className="workflow">
          {[
            "Multiple Data Sources",
            "Fraud Intake",
            "Validation",
            "Assignment",
            "Investigation",
            "Evidence",
            "Decision",
            "Action / Recovery",
            "Closure",
          ].map((item, index) => (
            <React.Fragment key={item}>
              <div className="workflow-item">
                <span>{index + 1}</span>
                <strong>{item}</strong>
              </div>

              {index < 9 && <div className="workflow-arrow">→</div>}
            </React.Fragment>
          ))}
        </div>
      </section>

      <div className="dashboard-two-columns">
        <section className="panel">
          <div className="panel-header">
            <h3>Case Status</h3>
          </div>

          <div className="status-row">
            <span>Confirmed Fraud</span>
            <strong>27</strong>
            <div className="progress">
              <div style={{ width: "15.3%" }}></div>
            </div>
            <small>15.3%</small>
          </div>

          <div className="status-row">
            <span>Not Fraud</span>
            <strong>77</strong>
            <div className="progress">
              <div style={{ width: "43.8%" }}></div>
            </div>
            <small>43.8%</small>
          </div>

          <div className="status-row">
            <span>Pending</span>
            <strong>15</strong>
            <div className="progress">
              <div style={{ width: "8.5%" }}></div>
            </div>
            <small>8.5%</small>
          </div>

          <div className="status-row">
            <span>Unclassified</span>
            <strong>57</strong>
            <div className="progress">
              <div style={{ width: "32.4%" }}></div>
            </div>
            <small>30.5%</small>
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h3>Top Facilities</h3>
          </div>

          {facilities.map(([name, value]) => (
            <div className="facility-row" key={name}>
              <span>{name}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </section>
      </div>

      <section className="panel trend-panel">
        <div className="panel-header">
          <h3>Complaint Trend — September 2026</h3>
        </div>

        <div className="chart">
          {trend.map((value, index) => (
            <div className="chart-column" key={index}>
              <div
                className="chart-bar"
                style={{ height: `${Math.max(value * 7, 10)}px` }}
                title={`Day ${index + 1}: ${value}`}
              ></div>
              <span>{index + 1}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
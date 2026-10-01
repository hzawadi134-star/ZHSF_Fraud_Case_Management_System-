import React, { useState } from "react";

function Facilities() {
  const [searchFacility, setSearchFacility] = useState("");

  const [facilities] = useState([
    {
      id: "FAC-001",
      name: "Ijitimai District Hospital",
      region: "Zanzibar",
      cases: 18,
      risk: "High",
      status: "Active",
    },
    {
      id: "FAC-002",
      name: "Royal Medical Centre",
      region: "Zanzibar",
      cases: 17,
      risk: "High",
      status: "Active",
    },
    {
      id: "FAC-003",
      name: "Vitongoji",
      region: "Zanzibar",
      cases: 7,
      risk: "Medium",
      status: "Active",
    },
    {
      id: "FAC-004",
      name: "Micheweni District Hospital",
      region: "Zanzibar",
      cases: 7,
      risk: "Medium",
      status: "Active",
    },
    {
      id: "FAC-005",
      name: "Kwa Mtipura Kituo cha Afya",
      region: "Zanzibar",
      cases: 6,
      risk: "Medium",
      status: "Active",
    },
    {
      id: "FAC-006",
      name: "Chumbuni District Hospital",
      region: "Zanzibar",
      cases: 6,
      risk: "Medium",
      status: "Active",
    },
    {
      id: "FAC-007",
      name: "Kivunge District Hospital",
      region: "Zanzibar",
      cases: 5,
      risk: "Low",
      status: "Active",
    },
    {
      id: "FAC-008",
      name: "Kinyasini",
      region: "Zanzibar",
      cases: 5,
      risk: "Low",
      status: "Active",
    },
    {
      id: "FAC-009",
      name: "Lumumba Regional Hospital",
      region: "Zanzibar",
      cases: 5,
      risk: "Low",
      status: "Active",
    },
    {
      id: "FAC-010",
      name: "Chuini Dispensary",
      region: "Zanzibar",
      cases: 5,
      risk: "Low",
      status: "Active",
    },
    {
      id: "FAC-011",
      name: "Abdalla Mzee Regional Hospital",
      region: "Zanzibar",
      cases: 4,
      risk: "Medium",
      status: "Active",
    },
  ]);

  const filteredFacilities = facilities.filter((facility) =>
    `${facility.id} ${facility.name} ${facility.region}`
      .toLowerCase()
      .includes(searchFacility.toLowerCase())
  );

  const handleView = (facility) => {
    alert(
      `Facility: ${facility.name}\nCases: ${facility.cases}\nRisk: ${facility.risk}`
    );
  };

  return (
    <div className="page">

      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h2>Facilities & Provider Intelligence</h2>
          <p>
            Search and review facility fraud intelligence and provider
            activity.
          </p>
        </div>
      </div>

      {/* SEARCH PANEL */}
      <div className="form-panel">

        <h3>Facility Intelligence</h3>

        <div className="form-grid">

          <div className="form-field">
            <label>SEARCH FACILITY</label>

            <input
              type="text"
              placeholder="Enter facility name or ID"
              value={searchFacility}
              onChange={(e) =>
                setSearchFacility(e.target.value)
              }
            />
          </div>

        </div>

      </div>

      {/* FACILITY TABLE */}
      <div className="table-panel">

        <table>

          <thead>
            <tr>
              <th>FACILITY ID</th>
              <th>FACILITY NAME</th>
              <th>REGION</th>
              <th>CASES</th>
              <th>RISK</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>

            {filteredFacilities.length > 0 ? (
              filteredFacilities.map((facility) => (
                <tr key={facility.id}>

                  <td>
                    <strong>{facility.id}</strong>
                  </td>

                  <td>{facility.name}</td>

                  <td>{facility.region}</td>

                  <td>{facility.cases}</td>

                  <td>
                    <span
                      className={`status-badge ${
                        facility.risk === "High"
                          ? "high"
                          : facility.risk === "Medium"
                          ? "medium"
                          : "low"
                      }`}
                    >
                      {facility.risk}
                    </span>
                  </td>

                  <td>
                    <span className="status-badge validated">
                      {facility.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="small-button"
                      onClick={() =>
                        handleView(facility)
                      }
                    >
                      View
                    </button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  style={{
                    textAlign: "center",
                    padding: "30px",
                  }}
                >
                  No facility found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Facilities;
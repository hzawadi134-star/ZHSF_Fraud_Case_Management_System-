import React, { useState } from "react";

function Members() {
  const [searchId, setSearchId] = useState("");

  const [verificationFocus, setVerificationFocus] =
    useState("Attendance");

  const [members] = useState([
    {
      id: "DEMO-1001",
      cases: 1,
      facilities: "Ijitimai District Hospital",
      finding: "Duplicate / inconsistent billing",
    },
    {
      id: "DEMO-1002",
      cases: 1,
      facilities: "Royal Medical Centre",
      finding: "Duplicate / inconsistent billing",
    },
    {
      id: "DEMO-1003",
      cases: 1,
      facilities: "Vitongoji",
      finding: "Service not provided / partial",
    },
    {
      id: "DEMO-1004",
      cases: 1,
      facilities: "Abdalla Mzee Regional Hospital",
      finding: "Duplicate / inconsistent billing",
    },
    {
      id: "DEMO-1005",
      cases: 1,
      facilities: "Lumumba Regional Hospital",
      finding: "Duplicate / inconsistent billing",
    },
  ]);

  const filteredMembers = members.filter((member) =>
    member.id.toLowerCase().includes(searchId.toLowerCase())
  );

  const handleVerify = (member) => {
    alert(
      `Verification started for ${member.id}\nFocus: ${verificationFocus}`
    );
  };

  return (
    <div className="page">

      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h2>Member Intelligence</h2>
          <p>
            Search and verify member information across fraud intelligence
            sources.
          </p>
        </div>
      </div>

      {/* MEMBER INTELLIGENCE SEARCH */}
      <div className="form-panel">

        <h3>Member Intelligence</h3>

        <div className="form-grid">

          {/* SEARCH MEMBER */}
          <div className="form-field">
            <label>SEARCH MEMBER ID</label>

            <input
              type="text"
              placeholder="Enter member ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </div>

          {/* VERIFICATION FOCUS */}
          <div className="form-field">
            <label>VERIFICATION FOCUS</label>

            <select
              value={verificationFocus}
              onChange={(e) =>
                setVerificationFocus(e.target.value)
              }
            >
              <option value="Attendance">
                Attendance
              </option>

              <option value="Service Received">
                Service Received
              </option>

              <option value="SMS / Notification">
                SMS / Notification
              </option>

              <option value="Claim History">
                Claim History
              </option>

              <option value="Duplicate Use">
                Duplicate Use
              </option>
            </select>
          </div>

        </div>
      </div>

      {/* MEMBERS TABLE */}
      <div className="table-panel">

        <table>

          <thead>
            <tr>
              <th>MEMBER ID</th>
              <th>CASES</th>
              <th>FACILITIES</th>
              <th>VERIFICATION FINDING</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>

            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <tr key={member.id}>

                  <td>
                    <strong>{member.id}</strong>
                  </td>

                  <td>
                    {member.cases}
                  </td>

                  <td>
                    {member.facilities}
                  </td>

                  <td>
                    {member.finding}
                  </td>

                  <td>
                    <button
                      className="small-button"
                      onClick={() =>
                        handleVerify(member)
                      }
                    >
                      Verify
                    </button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    textAlign: "center",
                    padding: "30px",
                  }}
                >
                  No member found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Members;
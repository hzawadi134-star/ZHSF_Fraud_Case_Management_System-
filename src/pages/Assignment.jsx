import React, { useState } from "react";

function Assignment() {
  const [selectedCase, setSelectedCase] = useState(
    "ZHSF-FRD-2026-08-000161 — Ijitimai District"
  );

  const [responsibleOfficer, setResponsibleOfficer] =
    useState("F N MUSTAFA");

  const [targetDate, setTargetDate] = useState("2026-09-24");

  const [instruction, setInstruction] = useState(
    "Verify claim, member attendance/service delivery and supporting records."
  );

  const [assignedCases, setAssignedCases] = useState([
    {
      id: "ZHSF-FRD-2026-08-000161",
      officer: "F N MUSTAFA",
      status: "Under Review",
      risk: 58,
    },
    {
      id: "ZHSF-FRD-2026-08-000162",
      officer: "A H ALI",
      status: "Investigation",
      risk: 72,
    },
    {
      id: "ZHSF-FRD-2026-08-000163",
      officer: "K M ALI",
      status: "Assigned",
      risk: 41,
    },
  ]);

  const officers = [
    "F N MUSTAFA",
    "K M ALI",
    "F S HAMDU",
    "A H ALI",
    "A A IBRAHIM",
    "O K MOHO",
    "AFU Manager",
    "ICT Verification",
    "MQA Review",
    "Legal Unit",
  ];

  const cases = [
    "ZHSF-FRD-2026-08-000161 — Ijitimai District",
    "ZHSF-FRD-2026-08-000162 — Urban District",
    "ZHSF-FRD-2026-08-000163 — Micheweni District",
    "ZHSF-FRD-2026-08-000164 — North District",
  ];

  const handleAssign = (e) => {
    e.preventDefault();

    if (!selectedCase || !responsibleOfficer || !targetDate) {
      alert("Please complete all required fields.");
      return;
    }

    const caseId = selectedCase.split(" — ")[0];

    const newAssignment = {
      id: caseId,
      officer: responsibleOfficer,
      status: "Under Review",
      risk: 50,
    };

    setAssignedCases((prev) => {
      const existingCase = prev.find((item) => item.id === caseId);

      if (existingCase) {
        return prev.map((item) =>
          item.id === caseId
            ? newAssignment
            : item
        );
      }

      return [newAssignment, ...prev];
    });

    alert("Case assigned successfully.");
  };

  return (
    <div className="page">

      {/* PAGE HEADER */}
      <div className="page-header">
        <h2>Case Assignment</h2>
      </div>

      {/* ASSIGNMENT FORM */}
      <div className="form-panel assignment-panel">

        <h3>Case Assignment</h3>

        <form onSubmit={handleAssign}>

          {/* TOP ROW */}
          <div className="assignment-grid">

            {/* CASE */}
            <div className="form-field">
              <label>CASE</label>

              <select
                value={selectedCase}
                onChange={(e) => setSelectedCase(e.target.value)}
              >
                {cases.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* RESPONSIBLE OFFICER */}
            <div className="form-field">
              <label>RESPONSIBLE OFFICER</label>

              <select
                value={responsibleOfficer}
                onChange={(e) =>
                  setResponsibleOfficer(e.target.value)
                }
              >
                {officers.map((officer) => (
                  <option key={officer} value={officer}>
                    {officer}
                  </option>
                ))}
              </select>
            </div>

            {/* TARGET DATE */}
            <div className="form-field">
              <label>TARGET DATE</label>

              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
              />
            </div>

          </div>

          {/* ASSIGNMENT INSTRUCTION */}
          <div className="form-field assignment-instruction">
            <label>ASSIGNMENT INSTRUCTION</label>

            <textarea
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Enter assignment instructions..."
              rows="5"
            />
          </div>

          {/* BUTTON */}
          <div className="assignment-actions">
            <button
              type="submit"
              className="primary-button"
            >
              Assign Case
            </button>
          </div>

        </form>
      </div>

      {/* ASSIGNED CASES */}
      <div className="table-panel assignment-table-panel">

        <h3>Case</h3>

        <table>
          <thead>
            <tr>
              <th>CASE</th>
              <th>RESPONSIBLE OFFICER</th>
              <th>STATUS</th>
              <th>RISK</th>
            </tr>
          </thead>

          <tbody>
            {assignedCases.map((item) => (
              <tr key={item.id}>

                <td>{item.id}</td>

                <td>{item.officer}</td>

                <td>
                  <span className="assignment-status">
                    {item.status}
                  </span>
                </td>

                <td>{item.risk}</td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}

export default Assignment;
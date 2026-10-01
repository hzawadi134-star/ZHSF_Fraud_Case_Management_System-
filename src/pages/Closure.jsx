import React, { useState } from "react";

function Closure() {
  const [selectedCase, setSelectedCase] = useState(
    "ZHSF-FRD-2026-08-000161"
  );

  const [closureDate, setClosureDate] = useState("2026-09-17");

  const [finalAction, setFinalAction] = useState("");

  const [closureSummary, setClosureSummary] = useState("");

  const [message, setMessage] = useState("");

  const [cases, setCases] = useState([
    {
      id: "ZHSF-FRD-2026-08-000161",
      facility: "Ijitimai District Hospital",
      officer: "F N MUSTAFA",
      status: "Closed",
      action: "No further action",
    },
    {
      id: "ZHSF-FRD-2026-08-000162",
      facility: "Royal Medical Centre",
      officer: "A H ALI",
      status: "Investigation",
      action: "—",
    },
    {
      id: "ZHSF-FRD-2026-08-000163",
      facility: "Vitongoji",
      officer: "F S HAMDU",
      status: "Pending",
      action: "—",
    },
    {
      id: "ZHSF-FRD-2026-08-000164",
      facility: "Micheweni District Hospital",
      officer: "K M ALI",
      status: "Under Review",
      action: "—",
    },
  ]);

  const handleCloseCase = (e) => {
    e.preventDefault();

    if (!finalAction || !closureSummary) {
      setMessage(
        "Please provide the final action and closure summary."
      );
      return;
    }

    setCases(
      cases.map((item) =>
        item.id === selectedCase
          ? {
              ...item,
              status: "Closed",
              action: finalAction,
            }
          : item
      )
    );

    setMessage(
      `Case ${selectedCase} has been validated and closed successfully.`
    );

    setFinalAction("");
    setClosureSummary("");
  };

  return (
    <div className="page">

      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h2>Case Closure</h2>
          <p>
            Review, validate and close completed fraud cases.
          </p>
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

      {/* CLOSURE CONTROL */}
      <div className="closure-panel">

        <h2>Case Closure Control</h2>

        <div className="closure-notice">
          Closure should require evidence reference, final finding,
          action/decision, responsible officer and closure date.
        </div>

        <form onSubmit={handleCloseCase}>

          <div className="closure-form-grid">

            {/* CASE */}
            <div className="form-field">
              <label>CASE</label>

              <select
                value={selectedCase}
                onChange={(e) =>
                  setSelectedCase(e.target.value)
                }
              >
                {cases.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.id} — {item.facility}
                  </option>
                ))}
              </select>
            </div>

            {/* CLOSURE DATE */}
            <div className="form-field">
              <label>CLOSURE DATE</label>

              <input
                type="date"
                value={closureDate}
                onChange={(e) =>
                  setClosureDate(e.target.value)
                }
              />
            </div>

            {/* FINAL ACTION */}
            <div className="form-field">
              <label>FINAL ACTION</label>

              <input
                type="text"
                placeholder="e.g. Recovery initiated / no action"
                value={finalAction}
                onChange={(e) =>
                  setFinalAction(e.target.value)
                }
              />
            </div>

          </div>

          {/* CLOSURE SUMMARY */}
          <div className="form-field closure-summary-field">

            <label>CLOSURE SUMMARY</label>

            <textarea
              rows="5"
              value={closureSummary}
              onChange={(e) =>
                setClosureSummary(e.target.value)
              }
              placeholder="Enter final finding, evidence reference, decision and closure summary..."
            />

          </div>

          {/* MESSAGE */}
          {message && (
            <div className="success-message">
              {message}
            </div>
          )}

          {/* CLOSE BUTTON */}
          <button
            type="submit"
            className="close-case-button"
          >
            ✓ Validate & Close Case
          </button>

        </form>
      </div>

      {/* CASE LIST */}
      <div className="closure-table-panel">

        <table>

          <thead>
            <tr>
              <th>CASE</th>
              <th>OFFICER</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>

            {cases.map((item) => (
              <tr key={item.id}>

                <td>
                  {item.id}
                </td>

                <td>
                  {item.officer}
                </td>

                <td>
                  <span
                    className={`closure-status ${
                      item.status
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td>
                  {item.action}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Closure;
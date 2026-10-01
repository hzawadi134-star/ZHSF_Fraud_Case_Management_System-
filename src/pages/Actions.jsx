import React, { useState } from "react";

function Actions() {
  const [selectedCase, setSelectedCase] = useState(
    "ZHSF-FRD-2026-08-000163"
  );

  const [actionType, setActionType] = useState(
    "Recovery Request"
  );

  const [amount, setAmount] = useState("0");

  const [actionStatus, setActionStatus] = useState(
    "Pending"
  );

  const [actionDetails, setActionDetails] = useState("");

  const [message, setMessage] = useState("");

  const [actions, setActions] = useState([]);

  const cases = [
    {
      id: "ZHSF-FRD-2026-08-000163",
      facility: "Vitongoji",
    },
    {
      id: "ZHSF-FRD-2026-08-000162",
      facility: "Royal Medical Centre",
    },
    {
      id: "ZHSF-FRD-2026-08-000164",
      facility: "Micheweni District Hospital",
    },
    {
      id: "ZHSF-FRD-2026-08-000165",
      facility: "Chumbuni District Hospital",
    },
  ];

  const actionTypes = [
    "Provider Notice",
    "Recovery Request",
    "Claim Adjustment",
    "Fine / Penalty",
    "Service Suspension Recommendation",
    "Contractual Action",
    "Referral to Legal",
    "Referral to Authority",
    "Staff Disciplinary Action",
    "Monitoring",
  ];

  const statusOptions = [
    "Pending",
    "In Progress",
    "Completed",
    "Cancelled",
  ];

  const handleSaveAction = (e) => {
    e.preventDefault();

    if (!actionDetails.trim()) {
      setMessage("Please enter action details.");
      return;
    }

    const selectedCaseData = cases.find(
      (item) => item.id === selectedCase
    );

    const newAction = {
      caseId: selectedCase,
      facility: selectedCaseData?.facility || "",
      actionType,
      amount: amount || "0",
      status: actionStatus,
      details: actionDetails,
    };

    setActions([...actions, newAction]);

    setMessage(
      `Action saved successfully for ${selectedCase}.`
    );

    setActionDetails("");
    setAmount("0");
  };

  return (
    <div className="page">

      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h2>Action / Recovery / Sanction</h2>
          <p>
            Record recovery, sanctions and other actions taken on
            fraud cases.
          </p>
        </div>
      </div>

      {/* ACTION PANEL */}
      <div className="action-panel">

        <h2>Action, Recovery & Sanction</h2>

        <form onSubmit={handleSaveAction}>

          <div className="action-form-grid">

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

            {/* ACTION TYPE */}
            <div className="form-field">
              <label>ACTION TYPE</label>

              <select
                value={actionType}
                onChange={(e) =>
                  setActionType(e.target.value)
                }
              >
                {actionTypes.map((type) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* AMOUNT */}
            <div className="form-field">
              <label>AMOUNT FOR RECOVERY (TZS)</label>

              <input
                type="number"
                min="0"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
              />
            </div>

            {/* ACTION STATUS */}
            <div className="form-field">
              <label>ACTION STATUS</label>

              <select
                value={actionStatus}
                onChange={(e) =>
                  setActionStatus(e.target.value)
                }
              >
                {statusOptions.map((status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* ACTION DETAILS */}
          <div className="form-field action-details">

            <label>ACTION DETAILS</label>

            <textarea
              rows="5"
              value={actionDetails}
              onChange={(e) =>
                setActionDetails(e.target.value)
              }
              placeholder="Enter action details..."
            />

          </div>

          {/* MESSAGE */}
          {message && (
            <div className="success-message">
              {message}
            </div>
          )}

          {/* SAVE */}
          <button
            type="submit"
            className="save-action-button"
          >
            Save Action
          </button>

        </form>
      </div>

      {/* SAVED ACTIONS */}
      {actions.length > 0 && (
        <div className="table-panel">

          <h3>Recorded Actions</h3>

          <table>

            <thead>
              <tr>
                <th>CASE</th>
                <th>ACTION TYPE</th>
                <th>RECOVERY (TZS)</th>
                <th>STATUS</th>
                <th>DETAILS</th>
              </tr>
            </thead>

            <tbody>
              {actions.map((action, index) => (
                <tr key={index}>

                  <td>{action.caseId}</td>

                  <td>{action.actionType}</td>

                  <td>
                    {Number(action.amount).toLocaleString()}
                  </td>

                  <td>
                    <span className="status-badge validated">
                      {action.status}
                    </span>
                  </td>

                  <td>{action.details}</td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default Actions;
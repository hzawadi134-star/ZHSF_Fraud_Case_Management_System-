import React, { useState } from "react";

function Investigation() {
  const [selectedCase, setSelectedCase] = useState(
    "ZHSF-FRD-2026-08-000164"
  );

  const [investigationStatus, setInvestigationStatus] = useState(
    "Provider Response"
  );

  const [findingType, setFindingType] = useState(
    "Service verification"
  );

  const [findings, setFindings] = useState("");

  const [nextAction, setNextAction] = useState("");

  const [message, setMessage] = useState("");

  const cases = [
    {
      id: "ZHSF-FRD-2026-08-000164",
      facility: "Abdalla Mzee Regional Hospital",
    },
    {
      id: "ZHSF-FRD-2026-08-000163",
      facility: "Vitongoji",
    },
    {
      id: "ZHSF-FRD-2026-08-000162",
      facility: "Royal Medical Centre",
    },
    {
      id: "ZHSF-FRD-2026-08-000161",
      facility: "Ijitimai District Hospital",
    },
  ];

  const investigationStatuses = [
    "Provider Response",
    "Initial Review",
    "Evidence Review",
    "Member Interview",
    "Facility Verification",
    "Claim Reconciliation",
    "Under Investigation",
    "Investigation Complete",
  ];

  const findingTypes = [
    "Service verification",
    "Document verification",
    "Claim verification",
    "Member verification",
    "Provider verification",
    "Financial verification",
    "Authorization verification",
    "Fraud confirmed",
    "No fraud identified",
    "Insufficient evidence",
    "Other finding",
  ];

  const handleSaveInvestigation = (e) => {
    e.preventDefault();

    if (!findings.trim()) {
      setMessage("Please enter investigation findings.");
      return;
    }

    setMessage(
      `Investigation update saved successfully for ${selectedCase}.`
    );
  };

  return (
    <div className="page">

      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h2>Investigation Management</h2>
          <p>
            Record investigation findings, references and required
            follow-up actions.
          </p>
        </div>
      </div>

      {/* INVESTIGATION PANEL */}
      <div className="investigation-panel">

        <h2>Investigation Module</h2>

        <form onSubmit={handleSaveInvestigation}>

          {/* TOP FIELDS */}
          <div className="investigation-form-grid">

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

            {/* INVESTIGATION STATUS */}
            <div className="form-field">
              <label>INVESTIGATION STATUS</label>

              <select
                value={investigationStatus}
                onChange={(e) =>
                  setInvestigationStatus(e.target.value)
                }
              >
                {investigationStatuses.map((status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* FINDING TYPE */}
            <div className="form-field">
              <label>FINDING TYPE</label>

              <select
                value={findingType}
                onChange={(e) =>
                  setFindingType(e.target.value)
                }
              >
                {findingTypes.map((type) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* INVESTIGATION FINDINGS */}
          <div className="form-field investigation-section">

            <label>INVESTIGATION FINDINGS</label>

            <textarea
              rows="5"
              placeholder="Record objective findings and references..."
              value={findings}
              onChange={(e) =>
                setFindings(e.target.value)
              }
            />

          </div>

          {/* NEXT REQUIRED ACTION */}
          <div className="form-field investigation-section">

            <label>NEXT REQUIRED ACTION</label>

            <textarea
              rows="4"
              placeholder="Evidence required, interview, claim reconciliation, ICT check, MOA review..."
              value={nextAction}
              onChange={(e) =>
                setNextAction(e.target.value)
              }
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
            className="save-investigation-button"
          >
            Save Investigation Update
          </button>

        </form>

      </div>

    </div>
  );
}

export default Investigation;
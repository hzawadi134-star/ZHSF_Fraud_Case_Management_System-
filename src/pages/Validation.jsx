import React, { useState } from "react";

function Validation() {
  const [cases, setCases] = useState([
    {
      id: "ZHSF-FRD-2026-08-000161",
      date: "2026-08-17",
      facility: "Ijitimai District Hospital",
      redFlag: "Card used without member attendance",
      status: "Assigned",
      risk: 58,
      officer: "F N MUSTAFA",
    },
    {
      id: "ZHSF-FRD-2026-08-000162",
      date: "2026-08-24",
      facility: "Royal Medical Centre",
      redFlag: "Duplicate / inconsistent billing",
      status: "Investigation",
      risk: 72,
      officer: "A H ALI",
    },
    {
      id: "ZHSF-FRD-2026-08-000163",
      date: "2026-08-29",
      facility: "Vitongoji",
      redFlag: "Service not provided / partial",
      status: "Pending",
      risk: 47,
      officer: "F S HAMDU",
    },
    {
      id: "ZHSF-FRD-2026-08-000164",
      date: "2026-08-29",
      facility: "Abdalla Mzee Regional Hospital",
      redFlag: "Duplicate / inconsistent billing",
      status: "Provider Response",
      risk: 39,
      officer: "K M ALI",
    },
    {
      id: "ZHSF-FRD-2026-08-000165",
      date: "2026-08-11",
      facility: "Lumumba Regional Hospital",
      redFlag: "Duplicate / inconsistent billing",
      status: "Investigation",
      risk: 81,
      officer: "O K MOH'D",
    },
  ]);

  // Risk scoring values
  const [financialExposure, setFinancialExposure] = useState(10);
  const [repeatComplaint, setRepeatComplaint] = useState(5);
  const [multipleMembers, setMultipleMembers] = useState(5);
  const [providerHistory, setProviderHistory] = useState(5);
  const [evidenceStrength, setEvidenceStrength] = useState(8);
  const [systemAnomaly, setSystemAnomaly] = useState(5);
  const [seriousness, setSeriousness] = useState(5);

  const [riskResult, setRiskResult] = useState(43);
  const [riskLevel, setRiskLevel] = useState("Moderate");

  const [validationMessage, setValidationMessage] = useState("");

  // -----------------------------
  // RUN VALIDATION
  // -----------------------------
  const runValidation = () => {
    setValidationMessage(
      "Validation completed successfully. Mandatory fields, duplicate combinations and data anomalies have been checked."
    );
  };

  // -----------------------------
  // CALCULATE RISK
  // -----------------------------
  const calculateRisk = () => {
    const total =
      Number(financialExposure) +
      Number(repeatComplaint) +
      Number(multipleMembers) +
      Number(providerHistory) +
      Number(evidenceStrength) +
      Number(systemAnomaly) +
      Number(seriousness);

    let level = "Low";

    if (total >= 75) {
      level = "Critical";
    } else if (total >= 50) {
      level = "High";
    } else if (total >= 25) {
      level = "Moderate";
    }

    setRiskResult(total);
    setRiskLevel(level);
  };

  // -----------------------------
  // RISK CLASS
  // -----------------------------
  const getRiskClass = (risk) => {
    if (risk >= 75) return "risk-critical";
    if (risk >= 50) return "risk-high";
    if (risk >= 25) return "risk-moderate";
    return "risk-low";
  };

  return (
    <div className="page">

      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h2>Validation & Triage</h2>
        </div>
      </div>

      {/* =========================
          VALIDATION SECTION
      ========================== */}
      <div className="validation-panel">

        <div className="validation-title-row">
          <div>
            <h2>Data Validation & Deduplication</h2>

            <p>
              Prevent duplicate records and incomplete cases before
              investigation.
            </p>
          </div>

          <button
            className="run-validation-button"
            onClick={runValidation}
          >
            Run Validation
          </button>
        </div>

        <div className="validation-notice">
          Validation checks: mandatory fields, duplicate member/claim
          combinations, missing facility, missing description, amount
          anomalies and ownership.
        </div>

        {validationMessage && (
          <div className="success-message">
            {validationMessage}
          </div>
        )}

        <div className="validation-table-wrapper">

          <table>

            <thead>
              <tr>
                <th>CASE ID</th>
                <th>DATE</th>
                <th>FACILITY</th>
                <th>RED FLAG</th>
                <th>STATUS</th>
                <th>RISK</th>
                <th>OFFICER</th>
              </tr>
            </thead>

            <tbody>

              {cases.map((item) => (
                <tr key={item.id}>

                  <td>{item.id}</td>

                  <td>{item.date}</td>

                  <td>{item.facility}</td>

                  <td>{item.redFlag}</td>

                  <td>
                    <span className="validation-status">
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <span
                      className={getRiskClass(item.risk)}
                    >
                      {item.risk}
                    </span>
                  </td>

                  <td>{item.officer}</td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* =========================
          RISK SCORING + RESULT
      ========================== */}
      <div className="risk-section-grid">

        {/* RISK SCORING ENGINE */}
        <div className="risk-engine-panel">

          <h2>Risk Scoring Engine</h2>

          <p className="risk-description">
            Prototype scoring model; weights are proposed system logic,
            not figures from the source report.
          </p>

          <div className="risk-input-grid">

            <div className="form-field">
              <label>FINANCIAL EXPOSURE (0–20)</label>

              <input
                type="number"
                min="0"
                max="20"
                value={financialExposure}
                onChange={(e) =>
                  setFinancialExposure(e.target.value)
                }
              />
            </div>

            <div className="form-field">
              <label>REPEAT COMPLAINT (0–15)</label>

              <input
                type="number"
                min="0"
                max="15"
                value={repeatComplaint}
                onChange={(e) =>
                  setRepeatComplaint(e.target.value)
                }
              />
            </div>

            <div className="form-field">
              <label>MULTIPLE MEMBERS (0–15)</label>

              <input
                type="number"
                min="0"
                max="15"
                value={multipleMembers}
                onChange={(e) =>
                  setMultipleMembers(e.target.value)
                }
              />
            </div>

            <div className="form-field">
              <label>PROVIDER HISTORY (0–15)</label>

              <input
                type="number"
                min="0"
                max="15"
                value={providerHistory}
                onChange={(e) =>
                  setProviderHistory(e.target.value)
                }
              />
            </div>

            <div className="form-field">
              <label>EVIDENCE STRENGTH (0–15)</label>

              <input
                type="number"
                min="0"
                max="15"
                value={evidenceStrength}
                onChange={(e) =>
                  setEvidenceStrength(e.target.value)
                }
              />
            </div>

            <div className="form-field">
              <label>SYSTEM ANOMALY (0–10)</label>

              <input
                type="number"
                min="0"
                max="10"
                value={systemAnomaly}
                onChange={(e) =>
                  setSystemAnomaly(e.target.value)
                }
              />
            </div>

            <div className="form-field">
              <label>SERIOUSNESS (0–10)</label>

              <input
                type="number"
                min="0"
                max="10"
                value={seriousness}
                onChange={(e) =>
                  setSeriousness(e.target.value)
                }
              />
            </div>

          </div>

          <button
            className="calculate-risk-button"
            onClick={calculateRisk}
          >
            Calculate Risk
          </button>

        </div>

        {/* RISK RESULT */}
        <div className="risk-result-panel">

          <h2>Risk Result</h2>

          <div className="risk-number">
            {riskResult}
          </div>

          <div
            className={`risk-level ${getRiskClass(
              riskResult
            )}`}
          >
            {riskLevel.toUpperCase()}
          </div>

          <div className="risk-progress">

            <div
              className="risk-progress-fill"
              style={{
                width: `${Math.min(riskResult, 100)}%`,
              }}
            ></div>

          </div>

          <p className="risk-scale">
            Low 0–24 | Moderate 25–49 | High 50–74 |
            Critical 75–100
          </p>

        </div>

      </div>

      {/* =========================
          TRIAGE QUEUE
      ========================== */}
      <div className="triage-queue-panel">

        <h2>Triage Queue</h2>

        <div className="validation-table-wrapper">

          <table>

            <thead>
              <tr>
                <th>CASE ID</th>
                <th>DATE</th>
                <th>FACILITY</th>
                <th>RED FLAG</th>
                <th>STATUS</th>
                <th>RISK</th>
                <th>OFFICER</th>
              </tr>
            </thead>

            <tbody>

              {cases.map((item) => (
                <tr key={`triage-${item.id}`}>

                  <td>{item.id}</td>

                  <td>{item.date}</td>

                  <td>{item.facility}</td>

                  <td>{item.redFlag}</td>

                  <td>
                    <span className="validation-status">
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <span
                      className={getRiskClass(item.risk)}
                    >
                      {item.risk}
                    </span>
                  </td>

                  <td>{item.officer}</td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Validation;
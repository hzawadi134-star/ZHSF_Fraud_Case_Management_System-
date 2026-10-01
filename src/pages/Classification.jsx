import React, { useState } from "react";

function Classification() {
  const [caseId, setCaseId] = useState("ZHSF-FRD-2026-08-00161 — Jitima District");
  const [classification, setClassification] = useState("Confirmed Fraud");
  const [authority, setAuthority] = useState("AFU Manager");
  const [rationale, setRationale] = useState("");

  const handleSave = (e) => {
    e.preventDefault();

    console.log({
      caseId,
      classification,
      authority,
      rationale,
    });

    alert("Classification saved successfully!");
  };

  return (
    <div className="classification-page">
      <div className="classification-header">
        <h1>Classification & Decision</h1>
      </div>

      <div className="classification-card">
        <h2>Classification & Decision</h2>

        <form onSubmit={handleSave}>
          <div className="classification-row">

            {/* CASE */}
            <div className="classification-field">
              <label>CASE</label>

              <select
                value={caseId}
                onChange={(e) => setCaseId(e.target.value)}
              >
                <option>
                  ZHSF-FRD-2026-08-00161 — Jitima District
                </option>
                <option>
                  ZHSF-FRD-2026-08-00162 — Urban District
                </option>
                <option>
                  ZHSF-FRD-2026-08-00163 — West District
                </option>
              </select>
            </div>

            {/* FINAL CLASSIFICATION */}
            <div className="classification-field">
              <label>FINAL CLASSIFICATION</label>

              <select
                value={classification}
                onChange={(e) => setClassification(e.target.value)}
              >
                <option>Confirmed Fraud</option>
                <option>Suspected Fraud</option>
                <option>Not Fraud</option>
                <option>Inconclusive</option>
                <option>Unclassified</option>
              </select>
            </div>

            {/* DECISION AUTHORITY */}
            <div className="classification-field">
              <label>DECISION AUTHORITY</label>

              <input
                type="text"
                value={authority}
                onChange={(e) => setAuthority(e.target.value)}
                placeholder="Enter decision authority"
              />
            </div>

          </div>

          {/* DECISION RATIONALE */}
          <div className="rationale-field">
            <label>DECISION RATIONALE</label>

            <textarea
              value={rationale}
              onChange={(e) => setRationale(e.target.value)}
              placeholder="Link the conclusion to verified evidence and findings."
              rows="6"
            />
          </div>

          <button type="submit" className="save-classification-btn">
            Save Classification
          </button>
        </form>
      </div>
    </div>
  );
}

export default Classification;
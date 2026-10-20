import React, { useState } from "react";

function FraudIntake() {
  const [formData, setFormData] = useState({
    sourceChannel: "Call Center",
    incidentEventCategory: "Fraud / Suspected Fraud",
    incidentEventCategoryOther: "",
    suspectedFraudCategory: "Membership fraud",
    incidentDate: "",
    memberId: "",
    facilityProvider: "",
    claimAuthorization: "",
    serviceType: "Pharmacy",
    suspectedAmount: "0",
    redFlag: "Card used without member attendance",
    description: "",

    evidenceType: "SMS",
    evidenceDetails: "",
    evidenceFile: null,
  });

  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [message, setMessage] = useState("");

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // HANDLE EVIDENCE FILE
  // =========================

  const handleEvidenceFile = (e) => {
    const file = e.target.files[0] || null;

    setFormData((prev) => ({
      ...prev,
      evidenceFile: file,
    }));
  };

  // =========================
  // REMOVE SELECTED EVIDENCE
  // =========================

  const removeEvidence = () => {
    setFormData((prev) => ({
      ...prev,
      evidenceFile: null,
      evidenceDetails: "",
    }));

    // Reset file input
    const fileInput = document.getElementById("evidenceFileInput");

    if (fileInput) {
      fileInput.value = "";
    }
  };

  // =========================
  // GENERATE CASE ID
  // =========================

  const generateCaseId = () => {
    const date = new Date();

    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const randomNumber = Math.floor(
      100000 + Math.random() * 900000
    );

    return `ZHSF-FRD-${year}-${month}-${randomNumber}`;
  };

  // =========================
  // CREATE CASE
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    const caseId = generateCaseId();

    const newCase = {
      id: caseId,

      status: "New",

      createdDate: new Date().toLocaleString(),

      sourceChannel: formData.sourceChannel,
      incidentEventCategory: formData.incidentEventCategory,
      incidentEventCategoryOther: formData.incidentEventCategory === "Other" ? formData.incidentEventCategoryOther : "",
      suspectedFraudCategory: formData.suspectedFraudCategory,
      incidentDate: formData.incidentDate,
      memberId: formData.memberId,
      facilityProvider: formData.facilityProvider,
      claimAuthorization: formData.claimAuthorization,
      serviceType: formData.serviceType,
      suspectedAmount: formData.suspectedAmount,
      redFlag: formData.redFlag,
      description: formData.description,

      evidence: {
        type: formData.evidenceType,
        details: formData.evidenceDetails,

        file: formData.evidenceFile
          ? {
              name: formData.evidenceFile.name,
              type: formData.evidenceFile.type,
              size: formData.evidenceFile.size,
              url: URL.createObjectURL(
                formData.evidenceFile
              ),
            }
          : null,
      },

      riskScore: 0,
      riskLevel: "Low",
    };

    setCases((prev) => [newCase, ...prev]);

    setSelectedCase(newCase);

    setMessage(
      "Case created successfully. Case ID generated."
    );
  };

  // =========================
  // CLEAR FORM
  // =========================

  const handleClear = () => {
    setFormData({
      sourceChannel: "Call Center",
      incidentEventCategory: "Fraud / Suspected Fraud",
      incidentEventCategoryOther: "",
      suspectedFraudCategory: "Membership fraud",
      incidentDate: "",
      memberId: "",
      facilityProvider: "",
      claimAuthorization: "",
      serviceType: "Pharmacy",
      suspectedAmount: "0",
      redFlag: "Card used without member attendance",
      description: "",

      evidenceType: "SMS",
      evidenceDetails: "",
      evidenceFile: null,
    });

    const fileInput = document.getElementById(
      "evidenceFileInput"
    );

    if (fileInput) {
      fileInput.value = "";
    }

    setMessage("");
  };

  // =========================
  // REMOVE EVIDENCE FROM
  // CREATED CASE
  // =========================

  const removeCaseEvidence = () => {
    if (!selectedCase) return;

    const updatedCase = {
      ...selectedCase,
      evidence: {
        ...selectedCase.evidence,
        file: null,
        details: "",
      },
    };

    setSelectedCase(updatedCase);

    setCases((prev) =>
      prev.map((item) =>
        item.id === updatedCase.id
          ? updatedCase
          : item
      )
    );

    setMessage(
      "Evidence removed. You can now add the correct evidence."
    );
  };

  // =========================
  // ADD NEW EVIDENCE TO CASE
  // =========================

  const replaceCaseEvidence = (e) => {
    const file = e.target.files[0] || null;

    if (!file || !selectedCase) {
      return;
    }

    const updatedCase = {
      ...selectedCase,

      evidence: {
        ...selectedCase.evidence,

        file: {
          name: file.name,
          type: file.type,
          size: file.size,
          url: URL.createObjectURL(file),
        },
      },
    };

    setSelectedCase(updatedCase);

    setCases((prev) =>
      prev.map((item) =>
        item.id === updatedCase.id
          ? updatedCase
          : item
      )
    );

    setMessage(
      "New evidence attached successfully."
    );
  };

  // =========================
  // VIEW CASE
  // =========================

  if (selectedCase) {
    return (
      <div className="page">

        {/* BACK */}
        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <button
            className="clear-button"
            onClick={() => {
              setSelectedCase(null);
              setMessage("");
            }}
          >
            ← Back to Fraud Intake
          </button>
        </div>

        {/* HEADER */}
        <div className="page-header">
          <div>
            <h2>Case Details</h2>

            <p>
              View complete information, evidence and
              status for this fraud case.
            </p>
          </div>
        </div>

        {/* CASE HEADER */}
        <div className="case-details-header">

          <div>
            <h2>
              🛡️ {selectedCase.id}
            </h2>

            <p>
              Created on {selectedCase.createdDate}
            </p>
          </div>

          <div className="case-header-risk">
            <span>Risk Score</span>

            <strong>
              {selectedCase.riskScore}
            </strong>

            <small>
              {selectedCase.riskLevel}
            </small>
          </div>

        </div>

        {/* MESSAGE */}
        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        {/* MAIN GRID */}
        <div className="case-details-grid">

          {/* LEFT SIDE */}
          <div>

            {/* CASE INFORMATION */}
            <div className="case-card">

              <div className="case-card-title">
                <h3>
                  📋 1. Case Information
                </h3>
              </div>

              <div className="case-info-grid">

                <div>
                  <label>Source of Information / Channel</label>

                  <strong>
                    {selectedCase.sourceChannel}
                  </strong>
                </div>

                <div>
                  <label>
                    Claim / Authorization No.
                  </label>

                  <strong>
                    {selectedCase.claimAuthorization ||
                      "Not provided"}
                  </strong>
                </div>

                <div>
                  <label>
                    Incident / Event Category
                  </label>

                  <strong>
                    {selectedCase.incidentEventCategory}
                  </strong>
                </div>

                <div>
                  <label>Service Type</label>

                  <strong>
                    {selectedCase.serviceType}
                  </strong>
                </div>

                <div>
                  <label>Incident Date</label>

                  <strong>
                    {selectedCase.incidentDate ||
                      "Not provided"}
                  </strong>
                </div>

                <div>
                  <label>
                    Suspected Fraud Category
                  </label>

                  <strong>
                    {selectedCase.suspectedFraudCategory ||
                      "Not provided"}
                  </strong>
                </div>

                <div>
                  <label>
                    Suspected Amount (TZS)
                  </label>

                  <strong>
                    {Number(
                      selectedCase.suspectedAmount
                    ).toLocaleString()}
                  </strong>
                </div>

                <div>
                  <label>Member ID</label>

                  <strong>
                    {selectedCase.memberId ||
                      "Not provided"}
                  </strong>
                </div>

                <div>
                  <label>Red Flag</label>

                  <strong>
                    {selectedCase.redFlag}
                  </strong>
                </div>

                <div>
                  <label>
                    Facility / Provider
                  </label>

                  <strong>
                    {selectedCase.facilityProvider ||
                      "Not provided"}
                  </strong>
                </div>

                <div>
                  <label>Status</label>

                  <span className="case-status-badge">
                    {selectedCase.status}
                  </span>
                </div>

              </div>

            </div>

            {/* DESCRIPTION */}
            <div className="case-card">

              <div className="case-card-title">
                <h3>
                  📝 2. Complaint / Intelligence
                  Description
                </h3>
              </div>

              <div className="case-description">

                {selectedCase.description ||
                  "No complaint description provided."}

              </div>

            </div>

            {/* EVIDENCE */}
            <div className="case-card">

              <div className="case-card-title">
                <h3>
                  📎 3. Evidence / Supporting
                  Information
                </h3>
              </div>

              {selectedCase.evidence &&
              (
                selectedCase.evidence.details ||
                selectedCase.evidence.file
              ) ? (

                <div className="evidence-details-card">

                  <div className="evidence-row">

                    <div>
                      <label>Evidence Type</label>

                      <strong>
                        {selectedCase.evidence.type}
                      </strong>
                    </div>

                    <div>
                      <label>Status</label>

                      <span className="evidence-attached">
                        {selectedCase.evidence.file
                          ? "File Attached"
                          : "Details Only"}
                      </span>
                    </div>

                  </div>

                  {/* EVIDENCE DETAILS */}

                  <div className="evidence-text">

                    <label>
                      Evidence Details
                    </label>

                    <p>
                      {selectedCase.evidence.details ||
                        "No details provided."}
                    </p>

                  </div>

                  {/* FILE */}

                  {selectedCase.evidence.file && (
                    <div className="evidence-file-box">

                      <div>
                        📄{" "}

                        <strong>
                          {
                            selectedCase.evidence
                              .file.name
                          }
                        </strong>

                        <small>
                          {" "}
                          (
                          {Math.round(
                            selectedCase.evidence
                              .file.size / 1024
                          )}
                          KB)
                        </small>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >

                        <a
                          href={
                            selectedCase.evidence
                              .file.url
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="view-evidence-button"
                        >
                          👁 View Evidence
                        </a>

                        <button
                          type="button"
                          className="clear-button"
                          onClick={
                            removeCaseEvidence
                          }
                        >
                          🗑 Remove Evidence
                        </button>

                      </div>

                    </div>
                  )}

                  {/* ADD CORRECT EVIDENCE */}

                  {!selectedCase.evidence.file && (
                    <div
                      style={{
                        marginTop: "20px",
                        padding: "18px",
                        border: "1px dashed #ccc",
                        borderRadius: "10px",
                      }}
                    >

                      <label>
                        <strong>
                          📎 Attach Correct Evidence
                        </strong>
                      </label>

                      <p
                        style={{
                          marginTop: "6px",
                          marginBottom: "12px",
                        }}
                      >
                        The previous evidence was
                        removed. Select the correct
                        evidence file.
                      </p>

                      <input
                        type="file"
                        onChange={
                          replaceCaseEvidence
                        }
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt,.xlsx,.xls,.csv,.mp3,.mp4"
                      />

                    </div>
                  )}

                </div>

              ) : (

                <div className="no-evidence">

                  <p>
                    No evidence has been attached
                    to this case.
                  </p>

                  <label>
                    <strong>
                      📎 Add Correct Evidence
                    </strong>
                  </label>

                  <br />

                  <input
                    type="file"
                    onChange={
                      replaceCaseEvidence
                    }
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt,.xlsx,.xls,.csv,.mp3,.mp4"
                  />

                </div>

              )}

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div>

            {/* SUMMARY */}
            <div className="case-card">

              <h3>📋 Case Summary</h3>

              <div className="summary-row">
                <span>Case ID</span>

                <strong>
                  {selectedCase.id}
                </strong>
              </div>

              <div className="summary-row">
                <span>Status</span>

                <span className="case-status-badge">
                  {selectedCase.status}
                </span>
              </div>

              <div className="summary-row">
                <span>Risk Score</span>

                <strong>
                  {selectedCase.riskScore}
                  {" "}
                  ({selectedCase.riskLevel})
                </strong>
              </div>

            </div>

            {/* QUICK ACTIONS */}
            <div className="case-card">

              <h3>⚡ Quick Actions</h3>

              <button className="case-action-primary">
                👤 Assign Officer
              </button>

              <button className="case-action-button">
                ✓ Run Validation
              </button>

              <button className="case-action-button">
                📎 Add Evidence
              </button>

              <button className="case-action-button">
                💬 Add Comment
              </button>

            </div>

            {/* RELATED MODULES */}
            <div className="case-card">

              <h3>🔗 Related Modules</h3>

              <div className="related-module">
                Validation & Risk Scoring
                <span>›</span>
              </div>

              <div className="related-module">
                Investigation
                <span>›</span>
              </div>

              <div className="related-module">
                Classification & Decision
                <span>›</span>
              </div>

              <div className="related-module">
                Case Closure
                <span>›</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    );
  }

  // =====================================================
  // FRAUD INTAKE PAGE
  // =====================================================

  return (
    <div className="page">

      {/* PAGE HEADER */}

      <div className="page-header">

        <div>
          <h2>
            AFU FRAUD MANAGEMENT SYSTEM (AFMS)
          </h2>

          <p>
            Capture once; route automatically
            through the case lifecycle.
          </p>
        </div>

      </div>

      {/* FORM */}

      <div className="form-panel intake-panel">

        <div className="intake-header">

          <div>
            <h3>
              Fraud Register
            </h3>

            <p>
              Capture case information and
              supporting evidence.
            </p>
          </div>

          <span className="auto-case-badge">
            AUTO CASE ID
          </span>

        </div>

        <form onSubmit={handleSubmit}>

          {/* =========================
              CASE INFORMATION
          ========================= */}

          <div className="form-grid three-columns">

            {/* INCIDENT / EVENT CATEGORY */}

            <div className="form-field">

              <label>
                INCIDENT / EVENT CATEGORY
              </label>

              <select
                name="incidentEventCategory"
                value={formData.incidentEventCategory}
                onChange={handleChange}
              >
                <option>Fraud / Suspected Fraud</option>
                <option>Corruption / Bribery</option>
                <option>Theft / Misappropriation</option>
                <option>Conflict of Interest</option>
                <option>Financial Irregularity</option>
                <option>Membership Irregularity</option>
                <option>Provider Non-Compliance</option>
                <option>Clinical / Service Irregularity</option>
                <option>Data / Privacy Incident</option>
                <option>ICT / Cybersecurity Incident</option>
                <option>False Documentation / Misrepresentation</option>
                <option>Complaint / Grievance</option>
                <option>Whistleblower Report</option>
                <option>Other</option>
              </select>

              {formData.incidentEventCategory === "Other" && (
                <input
                  type="text"
                  name="incidentEventCategoryOther"
                  value={formData.incidentEventCategoryOther}
                  onChange={handleChange}
                  placeholder="Specify other incident / event category"
                  style={{ marginTop: "10px" }}
                />
              )}

            </div>

            {/* SOURCE */}

            <div className="form-field">

              <label>
                SOURCE OF INFORMATION / CHANNEL
              </label>

              <select
                name="sourceChannel"
                value={formData.sourceChannel}
                onChange={handleChange}
              >
                <option>Call Center</option>
                <option>Claim data anomalies</option>
                <option>Membership data</option>
                <option>Provider data</option>
                <option>Complaints</option>
                <option>Whistleblowers</option>
                <option>Inspection findings</option>
                <option>ICT/System logs</option>
                <option>Compliance data / complaints</option>
                <option>External sources</option>
                <option>Internal audits/finding</option>
              </select>

            </div>

            {/* INCIDENT DATE */}

            <div className="form-field">

              <label>
                INCIDENT DATE
              </label>

              <input
                type="date"
                name="incidentDate"
                value={formData.incidentDate}
                onChange={handleChange}
              />

            </div>

            {/* SUSPECTED FRAUD CATEGORY */}

            <div className="form-field">

              <label>
                SUSPECTED FRAUD CATEGORY
              </label>

             <select
  name="suspectedFraudCategory"
  value={formData.suspectedFraudCategory}
  onChange={handleChange}
>
  <option>Membership fraud</option>
  <option>Clinical fraud</option>
  <option>Compliance fraud</option>
  <option>Insurer fraud</option>
  <option>Other</option>
</select>

{formData.suspectedFraudCategory === "Other" && (
  <input
    type="text"
    name="suspectedFraudCategoryOther"
    value={formData.suspectedFraudCategoryOther}
    onChange={handleChange}
    placeholder="Write other suspected fraud category"
    style={{ marginTop: "10px" }}
  />
)}
          


            </div>

            {/* MEMBER ID */}

            <div className="form-field">

              <label>
                MEMBER ID
              </label>

              <input
                name="memberId"
                value={formData.memberId}
                onChange={handleChange}
                placeholder="e.g. ZHSF-000123"
              />

            </div>

            {/* FACILITY */}

            <div className="form-field">

              <label>
                FACILITY / INSTITUTE
              </label>

              <input
                name="facilityProvider"
                value={
                  formData.facilityProvider
                }
                onChange={handleChange}
                placeholder="Facility name"
              />

            </div>

            {/* CLAIM */}

            <div className="form-field">

              <label>
                CLAIM / AUTHORIZATION NO.
              </label>

              <input
                name="claimAuthorization"
                value={
                  formData.claimAuthorization
                }
                onChange={handleChange}
              />

            </div>

            {/* SERVICE TYPE */}

            <div className="form-field">

              <label>
                SERVICE TYPE
              </label>

             <select
  name="serviceType"
  value={formData.serviceType}
  onChange={handleChange}
>
  <option>Pharmacy</option>
  <option>Outpatient</option>
  <option>Inpatient</option>
  <option>Laboratory</option>
  <option>Radiology</option>
  <option>Dental</option>
  <option>Maternal</option>
  <option>Surgery</option>
  <option>Other</option>
</select>

{formData.serviceType === "Other" && (
  <input
    type="text"
    name="serviceTypeOther"
    value={formData.serviceTypeOther}
    onChange={handleChange}
    placeholder="Write other service type"
    style={{ marginTop: "10px" }}
  />
)}

            </div>

            {/* AMOUNT */}

            <div className="form-field">

              <label>
                SUSPECTED AMOUNT (TZS)
              </label>

              <input
                type="number"
                min="0"
                name="suspectedAmount"
                value={
                  formData.suspectedAmount
                }
                onChange={handleChange}
              />

            </div>

            {/* RED FLAG */}

            <div className="form-field">

              <label>
                RED FLAG
              </label>

             <select
  name="redFlag"
  value={formData.redFlag}
  onChange={handleChange}
>
  <option>Card used without member attendance</option>
  <option>Service not provided / partial</option>
  <option>Billing greater than service</option>
  <option>Duplicate / inconsistent billing</option>
  <option>Wrong authorization / registration</option>
  <option>Delayed / misdirected SMS</option>
  <option>Multiple claims for same service</option>
  <option>Suspicious provider activity</option>
  <option>Other</option>
</select>

{formData.redFlag === "Other" && (
  <input
    type="text"
    name="redFlagOther"
    value={formData.redFlagOther}
    onChange={handleChange}
    placeholder="Write other red flag"
    style={{ marginTop: "10px" }}
  />
)}

            </div>

          </div>

          {/* =========================
              DESCRIPTION
          ========================= */}

          <div className="form-field full-width">

            <label>
              COMPLAINT / INTELLIGENCE DESCRIPTION
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              placeholder="Describe the allegation, anomaly or intelligence received..."
            />

          </div>

          {/* =========================
              EVIDENCE
          ========================= */}

          <div className="evidence-section">

            <h3>
              📎 EVIDENCE / SUPPORTING INFORMATION
            </h3>

            <p>
              Attach evidence that belongs to this
              case.
            </p>

            <div className="form-grid three-columns">

              {/* EVIDENCE TYPE */}

              <div className="form-field">

                <label>
                  EVIDENCE TYPE
                </label>

               <select
  name="evidenceType"
  value={formData.evidenceType}
  onChange={handleChange}
>
  <option>SMS</option>
  <option>Call</option>
  <option>Claim</option>
  <option>Document</option>
  <option>Email</option>
  <option>Image / Photo</option>
  <option>System Record</option>
  <option>Payment Record</option>
  <option>Other</option>
</select>

{formData.evidenceType === "Other" && (
  <input
    type="text"
    name="evidenceTypeOther"
    value={formData.evidenceTypeOther}
    onChange={handleChange}
    placeholder="Write other evidence type"
    style={{ marginTop: "10px" }}
  />
)}

              </div>

              {/* ATTACH FILE */}

              <div className="form-field">

                <label>
                  ATTACH EVIDENCE
                </label>

                <input
                  id="evidenceFileInput"
                  type="file"
                  onChange={handleEvidenceFile}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt,.xlsx,.xls,.csv,.mp3,.mp4"
                />

              </div>

            </div>

            {/* SELECTED EVIDENCE */}

            {formData.evidenceFile && (
              <div
                style={{
                  marginTop: "15px",
                  padding: "15px",
                  border: "1px solid #d8dee9",
                  borderRadius: "10px",
                  background: "#f8fafc",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "15px",
                  flexWrap: "wrap",
                }}
              >

                <div>

                  <strong>
                    📄{" "}
                    {formData.evidenceFile.name}
                  </strong>

                  <br />

                  <small>
                    {Math.round(
                      formData.evidenceFile.size / 1024
                    )}{" "}
                    KB
                  </small>

                </div>

                <button
                  type="button"
                  className="clear-button"
                  onClick={removeEvidence}
                >
                  🗑 Remove Evidence
                </button>

              </div>
            )}

            {/* EVIDENCE DETAILS */}

            <div className="form-field">

              <label>
                EVIDENCE / SUPPORTING DETAILS
              </label>

              <textarea
                name="evidenceDetails"
                value={formData.evidenceDetails}
                onChange={handleChange}
                rows="5"
                placeholder="Enter evidence details..."
              />

            </div>

          </div>

          {/* =========================
              BUTTONS
          ========================= */}

          <div className="form-actions">

            <button
              type="submit"
              className="primary-button"
            >
              Register Case & Generate ID
            </button>

            <button
              type="button"
              className="clear-button"
              onClick={handleClear}
            >
              Clear
            </button>

          </div>

        </form>

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

      </div>

      {/* =========================
          CREATED CASES
      ========================= */}

      {cases.length > 0 && (
        <div className="case-list-panel">

          <h2>
            My Created Cases
          </h2>

          <p>
            Cases created from Fraud Intelligence
            Intake.
          </p>

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
                  <th>ACTION</th>
                </tr>

              </thead>

              <tbody>

                {cases.map((item) => (

                  <tr key={item.id}>

                    <td>
                      <strong>
                        {item.id}
                      </strong>
                    </td>

                    <td>
                      {item.incidentDate ||
                        "Not provided"}
                    </td>

                    <td>
                      {item.facilityProvider ||
                        "Not provided"}
                    </td>

                    <td>
                      {item.redFlag}
                    </td>

                    <td>
                      <span className="case-status-badge">
                        {item.status}
                      </span>
                    </td>

                    <td>
                      {item.riskScore}
                    </td>

                    <td>

                      <button
                        className="view-case-button"
                        onClick={() =>
                          setSelectedCase(item)
                        }
                      >
                        View Case
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>
      )}

    </div>
  );
}

export default FraudIntake;

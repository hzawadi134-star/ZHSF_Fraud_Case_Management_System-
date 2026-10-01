import React, { useState } from "react";

function FraudIntake() {
  const [formData, setFormData] = useState({
    sourceChannel: "Call Center",
    complainantCategory: "Member",
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

    priority: "Routine",
    intakeOfficer: "AFU Intake Desk",
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
  // GENERATE CASE ID
  // =========================

  const generateCaseId = () => {
    const year = new Date().getFullYear();

    const month = String(
      new Date().getMonth() + 1
    ).padStart(2, "0");

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
      complainantCategory: formData.complainantCategory,
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

      priority: formData.priority,
      intakeOfficer: formData.intakeOfficer,

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
      complainantCategory: "Member",
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

      priority: "Routine",
      intakeOfficer: "AFU Intake Desk",
    });

    setMessage("");
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
            onClick={() => setSelectedCase(null)}
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
              {" "} | By {selectedCase.intakeOfficer}
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
                  <label>Source Channel</label>
                  <strong>
                    {selectedCase.sourceChannel}
                  </strong>
                </div>

                <div>
                  <label>Claim / Authorization No.</label>
                  <strong>
                    {selectedCase.claimAuthorization ||
                      "Not provided"}
                  </strong>
                </div>

                <div>
                  <label>Complainant Category</label>
                  <strong>
                    {selectedCase.complainantCategory}
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
                  <label>Suspected Amount (TZS)</label>
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
                  <label>Facility / Provider</label>
                  <strong>
                    {selectedCase.facilityProvider ||
                      "Not provided"}
                  </strong>
                </div>

                <div>
                  <label>Priority</label>
                  <strong>
                    {selectedCase.priority}
                  </strong>
                </div>

                <div>
                  <label>Status</label>

                  <span className="case-status-badge">
                    {selectedCase.status}
                  </span>
                </div>

                <div>
                  <label>Intake Officer</label>
                  <strong>
                    {selectedCase.intakeOfficer}
                  </strong>
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
              (selectedCase.evidence.details ||
                selectedCase.evidence.file) ? (

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

                  <div className="evidence-text">

                    <label>
                      Evidence Details
                    </label>

                    <p>
                      {selectedCase.evidence.details ||
                        "No details provided."}
                    </p>

                  </div>

                  {selectedCase.evidence.file && (
                    <div className="evidence-file-box">

                      <div>
                        📄{" "}
                        <strong>
                          {selectedCase.evidence.file.name}
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

                      <a
                        href={
                          selectedCase.evidence.file.url
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="view-evidence-button"
                      >
                        👁 View Evidence
                      </a>

                    </div>
                  )}

                </div>

              ) : (

                <div className="no-evidence">
                  No evidence has been attached to
                  this case.
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

              <div className="summary-row">
                <span>Priority</span>

                <strong>
                  {selectedCase.priority}
                </strong>
              </div>

              <div className="summary-row">
                <span>Officer</span>

                <strong>
                  {selectedCase.intakeOfficer}
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

      <div className="page-header">

        <div>
          <h2>Fraud Intelligence Intake</h2>

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
              New Fraud Complaint /
              Intelligence Intake
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

          <div className="form-grid three-columns">

            <div className="form-field">
              <label>SOURCE CHANNEL</label>

              <select
                name="sourceChannel"
                value={formData.sourceChannel}
                onChange={handleChange}
              >
                <option>Call Center</option>
                <option>Walk-in</option>
                <option>Email</option>
                <option>Website</option>
                <option>Referral</option>
                <option>Anonymous</option>
                <option>Internal Audit</option>
              </select>
            </div>

            <div className="form-field">
              <label>COMPLAINANT CATEGORY</label>

              <select
                name="complainantCategory"
                value={formData.complainantCategory}
                onChange={handleChange}
              >
                <option>Member</option>
                <option>Facility</option>
                <option>Provider</option>
                <option>Staff</option>
                <option>Anonymous</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-field">
              <label>INCIDENT DATE</label>

              <input
                type="date"
                name="incidentDate"
                value={formData.incidentDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>MEMBER ID</label>

              <input
                name="memberId"
                value={formData.memberId}
                onChange={handleChange}
                placeholder="e.g. ZHSF-000123"
              />
            </div>

            <div className="form-field">
              <label>FACILITY / PROVIDER</label>

              <input
                name="facilityProvider"
                value={formData.facilityProvider}
                onChange={handleChange}
                placeholder="Facility name"
              />
            </div>

            <div className="form-field">
              <label>CLAIM / AUTHORIZATION NO.</label>

              <input
                name="claimAuthorization"
                value={formData.claimAuthorization}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>SERVICE TYPE</label>

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
            </div>

            <div className="form-field">
              <label>SUSPECTED AMOUNT (TZS)</label>

              <input
                type="number"
                min="0"
                name="suspectedAmount"
                value={formData.suspectedAmount}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>RED FLAG</label>

              <select
                name="redFlag"
                value={formData.redFlag}
                onChange={handleChange}
              >
                <option>
                  Card used without member attendance
                </option>
                <option>
                  Service not provided / partial
                </option>
                <option>
                  Billing greater than service
                </option>
                <option>
                  Duplicate / inconsistent billing
                </option>
                <option>
                  Wrong authorization / registration
                </option>
                <option>
                  Delayed / misdirected SMS
                </option>
                <option>
                  Multiple claims for same service
                </option>
                <option>
                  Suspicious provider activity
                </option>
                <option>Other</option>
              </select>
            </div>

          </div>

          {/* DESCRIPTION */}

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

          {/* EVIDENCE */}

          <div className="evidence-section">

            <h3>
              Evidence / Supporting Information
            </h3>

            <p>
              Attach evidence that belongs to this
              case.
            </p>

            <div className="form-grid three-columns">

              <div className="form-field">

                <label>EVIDENCE TYPE</label>

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

              </div>

              <div className="form-field">

                <label>ATTACH EVIDENCE</label>

                <input
                  type="file"
                  onChange={handleEvidenceFile}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt,.xlsx,.xls,.csv,.mp3,.mp4"
                />

                {formData.evidenceFile && (
                  <small>
                    Selected:{" "}
                    {formData.evidenceFile.name}
                  </small>
                )}

              </div>

            </div>

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

          {/* PRIORITY */}

          <div className="form-grid three-columns">

            <div className="form-field">

              <label>PRIORITY</label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option>Routine</option>
                <option>Monitor</option>
                <option>Priority</option>
                <option>Urgent</option>
              </select>

            </div>

            <div className="form-field">

              <label>INTAKE OFFICER</label>

              <input
                name="intakeOfficer"
                value={formData.intakeOfficer}
                onChange={handleChange}
              />

            </div>

          </div>

          {/* BUTTONS */}

          <div className="form-actions">

            <button
              type="submit"
              className="primary-button"
            >
              Create Case & Generate ID
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

      {/* CREATED CASES */}

      {cases.length > 0 && (
        <div className="case-list-panel">

          <h2>My Created Cases</h2>

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
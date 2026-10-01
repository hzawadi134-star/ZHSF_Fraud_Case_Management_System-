import React, { useEffect, useState } from "react";

function Evidence() {
  const [selectedCase, setSelectedCase] = useState(
    "ZHSF-FRD-2026-08-000161"
  );

  const [evidenceType, setEvidenceType] = useState("Document");
  const [reference, setReference] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");

  const [evidenceList, setEvidenceList] = useState([
    {
      caseId: "ZHSF-FRD-2026-08-000161",
      evidence: "Unreferenced",
      type: "Claim Record",
      description: "Claim record submitted for investigation.",
      fileUrl: "",
      fileName: "",
    },
    {
      caseId: "ZHSF-FRD-2026-08-000161",
      evidence: "mm",
      type: "HIS / EMR",
      description: "Medical system record.",
      fileUrl: "",
      fileName: "",
    },
  ]);

  const cases = [
    {
      id: "ZHSF-FRD-2026-08-000161",
      facility: "Ijitimai District Hospital",
    },
    {
      id: "ZHSF-FRD-2026-08-000162",
      facility: "Royal Medical Centre",
    },
    {
      id: "ZHSF-FRD-2026-08-000163",
      facility: "Vitongoji",
    },
    {
      id: "ZHSF-FRD-2026-08-000164",
      facility: "Micheweni District Hospital",
    },
  ];

  const evidenceTypes = [
    "Document",
    "PDF Document",
    "Word Document",
    "Image / Photo",
    "Voice / Audio",
    "Video",
    "Claim Record",
    "HIS / EMR",
    "Email / Message",
    "SMS / Notification",
    "Financial Record",
    "Authorization Record",
    "Other Evidence",
  ];

  // -----------------------------------------
  // SELECT FILE
  // -----------------------------------------
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);

    // Automatically put the file name into Reference
    setReference(file.name);

    setMessage("");
  };

  // -----------------------------------------
  // REGISTER EVIDENCE
  // -----------------------------------------
  const handleRegisterEvidence = (e) => {
    e.preventDefault();

    setMessage("");

    if (!description.trim()) {
      setMessage("Please enter an evidence description.");
      return;
    }

    if (!selectedFile && !reference.trim()) {
      setMessage(
        "Please select an evidence file or provide a reference/file name."
      );
      return;
    }

    let fileUrl = "";
    let fileName = "";

    // If an actual file was selected
    if (selectedFile) {
      fileUrl = URL.createObjectURL(selectedFile);
      fileName = selectedFile.name;
    }

    const newEvidence = {
      caseId: selectedCase,

      evidence: selectedFile
        ? selectedFile.name
        : reference.trim(),

      type: evidenceType,

      description: description.trim(),

      // IMPORTANT:
      // This stores a temporary browser URL
      // so the file can be opened.
      fileUrl: fileUrl,

      fileName: fileName,
    };

    setEvidenceList((prev) => [...prev, newEvidence]);

    setMessage("Evidence registered successfully.");

    // Clear form
    setReference("");
    setDescription("");
    setSelectedFile(null);

    // Reset file input
    const fileInput = document.getElementById("evidence-file");

    if (fileInput) {
      fileInput.value = "";
    }
  };

  // -----------------------------------------
  // CLEAN UP OBJECT URLS
  // -----------------------------------------
  useEffect(() => {
    return () => {
      evidenceList.forEach((item) => {
        if (item.fileUrl) {
          URL.revokeObjectURL(item.fileUrl);
        }
      });
    };
  }, [evidenceList]);

  // -----------------------------------------
  // OPEN EVIDENCE
  // -----------------------------------------
  const handleOpenEvidence = (fileUrl) => {
    if (!fileUrl) {
      alert("No actual file is attached to this evidence.");
      return;
    }

    window.open(fileUrl, "_blank");
  };

  // -----------------------------------------
  // DOWNLOAD EVIDENCE
  // -----------------------------------------
  const handleDownloadEvidence = (fileUrl, fileName) => {
    if (!fileUrl) {
      alert("No actual file is attached to this evidence.");
      return;
    }

    const link = document.createElement("a");

    link.href = fileUrl;
    link.download = fileName || "evidence";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="page">

      {/* =========================
          PAGE HEADER
      ========================== */}
      <div className="page-header">
        <div>
          <h2>Evidence Management</h2>

          <p>
            Register and manage documents, audio, video, images and
            other evidence related to fraud cases.
          </p>
        </div>
      </div>

      {/* =========================
          EVIDENCE FORM
      ========================== */}
      <div className="evidence-panel">

        <h2>Evidence Management</h2>

        <form onSubmit={handleRegisterEvidence}>

          <div className="evidence-form-grid">

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

            {/* EVIDENCE TYPE */}
            <div className="form-field">
              <label>EVIDENCE TYPE</label>

              <select
                value={evidenceType}
                onChange={(e) =>
                  setEvidenceType(e.target.value)
                }
              >
                {evidenceTypes.map((type) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* REFERENCE */}
            <div className="form-field">
              <label>REFERENCE / FILE NAME</label>

              <input
                type="text"
                placeholder="Document or reference"
                value={reference}
                onChange={(e) =>
                  setReference(e.target.value)
                }
              />
            </div>

          </div>

          {/* =========================
              FILE UPLOAD
          ========================== */}
          <div className="form-field evidence-file-field">

            <label>UPLOAD EVIDENCE</label>

            <input
              id="evidence-file"
              type="file"
              accept="
                .pdf,
                .doc,
                .docx,
                .xls,
                .xlsx,
                .csv,
                image/*,
                audio/*,
                video/*,
                text/*
              "
              onChange={handleFileChange}
            />

            <small>
              Supported evidence: PDF, Word, Excel, images,
              audio, video and other related files.
            </small>

            {selectedFile && (
              <div className="selected-file">

                Selected file:

                <strong>
                  {" "}{selectedFile.name}
                </strong>

                <br />

                <small>
                  Size:{" "}
                  {(selectedFile.size / 1024).toFixed(2)}
                  {" "}KB
                </small>

              </div>
            )}

          </div>

          {/* =========================
              DESCRIPTION
          ========================== */}
          <div className="form-field evidence-description">

            <label>EVIDENCE DESCRIPTION</label>

            <textarea
              rows="5"
              placeholder="Describe the evidence and how it relates to the case..."
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />

          </div>

          {/* =========================
              MESSAGE
          ========================== */}
          {message && (
            <div className="success-message">
              {message}
            </div>
          )}

          {/* =========================
              REGISTER BUTTON
          ========================== */}
          <button
            type="submit"
            className="register-evidence-button"
          >
            Register Evidence
          </button>

        </form>
      </div>

      {/* =========================
          EVIDENCE REGISTER
      ========================== */}
      <div className="evidence-table-panel">

        <table>

          <thead>
            <tr>
              <th>CASE</th>
              <th>EVIDENCE</th>
              <th>TYPE</th>
              <th>DESCRIPTION</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>

            {evidenceList.map((item, index) => (

              <tr key={index}>

                {/* CASE */}
                <td>
                  {item.caseId}
                </td>

                {/* EVIDENCE */}
                <td>
                  <strong>
                    {item.evidence}
                  </strong>
                </td>

                {/* TYPE */}
                <td>
                  <span className="evidence-type-badge">
                    {item.type}
                  </span>
                </td>

                {/* DESCRIPTION */}
                <td>
                  {item.description}
                </td>

                {/* ACTION */}
                <td>

                  {item.fileUrl ? (
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        flexWrap: "wrap",
                      }}
                    >

                      {/* OPEN */}
                      <button
                        type="button"
                        onClick={() =>
                          handleOpenEvidence(
                            item.fileUrl
                          )
                        }
                        className="register-evidence-button"
                      >
                        View / Open
                      </button>

                      {/* DOWNLOAD */}
                      <button
                        type="button"
                        onClick={() =>
                          handleDownloadEvidence(
                            item.fileUrl,
                            item.fileName
                          )
                        }
                        className="clear-button"
                      >
                        Download
                      </button>

                    </div>
                  ) : (
                    <span>
                      No file attached
                    </span>
                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Evidence;
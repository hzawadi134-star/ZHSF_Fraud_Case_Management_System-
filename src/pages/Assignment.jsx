import React, { useMemo, useState } from "react";

function Assignment() {
  // =====================================================
  // CASE MANAGEMENT FILTERS
  // =====================================================

  const [searchCase, setSearchCase] = useState("");
  const [riskFilter, setRiskFilter] = useState("All Risks");
  const [stageFilter, setStageFilter] = useState(
    "All Activities / Tasks"
  );

  // =====================================================
  // CASE MANAGEMENT DATA
  // =====================================================

  const [caseManagement, setCaseManagement] = useState([
    {
      id: "ZHSF-FRD-2026-08-000161",
      provider: "Ijitimai District",
      fraudType: "Provider Fraud",
      risk: 58,
      exposure: "TZS 48.9M",
      stage: "Evidence Collection",
      owner: "",
    },

    {
      id: "ZHSF-FRD-2026-08-000162",
      provider: "Urban District",
      fraudType: "Clinical Fraud",
      risk: 72,
      exposure: "TZS 22.4M",
      stage: "Field Investigation",
      owner: "",
    },

    {
      id: "ZHSF-FRD-2026-08-000163",
      provider: "Micheweni District",
      fraudType: "Provider Fraud",
      risk: 41,
      exposure: "TZS 8.2M",
      stage: "Desk Verification",
      owner: "",
    },

    {
      id: "ZHSF-FRD-2026-08-000164",
      provider: "North District",
      fraudType: "Compliance Fraud",
      risk: 68,
      exposure: "TZS 14.7M",
      stage: "Analysis",
      owner: "",
    },
  ]);

  // =====================================================
  // SELECTED CASES
  // =====================================================

  const [selectedCaseIds, setSelectedCaseIds] = useState([]);

  // =====================================================
  // ASSIGNMENT FORM
  // =====================================================

  const [responsibleOfficer, setResponsibleOfficer] =
    useState("F N MUSTAFA");

  const [assignedDate, setAssignedDate] =
    useState("2026-10-05");

  const [selectedActivity, setSelectedActivity] =
    useState("Evidence Collection");

  const [instruction, setInstruction] = useState(
    "Verify claim, member attendance/service delivery and supporting records."
  );

  // =====================================================
  // ACTIVITIES / TASKS
  // =====================================================

  const activities = [
    "Evidence Collection",
    "Field Investigation",
    "Desk Verification",
    "Analysis",
    "Verification",
    "Findings Conclusion & Findings",
    "Recovery",
    "Interventions",
  ];

  // =====================================================
  // OFFICERS
  // =====================================================

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

  // =====================================================
  // ASSIGNED CASES
  // =====================================================

  const [assignedCases, setAssignedCases] = useState([
    {
      id: "ZHSF-FRD-2026-08-000161",
      officer: "F N MUSTAFA",
      assignedDate: "2026-09-24",
      activity: "Evidence Collection",
    },
  ]);

  // =====================================================
  // RISK LEVEL
  // =====================================================

  const getRiskLevel = (risk) => {
    if (risk >= 75) return "Critical";
    if (risk >= 50) return "High";
    if (risk >= 25) return "Moderate";
    return "Low";
  };

  // =====================================================
  // RISK CSS CLASS
  // =====================================================

  const getRiskClass = (risk) => {
    if (risk >= 75) return "critical";
    if (risk >= 50) return "high";
    if (risk >= 25) return "moderate";
    return "low";
  };

  // =====================================================
  // FILTER CASES
  // =====================================================

  const filteredCases = useMemo(() => {
    return caseManagement.filter((item) => {
      const riskLevel = getRiskLevel(item.risk);

      const searchText = searchCase
        .toLowerCase()
        .trim();

      const searchMatch =
        item.id.toLowerCase().includes(searchText) ||
        item.provider.toLowerCase().includes(searchText) ||
        item.fraudType.toLowerCase().includes(searchText);

      const riskMatch =
        riskFilter === "All Risks" ||
        riskLevel === riskFilter;

      const stageMatch =
        stageFilter === "All Activities / Tasks" ||
        item.stage === stageFilter;

      return (
        searchMatch &&
        riskMatch &&
        stageMatch
      );
    });
  }, [
    searchCase,
    riskFilter,
    stageFilter,
    caseManagement,
  ]);

  // =====================================================
  // SELECT / UNSELECT ONE CASE
  // =====================================================

  const handleSelectCase = (caseId) => {
    setSelectedCaseIds((previous) => {
      if (previous.includes(caseId)) {
        return previous.filter(
          (id) => id !== caseId
        );
      }

      return [
        ...previous,
        caseId,
      ];
    });
  };

  // =====================================================
  // SELECT ALL CASES
  // =====================================================

  const handleSelectAll = () => {
    const visibleIds = filteredCases.map(
      (item) => item.id
    );

    const allSelected =
      visibleIds.length > 0 &&
      visibleIds.every((id) =>
        selectedCaseIds.includes(id)
      );

    if (allSelected) {
      setSelectedCaseIds((previous) =>
        previous.filter(
          (id) => !visibleIds.includes(id)
        )
      );
    } else {
      setSelectedCaseIds((previous) => [
        ...new Set([
          ...previous,
          ...visibleIds,
        ]),
      ]);
    }
  };

  // =====================================================
  // OPEN CASE
  // =====================================================

  const handleOpenExistingCase = (caseId) => {
    alert(`Opening ${caseId}`);
  };

  // =====================================================
  // ASSIGN SELECTED CASES
  // =====================================================

  const handleAssignSelectedCases = (e) => {
    e.preventDefault();

    if (selectedCaseIds.length === 0) {
      alert(
        "Please select at least one case from Case Management."
      );
      return;
    }

    if (
      !responsibleOfficer ||
      !assignedDate ||
      !selectedActivity
    ) {
      alert(
        "Please complete all assignment fields."
      );
      return;
    }

    // Get selected cases
    const selectedCases =
      caseManagement.filter((item) =>
        selectedCaseIds.includes(item.id)
      );

    // Create assignment records
    const newAssignments =
      selectedCases.map((item) => ({
        id: item.id,
        officer: responsibleOfficer,
        assignedDate: assignedDate,
        activity: selectedActivity,
      }));

    // Update Assigned Cases
    setAssignedCases((previous) => {
      const updatedCases = [...previous];

      newAssignments.forEach(
        (newAssignment) => {
          const existingIndex =
            updatedCases.findIndex(
              (item) =>
                item.id === newAssignment.id
            );

          if (existingIndex !== -1) {
            updatedCases[existingIndex] =
              newAssignment;
          } else {
            updatedCases.unshift(
              newAssignment
            );
          }
        }
      );

      return updatedCases;
    });

    // Update Case Management
    setCaseManagement((previous) =>
      previous.map((item) =>
        selectedCaseIds.includes(item.id)
          ? {
              ...item,
              owner: responsibleOfficer,
              stage: selectedActivity,
            }
          : item
      )
    );

    const numberOfCases =
      selectedCaseIds.length;

    // Clear selected cases
    setSelectedCaseIds([]);

    alert(
      `${numberOfCases} case(s) assigned successfully.`
    );
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="page">

      {/* =================================================
          CASE MANAGEMENT HEADER
      ================================================== */}

      <div className="case-management-header">

        <div>
          <h2>
            Case Management
          </h2>

          <p>
            Manage, search and monitor fraud
            investigation cases.
          </p>
        </div>

      </div>

      {/* =================================================
          CASE MANAGEMENT PANEL
      ================================================== */}

      <div className="case-management-panel">

        {/* =================================================
            FILTERS
        ================================================== */}

        <div className="case-filters">

          {/* SEARCH */}

          <div className="case-search">

            <label>
              SEARCH CASES
            </label>

            <input
              type="text"
              placeholder="Search cases..."
              value={searchCase}
              onChange={(e) =>
                setSearchCase(
                  e.target.value
                )
              }
            />

          </div>

          {/* RISK */}

          <div>

            <label>
              RISK
            </label>

            <select
              value={riskFilter}
              onChange={(e) =>
                setRiskFilter(
                  e.target.value
                )
              }
            >

              <option value="All Risks">
                All Risks
              </option>

              <option value="Critical">
                Critical
              </option>

              <option value="High">
                High
              </option>

              <option value="Moderate">
                Moderate
              </option>

              <option value="Low">
                Low
              </option>

            </select>

          </div>

          {/* ACTIVITIES / TASKS */}

          <div>

            <label>
              ACTIVITIES / TASKS
            </label>

            <select
              value={stageFilter}
              onChange={(e) =>
                setStageFilter(
                  e.target.value
                )
              }
            >

              <option value="All Activities / Tasks">
                All Activities / Tasks
              </option>

              {activities.map(
                (activity) => (
                  <option
                    key={activity}
                    value={activity}
                  >
                    {activity}
                  </option>
                )
              )}

            </select>

          </div>

        </div>

        {/* =================================================
            SELECTION INFORMATION
        ================================================== */}

        <div className="case-selection-bar">

          <div className="selection-count">

            <strong>
              {selectedCaseIds.length}
            </strong>

            <span>
              case(s) selected
            </span>

          </div>

          <button
            type="button"
            className="select-all-button"
            onClick={handleSelectAll}
          >
            {filteredCases.length > 0 &&
            filteredCases.every(
              (item) =>
                selectedCaseIds.includes(
                  item.id
                )
            )
              ? "Unselect All"
              : "Select All"}
          </button>

        </div>

        {/* =================================================
            CASE TABLE
        ================================================== */}

        <div className="case-table-wrapper">

          <table className="case-management-table">

            <thead>

              <tr>

                {/* SELECT */}

                <th className="select-column">

                  <input
                    type="checkbox"
                    className="case-checkbox"
                    checked={
                      filteredCases.length > 0 &&
                      filteredCases.every(
                        (item) =>
                          selectedCaseIds.includes(
                            item.id
                          )
                      )
                    }
                    onChange={
                      handleSelectAll
                    }
                  />

                </th>

                <th>
                  CASE ID
                </th>

                <th>
                  PROVIDER
                </th>

                <th>
                  FRAUD TYPE
                </th>

                <th>
                  RISK
                </th>

                <th>
                  EXPOSURE
                </th>

                <th>
                  ACTION
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredCases.length > 0 ? (

                filteredCases.map(
                  (item) => {

                    const riskLevel =
                      getRiskLevel(
                        item.risk
                      );

                    const riskClass =
                      getRiskClass(
                        item.risk
                      );

                    const isSelected =
                      selectedCaseIds.includes(
                        item.id
                      );

                    return (
                      <tr
                        key={item.id}
                        className={
                          isSelected
                            ? "selected-case-row"
                            : ""
                        }
                      >

                        {/* =================================================
                            CHECKBOX
                        ================================================== */}

                        <td className="select-column">

                          <input
                            type="checkbox"
                            className="case-checkbox"
                            checked={
                              isSelected
                            }
                            onChange={() =>
                              handleSelectCase(
                                item.id
                              )
                            }
                          />

                        </td>

                        {/* CASE ID */}

                        <td className="case-id">
                          {item.id}
                        </td>

                        {/* PROVIDER */}

                        <td>
                          {item.provider}
                        </td>

                        {/* FRAUD TYPE */}

                        <td>
                          {item.fraudType}
                        </td>

                        {/* RISK */}

                        <td>

                          <div className="risk-container">

                            <span
                              className={`risk-badge ${riskClass}`}
                            >
                              {riskLevel}
                            </span>

                            <span className="risk-number">
                              {item.risk}
                            </span>

                          </div>

                        </td>

                        {/* EXPOSURE */}

                        <td className="exposure">
                          {item.exposure}
                        </td>

                        {/* ACTION */}

                        <td>

                          <button
                            type="button"
                            className="case-open-button"
                            onClick={() =>
                              handleOpenExistingCase(
                                item.id
                              )
                            }
                          >
                            Open
                          </button>

                        </td>

                      </tr>
                    );
                  }
                )

              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="no-cases"
                  >
                    No cases found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* =================================================
          CASE ASSIGNMENT
      ================================================== */}

      <div className="assignment-section">

        <div className="page-header">

          <h2>
            Case Assignment
          </h2>

        </div>

        {/* =================================================
            ASSIGNMENT FORM
        ================================================== */}

        <div className="form-panel assignment-panel">

          <h3>
            Assign Selected Cases
          </h3>

          <form
            onSubmit={
              handleAssignSelectedCases
            }
          >

            <div className="assignment-grid">

              {/* RESPONSIBLE OFFICER */}

              <div className="form-field">

                <label>
                  RESPONSIBLE OFFICER
                </label>

                <select
                  value={
                    responsibleOfficer
                  }
                  onChange={(e) =>
                    setResponsibleOfficer(
                      e.target.value
                    )
                  }
                >

                  {officers.map(
                    (officer) => (
                      <option
                        key={officer}
                        value={officer}
                      >
                        {officer}
                      </option>
                    )
                  )}

                </select>

              </div>

              {/* ASSIGNED DATE */}

              <div className="form-field">

                <label>
                  ASSIGNED DATE
                </label>

                <input
                  type="date"
                  value={assignedDate}
                  onChange={(e) =>
                    setAssignedDate(
                      e.target.value
                    )
                  }
                />

              </div>

              {/* ACTIVITIES / TASKS */}

              <div className="form-field">

                <label>
                  ACTIVITIES / TASKS
                </label>

                <select
                  value={
                    selectedActivity
                  }
                  onChange={(e) =>
                    setSelectedActivity(
                      e.target.value
                    )
                  }
                >

                  {activities.map(
                    (activity) => (
                      <option
                        key={activity}
                        value={activity}
                      >
                        {activity}
                      </option>
                    )
                  )}

                </select>

              </div>

            </div>

            {/* =================================================
                ASSIGNMENT INSTRUCTION
            ================================================== */}

            <div className="form-field assignment-instruction">

              <label>
                ASSIGNMENT INSTRUCTION
              </label>

              <textarea
                value={instruction}
                onChange={(e) =>
                  setInstruction(
                    e.target.value
                  )
                }
                placeholder="Enter assignment instructions..."
                rows="5"
              />

            </div>

            {/* =================================================
                SELECTED CASES
            ================================================== */}

            <div className="selected-cases-box">

              <h4>
                Selected Cases
              </h4>

              {selectedCaseIds.length === 0 ? (

                <p>
                  Select one or more cases
                  from Case Management above.
                </p>

              ) : (

                <div className="selected-case-list">

                  {selectedCaseIds.map(
                    (caseId) => (
                      <span
                        key={caseId}
                        className="selected-case-tag"
                      >
                        {caseId}
                      </span>
                    )
                  )}

                </div>

              )}

            </div>

            {/* =================================================
                ASSIGN BUTTON
            ================================================== */}

            <div className="assignment-actions">

              <button
                type="submit"
                className="primary-button"
                disabled={
                  selectedCaseIds.length === 0
                }
              >
                Assign Selected Cases
              </button>

            </div>

          </form>

        </div>

        {/* =================================================
            ASSIGNED CASES
        ================================================== */}

        <div className="table-panel assignment-table-panel">

          <h3>
            Assigned Cases
          </h3>

          <table>

            <thead>

              <tr>

                <th>
                  CASE ID
                </th>

                <th>
                  RESPONSIBLE OFFICER
                </th>

                <th>
                  ASSIGNED DATE
                </th>

                <th>
                  ACTIVITIES / TASKS
                </th>

              </tr>

            </thead>

            <tbody>

              {assignedCases.length > 0 ? (

                assignedCases.map(
                  (item) => (

                    <tr key={item.id}>

                      <td>
                        {item.id}
                      </td>

                      <td>
                        {item.officer}
                      </td>

                      <td>
                        {item.assignedDate}
                      </td>

                      <td>

                        <span className="stage-badge">
                          {item.activity}
                        </span>

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="4"
                    className="no-cases"
                  >
                    No assigned cases.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Assignment;
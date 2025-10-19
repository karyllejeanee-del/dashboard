import "./History.css";

import { useMemo, useState } from "react";
import "./History.css";

export default function History({ sessions = [] }) {
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [timeFilter, setTimeFilter] = useState("Last 30 days");

  // Derived filtered sessions
  const filtered = useMemo(() => {
    let list = [...sessions];

    // filter by status
    if (statusFilter !== "All Status") {
      list = list.filter((s) => s.status === statusFilter);
    }

    // filter by time
    if (timeFilter === "Last 30 days") {
      const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
      list = list.filter((s) => new Date(s.date).getTime() >= cutoff);
    }

    return list;
  }, [sessions, statusFilter, timeFilter]);

  // Export to CSV
  const exportData = () => {
    const csv = [
      ["Date", "Time", "Avg HR", "Max HR", "Min HR", "Stress %", "Duration", "Status"],
      ...filtered.map((s) => [
        s.date,
        s.time,
        `${s.avgHR} bpm`,
        `${s.maxHR} bpm`,
        `${s.minHR} bpm`,
        `${s.stress}%`,
        s.duration,
        s.status,
      ]),
    ]
      .map((r) => r.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "health_history.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="history-root">
      <div className="history-header">
        <h2>Health History</h2>
        <p className="subtitle">View and analyze your past health records</p>
        <button className="export-btn" onClick={exportData}>⬇ Export Data</button>
      </div>

      {/* Summary Cards */}
      <div className="summary-row">
        <div className="summary-card">
          <div className="summary-title">Total Sessions</div>
          <div className="summary-value">{sessions.length}</div>
          <div className="summary-sub">Monitoring sessions recorded</div>
        </div>
        <div className="summary-card">
          <div className="summary-title">Average Heart Rate</div>
          <div className="summary-value">
            {Math.round(
              sessions.reduce((sum, s) => sum + s.avgHR, 0) / (sessions.length || 1)
            )}{" "}
            bpm
          </div>
          <div className="summary-sub">Over all sessions</div>
        </div>
        <div className="summary-card">
          <div className="summary-title">Alerts Triggered</div>
          <div className="summary-value">
            {sessions.filter((s) => s.status === "Alert").length}
          </div>
          <div className="summary-sub">Abnormal readings detected</div>
        </div>
      </div>

      {/* Filter + Table */}
      <div className="records-card">
        <div className="records-header">
          <div className="records-title">📊 Filter Records</div>
          <div className="filter-controls">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>All Time</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Status</option>
              <option>Normal</option>
              <option>Alert</option>
            </select>
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Avg HR</th>
                <th>Max HR</th>
                <th>Min HR</th>
                <th>Stress %</th>
                <th>Duration</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={i}>
                  <td>{s.date}</td>
                  <td>{s.time}</td>
                  <td>{s.avgHR} bpm</td>
                  <td>{s.maxHR} bpm</td>
                  <td>{s.minHR} bpm</td>
                  <td>{s.stress}%</td>
                  <td>{s.duration}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        s.status === "Alert" ? "alert" : "normal"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="no-records">No records found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

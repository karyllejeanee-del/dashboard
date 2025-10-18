import "./Dashboard.css";
export default function Dashboard({ presentData, espConnected, alertMsg }) {
  return (
    <div className="tab">
      <h1>Dashboard</h1>
      {alertMsg && <div className="alert-message">{alertMsg}</div>}

      <div className="status-cards">
        <div className="card">
          <h3>Heart Rate</h3>
          <p className="value">{presentData.heartRate} bpm</p>
        </div>

        <div className="card">
          <h3>Stress Level</h3>
          <p className="value">{(presentData.stressLevel * 100).toFixed(0)}%</p>
        </div>

        <div className={`card esp-status ${espConnected ? "connected" : "offline"}`}>
          <h3>ESP32 Connection</h3>
          <p className="value">{espConnected ? "Connected" : "Offline"}</p>
        </div>
      </div>
    </div>
  );
}

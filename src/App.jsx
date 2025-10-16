import React, { useState, useEffect } from "react";
import "./App.css";

const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZHvxVgtGqrVGGf2LV8KrkfdEMmudzlVXH_7oxnIvkpy_6y0vdrjPE8wjUYUfQkIM_Q1g&usqp=CAU",
};

const mockHistory = [
  { timestamp: "2025-10-08 14:00", heartRate: 72, stressLevel: 0.3 },
  { timestamp: "2025-10-08 15:00", heartRate: 75, stressLevel: 0.5 },
  { timestamp: "2025-10-08 16:00", heartRate: 70, stressLevel: 0.2 },
  { timestamp: "2025-10-08 17:00", heartRate: 74, stressLevel: 0.6 },
];

export default function App({ onBack }) {
  const [user, setUser] = useState(mockUser);
  const [history] = useState(mockHistory);
  const [espConnected, setEspConnected] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [presentData, setPresentData] = useState({ heartRate: 72, stressLevel: 0.3 });
  const [alertMsg, setAlertMsg] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeartRate = 65 + Math.floor(Math.random() * 20);
      const newStress = +(Math.random() * 1).toFixed(2);

      setPresentData({ heartRate: newHeartRate, stressLevel: newStress });
      setEspConnected(Math.random() > 0.1);

      if (newStress > 0.7) {
        setAlertMsg("⚠️ Stress level is abnormally high! Please relax.");
      } else {
        setAlertMsg(null);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="profile-section">
          <img src={user.avatarUrl} alt="User Avatar" className="avatar" />
          <div className="user-info">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={activeTab === "dashboard" ? "active" : ""}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={activeTab === "history" ? "active" : ""}
            onClick={() => setActiveTab("history")}
          >
            History
          </button>
          <button
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
        </nav>

        <button className="logout-button" onClick={onBack}>
          Logout
        </button>
      </aside>

      <main className="main-content">
        {activeTab === "dashboard" && (
          <>
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
          </>
        )}

        {activeTab === "history" && (
          <>
            <h1>History</h1>
            <ul className="history-list">
              {history.map((entry, idx) => (
                <li key={idx} className="history-item">
                  <div className="timestamp">{entry.timestamp}</div>
                  <div>HR: <span>{entry.heartRate}</span> bpm</div>
                  <div>Stress: <span>{(entry.stressLevel * 100).toFixed(0)}%</span></div>
                </li>
              ))}
            </ul>
          </>
        )}

        {activeTab === "profile" && (
          <>
            <h1>Edit Profile</h1>
            <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
              <label>
                Name:
                <input type="text" name="name" value={user.name} onChange={handleProfileChange} />
              </label>
              <label>
                Email:
                <input type="email" name="email" value={user.email} onChange={handleProfileChange} />
              </label>
              <button>Save Changes</button>
            </form>
          </>
        )}
      </main>
    </div>
  );
}
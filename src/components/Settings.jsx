import { useEffect, useState } from "react";
import "./Settings.css";

export default function Settings({ theme, setTheme }) {
  const [heartRateAlert, setHeartRateAlert] = useState(false);
  const [stressLevelAlert, setStressLevelAlert] = useState(false);
  const [activityReminder, setActivityReminder] = useState(false);
  const [dailySummary, setDailySummary] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);

  const [heartRateThreshold, setHeartRateThreshold] = useState(100);
  const [stressLevelThreshold, setStressLevelThreshold] = useState(70);

  const [autoSync, setAutoSync] = useState(true);
  const [batteryOpt, setBatteryOpt] = useState(true);
  const [wifiOnly, setWifiOnly] = useState(false);

  const [dataSharing, setDataSharing] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [locationTracking, setLocationTracking] = useState(false);
  const [dataRetention, setDataRetention] = useState("30 days");

  const [language, setLanguage] = useState("English");

  useEffect(() => {
    document.body.className = theme.toLowerCase();
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <p className="subtext">Manage your app preferences and configurations</p>

      {/* 🔔 Notifications */}
      <section className="settings-section">
        <h2>🔔 Notifications</h2>
        <p>Configure how and when you receive alerts</p>
        {[
          ["Heart Rate Alerts", heartRateAlert, setHeartRateAlert],
          ["Stress Level Alerts", stressLevelAlert, setStressLevelAlert],
          ["Activity Reminders", activityReminder, setActivityReminder],
          ["Daily Summary", dailySummary, setDailySummary],
          ["Weekly Report", weeklyReport, setWeeklyReport],
        ].map(([label, state, setter]) => (
          <div className="setting-item" key={label}>
            <span>{label}</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={state}
                onChange={() => setter(!state)}
              />
              <span className="slider"></span>
            </label>
          </div>
        ))}
      </section>

      {/* ⚙️ Thresholds */}
      <section className="settings-section">
        <h2>⚙️ Alert Thresholds</h2>
        <p>Customize when you receive health alerts</p>

        <div className="slider-container">
          <label>Heart Rate Threshold — {heartRateThreshold} bpm</label>
          <input
            type="range"
            min="60"
            max="200"
            value={heartRateThreshold}
            onChange={(e) => setHeartRateThreshold(e.target.value)}
          />
        </div>

        <div className="slider-container">
          <label>Stress Level Threshold — {stressLevelThreshold}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={stressLevelThreshold}
            onChange={(e) => setStressLevelThreshold(e.target.value)}
          />
        </div>
      </section>

      {/* 📱 Device Settings */}
      <section className="settings-section">
        <h2>📱 Device Settings</h2>
        {[
          ["Auto-Sync", autoSync, setAutoSync],
          ["Battery Optimization", batteryOpt, setBatteryOpt],
          ["WiFi Only Sync", wifiOnly, setWifiOnly],
        ].map(([label, state, setter]) => (
          <div className="setting-item" key={label}>
            <span>{label}</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={state}
                onChange={() => setter(!state)}
              />
              <span className="slider"></span>
            </label>
          </div>
        ))}
      </section>

      {/* 🔒 Privacy */}
      <section className="settings-section">
        <h2>🔒 Privacy & Security</h2>
        {[
          ["Data Sharing", dataSharing, setDataSharing],
          ["Analytics", analytics, setAnalytics],
          ["Location Tracking", locationTracking, setLocationTracking],
        ].map(([label, state, setter]) => (
          <div className="setting-item" key={label}>
            <span>{label}</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={state}
                onChange={() => setter(!state)}
              />
              <span className="slider"></span>
            </label>
          </div>
        ))}

        <div className="dropdown">
          <label>Data Retention Period</label>
          <select
            value={dataRetention}
            onChange={(e) => setDataRetention(e.target.value)}
          >
            <option>7 days</option>
            <option>30 days</option>
            <option>90 days</option>
          </select>
        </div>
      </section>

      {/* 🎨 Appearance */}
      <section className="settings-section">
        <h2>🎨 Appearance</h2>
        <div className="dropdown">
          <label>Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value.toLowerCase())}
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>

        <div className="dropdown">
          <label>Language</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option>English</option>
            <option>Filipino</option>
          </select>
        </div>
      </section>

      {/* ⚠️ Danger Zone */}
      <section className="danger-zone">
        <h2>⚠️ Danger Zone</h2>
        <button className="danger-btn">Clear All Health Data</button>
        <button className="danger-btn">Delete Account</button>
      </section>
    </div>
  );
}

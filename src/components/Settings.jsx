import "./Settings.css";

export default function Settings({ theme, setTheme }) {
  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <p className="subtext">Customize your preferences and account options.</p>

      {/* === Appearance === */}
      <div className="settings-section">
        <h2>Appearance</h2>
        <p>Switch between light and dark mode.</p>
        <div className="setting-item">
          <span>Dark Mode</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      {/* === Notifications === */}
      <div className="settings-section">
        <h2>Notifications</h2>
        <p>Manage how you receive alerts and updates.</p>
        <div className="setting-item">
          <span>System Alerts</span>
          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </div>
        <div className="setting-item">
          <span>Email Updates</span>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      {/* === Danger Zone === */}
      <div className="danger-zone">
        <h2>Danger Zone</h2>
        <p>Be careful—these actions cannot be undone.</p>
        <button className="danger-btn">Delete Account</button>
        <button className="danger-btn">Reset Data</button>
      </div>
    </div>
  );
}

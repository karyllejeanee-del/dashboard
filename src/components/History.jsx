import "./History.css";
export default function History({ history }) {
  return (
    <div className="tab">
      <h1>History</h1>
      <div className="history-container">
        <ul className="history-list">
          {history.map((entry, idx) => (
            <li key={idx} className="history-item">
              <div className="timestamp">{entry.timestamp}</div>
              <div>
                HR: <span>{entry.heartRate}</span> bpm
              </div>
              <div>
                Stress: <span>{(entry.stressLevel * 100).toFixed(0)}%</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

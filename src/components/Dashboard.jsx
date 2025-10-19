import { useEffect, useMemo, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./Dashboard.css";

function fmtTime(d) {
  const t = new Date(d);
  return `${t.getHours().toString().padStart(2, "0")}:${t
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${t.getSeconds().toString().padStart(2, "0")}`;
}

export default function Dashboard({
  // optional props if you want to feed external data
  initialHeart = 72,
  initialStress = 0.32,
  initialSteps = 6842,
}) {
  const [monitoring, setMonitoring] = useState(true);
  const [alertMsg, setAlertMsg] = useState(null);

  // Live heart-rate timeseries
  const [hrSeries, setHrSeries] = useState(() => {
    // seed with 20 points (past seconds)
    const now = Date.now();
    return Array.from({ length: 20 }, (_, i) => {
      const ts = now - (19 - i) * 2000;
      return {
        time: fmtTime(ts),
        value: initialHeart + Math.round(Math.sin(i / 2) * 6 + Math.random() * 4),
        ts,
      };
    });
  });

  // Weekly stress data (7 days) for area chart
  const [weeklyStress] = useState(() => {
    return [
      { day: "Mon", value: 35 },
      { day: "Tue", value: 48 },
      { day: "Wed", value: 55 },
      { day: "Thu", value: 62 },
      { day: "Fri", value: 58 },
      { day: "Sat", value: 61 },
      { day: "Sun", value: 42 },
    ];
  });

  const [activitySteps, setActivitySteps] = useState(initialSteps);

  // refs to control interval
  const intervalRef = useRef(null);

  // derive latest presentData
  const present = useMemo(() => {
    const last = hrSeries[hrSeries.length - 1] || { value: initialHeart };
    const stressVal = Math.min(
      1,
      Math.max(0, initialStress + (last.value - initialHeart) / 200)
    ); // ad-hoc calc for demo
    return {
      heartRate: last.value,
      stressLevel: stressVal,
      steps: activitySteps,
    };
  }, [hrSeries, initialHeart, initialStress, activitySteps]);

  useEffect(() => {
    // monitoring interval: push new point every 2s
    function startInterval() {
      if (intervalRef.current) return;
      intervalRef.current = setInterval(() => {
        // generate new HR around last
        setHrSeries((prev) => {
          const last = prev[prev.length - 1];
          const base = last ? last.value : initialHeart;
          const delta = Math.round((Math.random() - 0.45) * 6); // small variance
          const nextValue = Math.max(40, Math.min(120, base + delta));
          const ts = Date.now();
          const next = { time: fmtTime(ts), value: nextValue, ts };
          const nextSeries = [...prev.slice(-49), next]; // keep last 50
          // set alert if stress high (simulate)
          const simulatedStress = Math.min(1, Math.max(0, initialStress + (nextValue - initialHeart) / 160));
          setAlertMsg(simulatedStress > 0.75 ? "⚠️ Stress level is abnormally high! Please relax." : null);
          return nextSeries;
        });

        // step increase randomly
        setActivitySteps((s) => s + Math.round(Math.random() * 6));
      }, 2000);
    }

    function stopInterval() {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    if (monitoring) startInterval();
    else stopInterval();

    return () => stopInterval();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monitoring]);

  

  return (
    <div className="dashboard-root">
      <div className="dashboard-header">
        <div>
          <h2>Health Monitoring Dashboard</h2>
          <p className="subtitle">Real-time health metrics and insights</p>
        </div>

        <div className="header-actions">
          <button
            className={`stop-btn ${monitoring ? "active" : "paused"}`}
            onClick={() => setMonitoring((m) => !m)}
          >
            {monitoring ? "Stop Monitoring" : "Start Monitoring"}
          </button>
        </div>
      </div>

      {/* Top cards */}
      <div className="cards-row">
        <div className="card">
          <div className="card-title">Heart Rate</div>
          <div className="card-body">
            <div className="stat-value">{present.heartRate} <span className="unit">bpm</span></div>
            <div className="stat-sub">Normal</div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Stress Level</div>
          <div className="card-body">
            <div className="stress-percent">{Math.round(present.stressLevel * 100)} %</div>
            <div className="stress-bar">
              <div
                className="stress-bar-fill"
                style={{ width: `${Math.round(present.stressLevel * 100)}%` }}
              />
            </div>
            <div className="stat-sub">Moderate</div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Activity Level</div>
          <div className="card-body">
            <div className="stat-value">{present.steps.toLocaleString()}</div>
            <div className="stat-sub">+12% from yesterday</div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Alerts</div>
          <div className="card-body">
            <div className="stat-value">{alertMsg ? "1 active" : "0 today"}</div>
            <div className="stat-sub">{alertMsg ? alertMsg : "All systems normal"}</div>
          </div>
        </div>
      </div>

      {/* Charts row */}
      <div className="charts-row">
        <div className="chart-card large">
          <div className="chart-title">Heart Rate Trend</div>
          <div className="chart-area">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={hrSeries}>
                <CartesianGrid stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="time" tick={{ fill: "#9aa0a6", fontSize: 11 }} minTickGap={20} />
                <YAxis domain={[40, 120]} tick={{ fill: "#9aa0a6", fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "#0f1720", border: "none" }} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card small">
          <div className="chart-title">Weekly Stress Levels</div>
          <div className="chart-area">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={weeklyStress}>
                <defs>
                  <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: "#9aa0a6", fontSize: 11 }} />
                <YAxis tick={{ fill: "#9aa0a6", fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "#0f1720", border: "none" }} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#06b6d4"
                  fillOpacity={1}
                  fill="url(#colorStress)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="insights-card">
        <div className="insights-title">AI Health Insights</div>
        <ul className="insights-list">
          <li>
            <span className="dot green" />
            <div>
              <div className="insight-text">Your heart rate is stable and within healthy range</div>
              <div className="insight-time">2 minutes ago</div>
            </div>
          </li>

          <li>
            <span className="dot purple" />
            <div>
              <div className="insight-text">Stress levels have decreased by 15% today</div>
              <div className="insight-time">1 hour ago</div>
            </div>
          </li>

          <li>
            <span className="dot blue" />
            <div>
              <div className="insight-text">Great job! You've reached 68% of your daily step goal</div>
              <div className="insight-time">3 hours ago</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

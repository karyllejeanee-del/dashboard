import React from "react";
import "./Landing.css";

export default function Landing({ onStartMonitoring }) {
  return (
    <div className="page">
      <div className="main-container">
        <section className="hero">
          <div className="text">
            <h1>💙 HeartGuard AI</h1>
            <h2>
              Your AI-Powered <span className="highlight">Health Guardian</span>
            </h2>
            <p>
              Monitor heart rate and stress levels in real-time with wearable sensors.
              Get instant alerts, AI-powered insights and personalized health
              recommendations.
            </p>
            <div className="hero-buttons">
              <button className="primary" onClick={onStartMonitoring}>
                Start Monitoring
              </button>
            </div>
            <div className="hero-tags">
              <span>🟢 Smart Health Monitoring</span>
              <span>🔵 AI Analysis</span>
              <span>🟣 Instant Alerts</span>
            </div>
          </div>
          <div className="image">
            <img
              src="https://www.aha.org/sites/default/files/2019-06/ms_060419_item1_wearable_ai_620.jpg"
              alt="Wearable AI Monitoring"
            />
          </div>
        </section>

        <section className="features">
          <h2>Our Advanced Health Monitoring Features</h2>
          <p>
            Experience the future of health monitoring with our comprehensive
            AI-powered platform.
          </p>
          <div className="feature-cards">
            <div className="card">
              <i className="fas fa-heartbeat"></i>
              <h3>Real-time Health Monitoring</h3>
              <p>Continuous tracking of your heart rate with instant alerts for irregularities.</p>
            </div>
            <div className="card">
              <i className="fas fa-brain"></i>
              <h3>AI-Powered Stress Analysis</h3>
              <p>Advanced algorithms analyze your stress levels and provide personalized insights.</p>
            </div>
            <div className="card">
              <i className="fas fa-shield-heart"></i>
              <h3>Health Protection</h3>
              <p>Early warning system to help prevent serious health complications.</p>
            </div>
            <div className="card">
              <i className="fas fa-chart-line"></i>
              <h3>Trend Analysis</h3>
              <p>Track your health trends over time with detailed charts and reports.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
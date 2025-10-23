import { useState } from "react";
import "./Help.css";

export default function Help() {
  const [search, setSearch] = useState("");
  const [activeQuestion, setActiveQuestion] = useState(null);

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "How do I connect my wearable device?",
          a: "Go to Settings > Device Settings and enable Auto-Sync. Ensure Bluetooth is on and your wearable is in pairing mode.",
        },
        {
          q: "What devices are compatible?",
          a: "Compatible with Apple Watch, Fitbit, Garmin, Samsung Galaxy Watch, and other Bluetooth HR monitors.",
        },
        {
          q: "How do I start monitoring?",
          a: "Click 'Start Monitoring' on the dashboard once your device is connected and positioned correctly.",
        },
      ],
    },
    {
      category: "Features & Usage",
      questions: [
        {
          q: "How does the AI analysis work?",
          a: "The AI analyzes heart rate, stress, and activity data using machine learning for personalized health insights.",
        },
        {
          q: "What do stress percentages mean?",
          a: "0–30% = low stress, 30–60% = moderate, above 60% = high stress.",
        },
        {
          q: "When are alerts triggered?",
          a: "Alerts appear when health metrics exceed your configured thresholds in Settings.",
        },
      ],
    },
    {
      category: "Privacy & Security",
      questions: [
        {
          q: "Is my data secure?",
          a: "Yes, all health data is encrypted both in transit and at rest using industry standards.",
        },
        {
          q: "Can I delete my data?",
          a: "Yes, delete individual records or all data from Settings > Danger Zone.",
        },
        {
          q: "Do you share my information?",
          a: "We never sell personal data. Only anonymized data may be used for research if you opt in.",
        },
      ],
    },
    {
      category: "Troubleshooting",
      questions: [
        {
          q: "Device won’t connect?",
          a: "Restart devices, ensure Bluetooth is enabled, and toggle Auto-Sync in Settings.",
        },
        {
          q: "Not receiving alerts?",
          a: "Check notification permissions in app and phone settings.",
        },
        {
          q: "Inaccurate readings?",
          a: "Wear the device snugly, clean sensors, and reduce excessive movement.",
        },
      ],
    },
  ];

  const toggleAnswer = (index) => {
    setActiveQuestion((prev) => (prev === index ? null : index));
  };

  return (
    <div className="help-root">
      {/* Header */}
      <div className="help-header">
        <h2>Help Center</h2>
        <p className="subtitle">
          Find answers to common questions and get support
        </p>
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search for help..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Support Options */}
      <div className="support-grid">
        <div className="support-card">
          <div className="support-title">📘 Documentation</div>
          <p>Comprehensive guides and tutorials</p>
          <button>View Docs</button>
        </div>
        <div className="support-card">
          <div className="support-title">💬 Live Chat</div>
          <p>Chat with our support team</p>
          <button>Start Chat</button>
        </div>
        <div className="support-card">
          <div className="support-title">📧 Email Support</div>
          <p>support@heartguard.ai</p>
          <button>Send Email</button>
        </div>
        <div className="support-card">
          <div className="support-title">📞 Phone Support</div>
          <p>+1 (555) HEART-AI</p>
          <button>Call Now</button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h3>📚 Frequently Asked Questions</h3>
        <p className="subtitle">Browse common questions by category</p>

        <div className="faq-grid">
          {faqs.map((faq, faqIndex) => (
            <div key={faq.category} className="faq-card">
              <h4>{faq.category}</h4>
              <ul>
                {faq.questions.map((item, questionIndex) => {
                  const index = faqIndex * 10 + questionIndex;
                  const isActive = activeQuestion === index;

                  return (
                    <li key={index}>
                      <strong
                        className={`faq-question ${isActive ? "active" : ""}`}
                        onClick={() => toggleAnswer(index)}
                      >
                        {item.q}
                      </strong>
                      {isActive && <p className="faq-answer">{item.a}</p>}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="tips-card">
        <h3>💡 Quick Tips</h3>
        <div className="tips-box">
          <ul>
            <li>Wear your device snugly for accurate readings.</li>
            <li>Check AI insights daily to track your health progress.</li>
            <li>Adjust alert thresholds to fit your comfort level.</li>
            <li>Regularly export your data for secure backups.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

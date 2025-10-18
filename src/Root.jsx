import { useState } from "react";
import App from "./App";
import Landing from "./Landing";

export default function Root() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <>
      {showDashboard ? (
        <App onBack={() => setShowDashboard(false)} />
      ) : (
        <Landing onStartMonitoring={() => setShowDashboard(true)} />
      )}
    </>
  );
}
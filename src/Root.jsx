import React, { useState } from "react";
import Landing from "./Landing";
import App from "./App";

export default function Root() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <>
      {showDashboard ? (
        <App onBack={() => setShowDashboard(false)} />
      ) : (
        <Landing onStart={() => setShowDashboard(true)} />
      )}
    </>
  );
}
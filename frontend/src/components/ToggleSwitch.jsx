import React, { useState } from "react";

export default function ToggleSwitch() {
  const [today, setToday] = useState(true);

  const toggleSwitch = () => setToday(!today);

  return (
    <div
      className={`w-25 h-25 rounded-4 d-flex p-1 shadow-lg glass-effect`}
      style={{ cursor: "pointer" }}
      onClick={toggleSwitch} // click anywhere to toggle
    >
      <div
        className={`rounded-4 text-bg-primary px-3 py-2`}
        style={{
          width: "50%",
          textAlign: "center",
          transition: "all 0.3s ease",
          marginLeft: today ? "0" : "50%",
          fontSize:"10px"
        }}
      >
        {today ? "Today Appointment" : "All Appointment"}
      </div>
    </div>
  );
}

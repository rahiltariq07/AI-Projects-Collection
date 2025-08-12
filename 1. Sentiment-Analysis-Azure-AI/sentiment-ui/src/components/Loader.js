import React from "react";

export default function Loader() {
  return (
    <div style={{ marginTop: 12, textAlign: "center" }}>
      <div className="spinner" aria-hidden="true" />
      <div style={{ color: "#6b7280", marginTop: 8 }}>Analyzing...</div>
    </div>
  );
}

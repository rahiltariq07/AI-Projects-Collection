import React from "react";
import { motion } from "framer-motion";

/*
 This component supports both response shapes:
 1) { sentiment: "Positive", positiveScore, neutralScore, negativeScore }
 2) { sentiment: "Positive", confidenceScores: { positive, neutral, negative } }
 It uses optional chaining and fallback zeros to avoid undefined crashes.
*/

export default function SentimentResult({ result }) {
  if (!result) return null;

  // read sentiment label (handles different casing)
  const rawLabel = result.sentiment ?? result.Sentiment ?? "Unknown";
  const label = String(rawLabel).charAt(0).toUpperCase() + String(rawLabel).slice(1);

  // get scores (support both naming styles)
  const pos = Number(
    result.positiveScore ??
      result.PositiveScore ??
      result.confidenceScores?.positive ??
      result.confidenceScores?.Positive ??
      0
  );
  const neu = Number(
    result.neutralScore ??
      result.NeutralScore ??
      result.confidenceScores?.neutral ??
      result.confidenceScores?.Neutral ??
      0
  );
  const neg = Number(
    result.negativeScore ??
      result.NegativeScore ??
      result.confidenceScores?.negative ??
      result.confidenceScores?.Negative ??
      0
  );

  // color and emoji
  const lc = String(label).toLowerCase();
  const color = lc === "positive" ? "#16a34a" : lc === "negative" ? "#dc2626" : "#d97706";
  const emoji = lc === "positive" ? "😊" : lc === "negative" ? "😞" : "😐";

  const makeBar = (value, color) => (
    <div className="bar-row">
      <div className="bar-label">{value === pos ? "Positive" : value === neu ? "Neutral" : "Negative"}</div>
      <div className="bar-track">
        <div className="bar-fill" style={{ width: `${Math.round(value * 100)}%`, background: color }} />
      </div>
      <div className="bar-value">{Math.round(value * 100)}%</div>
    </div>
  );

  return (
    <motion.div
      className="result-card"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.28 }}
      style={{ borderLeft: `6px solid ${color}` }}
    >
      <div className="result-top">
        <div style={{ fontSize: 34 }}>{emoji}</div>
        <div>
          <div className="result-label">{label}</div>
          <div className="result-sub">Confidence (approx.)</div>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        {makeBar(pos, "#16a34a")}
        {makeBar(neu, "#f59e0b")}
        {makeBar(neg, "#dc2626")}
      </div>
    </motion.div>
  );
}

import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import SentimentResult from "./SentimentResult";
import Loader from "./Loader";

export default function SentimentForm() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // make sure this matches your backend; controller route: /api/sentiment/analyze
  const API_URL = "https://localhost:5001/api/sentiment/analyze";

  const analyzeSentiment = async (inputText) => {
    const payload = { text: inputText };

    setError("");
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post(API_URL, payload, {
        headers: { "Content-Type": "application/json" },
        timeout: 15000, // 15s
      });

      const data = res.data;
      setResult(data);

      setHistory((h) => [
        { id: Date.now(), text: inputText, result: data },
        ...h,
      ].slice(0, 10));
    } catch (err) {
      console.error(err);
      // pick friendly message
      const serverMsg =
        err.response?.data?.detail ||
        err.response?.data?.error ||
        err.response?.data ||
        err.message;
      setError(typeof serverMsg === "string" ? serverMsg : "Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("Please enter some text to analyze.");
      return;
    }
    analyzeSentiment(text.trim());
  };

  return (
    <motion.div
      className="card"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <h1 className="title">Sentiment Analyzer</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          className="input"
          placeholder="Type your text here. Press Enter to submit (Shift+Enter for newline)."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          rows={5}
        />

        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Analyzing..." : "Analyze"}
          </button>
          <button
            type="button"
            className="btn secondary"
            onClick={() => {
              setText("");
              setResult(null);
              setError("");
            }}
            disabled={loading}
          >
            Clear
          </button>
        </div>
      </form>

      {loading && <Loader />}

      {error && <div className="error">{error}</div>}

      {result && <SentimentResult result={result} />}

      {history.length > 0 && (
        <div className="history">
          <h4>History</h4>
          {history.map((h) => (
            <div className="history-item" key={h.id}>
              <div className="history-text">{h.text}</div>
              <div className="history-sentiment">
                {h.result?.sentiment ?? h.result?.Sentiment ?? "—"}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

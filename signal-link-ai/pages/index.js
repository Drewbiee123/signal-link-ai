import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function sendMessage(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setReply("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setReply(data.reply);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ fontFamily: "system-ui, Arial", padding: "2rem", maxWidth: 720, margin: "0 auto" }}>
      <h1>🚀 SignalLink AI</h1>
      <p>Next.js + Vercel + OpenAI (starter)</p>

      <form onSubmit={sendMessage} style={{ marginTop: "1rem" }}>
        <label>
          Your message:
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Say hello…"
            style={{ display: "block", width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
            required
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: "0.75rem", padding: "0.5rem 0.8rem", cursor: "pointer" }}
        >
          {loading ? "Thinking…" : "Send"}
        </button>
      </form>

      {error && <p style={{ color: "crimson", marginTop: "1rem" }}>Error: {error}</p>}
      {reply && (
        <div style={{ marginTop: "1rem", padding: "0.75rem 1rem", border: "1px solid #ddd", borderRadius: 8 }}>
          <strong>Model reply:</strong>
          <div style={{ whiteSpace: "pre-wrap", marginTop: 6 }}>{reply}</div>
        </div>
      )}
    </div>
  );
}

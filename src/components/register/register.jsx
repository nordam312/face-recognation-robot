// ...existing code...
import React, { useState } from "react";
import "../signin/signin.css"; // reuse signin styles for identical look
import { addUser, setCurrentUser } from "../../user.js";

export default function Register({ loadUser, onRouteChange }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitRegister = (e) => {
    e.preventDefault();
    setError("");

    const n = (name || "").trim();
    const em = (email || "").trim().toLowerCase();
    const pw = password || "";

    if (!n || !em || !pw) {
      setError("Please fill all fields");
      return;
    }

    const result = addUser({ name: n, email: em, password: pw });
    if (result.error) {
      setError(result.error);
      return;
    }

    const newUser = result.user;

    // persist current-device user and update app state
    try {
      setCurrentUser(newUser);
    } catch (err) {
      console.error("failed to set current user", err);
    }

    if (typeof loadUser === "function") loadUser(newUser);
    if (typeof onRouteChange === "function") onRouteChange("home");
  };

  return (
    <div className="signin-page">
      <div className="signin-card">
        <h2 className="signin-title">Register</h2>
        <form className="signin-form" onSubmit={submitRegister}>
          <label className="signin-label">Name</label>
          <input
            className="signin-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Your name"
          />

          <label className="signin-label">Email</label>
          <input
            className="signin-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="example@domain.com"
          />

          <label className="signin-label">Password</label>
          <input
            className="signin-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />

          {error && <div className="signin-error">{error}</div>}

          <button className="signin-button" type="submit">
            Register
          </button>
        </form>

        <div className="signin-footer">
          <p>
            Already have an account?{" "}
            <span
              className="link"
              onClick={() => onRouteChange && onRouteChange("signin")}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
// ...existing code...

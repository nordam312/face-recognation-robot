// ...existing code...
import React, { useState } from "react";
import { registerUser } from "../../user";
import "../signin/signin.css"; // reuse signin styles for identical look

export default function Register({ onRouteChange, loadUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }
    try {
      const user = await registerUser(name, email, password);
      loadUser(user);
      
      try {
        localStorage.setItem("frb_current_user", JSON.stringify(user));
      } catch (err) {
        console.error(err);
      }

      // persist current-device user)
      onRouteChange && onRouteChange("home");
    } catch (error) {
      setError(error.message || "Registration failed");
      console.error("Registration failed", error);
    }
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

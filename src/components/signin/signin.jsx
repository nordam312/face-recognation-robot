// ...existing code...
import React, { useState } from "react";
import { signIn } from "../../user";
import "./signin.css";

export default function Signin({ onRouteChange, loadUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitSignIn = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const user = await signIn(email, password); // expects server response { id, name, ... }
      loadUser(user);
      // persist current-device user
      try {
        localStorage.setItem("frb_current_user", JSON.stringify(user));
      } catch (err) {
        console.error(err);
      }
      onRouteChange && onRouteChange("home");
    } catch (err) {
      setError(err.response.data || "Sign in failed");
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-card">
        <h2 className="signin-title">Sign In</h2>
        <form className="signin-form" onSubmit={submitSignIn}>
          <label className="signin-label">Email</label>
          <input
            className="signin-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@domain.com"
            required
          />

          <label className="signin-label">Password</label>
          <input
            className="signin-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          {error && <div className="signin-error">{error}</div>}

          <button className="signin-button" type="submit">
            Sign In
          </button>
        </form>

        <div className="signin-footer">
          <p>
            Don't have an account?{" "}
            <span
              className="link"
              onClick={() => onRouteChange && onRouteChange("register")}
            >
              Create an account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
// ...existing code...

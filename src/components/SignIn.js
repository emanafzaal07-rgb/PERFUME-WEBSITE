import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Abhi ke liye sirf console pe values dikha rahe hain
    // Baad me yahan par apna login API call add kar sakte hain
    console.log("Sign in with:", email, password);
  };

  return (
    <div className="auth">
      <div className="auth__card">
        <Link to="/" className="auth__logo">
          Emma Scent <span>&amp;</span> MUSK
        </Link>

        <h1 className="auth__title">Welcome Back</h1>
        <p className="auth__subtitle">Apne account me sign in karein</p>

        <form onSubmit={handleSubmit} className="auth__form">
          <label>
            Email
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button type="submit" className="auth__submit">
            Sign In
          </button>
        </form>

        <p className="auth__switch">
          Naya account banana hai?{" "}
          <Link to="/signup">Sign Up</Link>
        </p>

        <Link to="/" className="auth__back">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default SignIn;

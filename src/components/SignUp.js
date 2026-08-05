import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Abhi ke liye sirf console pe values dikha rahe hain
    // Baad me yahan par apna register API call add kar sakte hain
    console.log("Sign up with:", name, email, password);
  };

  return (
    <div className="auth">
       
      <div className="auth__card">
        <Link to="/" className="auth__logo">
        OUD AL <span></span> NOOR
        </Link>

        <h1 className="auth__title">Create Account</h1>
        <p className="auth__subtitle">MAKE A NEW ACCOUNT WITHIN A MINIUTE</p>

        <form onSubmit={handleSubmit} className="auth__form">
          <label>
            Full Name
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

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
            Sign Up
          </button>
        </form>

        <p className="auth__switch">
          Pehle se account hai?{" "}
          <Link to="/signin">Sign In</Link>
        </p>

        <Link to="/" className="auth__back">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default SignUp;

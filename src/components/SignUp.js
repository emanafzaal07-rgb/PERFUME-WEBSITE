import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Backend ke /api/auth/signup endpoint par request
      const response = await fetch("http://https://perfume-backend-jade.vercel.app](https://perfume-backend-jade.vercel.app/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account Successfully Ban Gaya!");
        navigate("/signin");
      } else {
        alert(data.message || "Registration fail ho gayi");
      }
    } catch (error) {
      console.error("SignUp Error:", error);
      alert("Server connect nahi ho raha, backend check karein!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth__card">
        <Link to="/" className="auth__logo">
          OUD AL <span></span> NOOR
        </Link>

        <h1 className="auth__title">Create Account</h1>
        <p className="auth__subtitle">JOIN US FOR A LUXURY EXPERIENCE</p>

        <form onSubmit={handleSubmit} className="auth__form">
          <label>
            Full Name
            <input
              type="text"
              placeholder="John Doe"
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

          <button type="submit" className="auth__submit" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="auth__switch">
          ALREADY HAVE AN ACCOUNT?{" "}
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
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Backend ke /api/auth/login endpoint par request bhej rahe hain
      const response = await fetch("https://perfume-backend-jade.vercel.app/api/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // User data aur token local storage mein save karein
        localStorage.setItem("userInfo", JSON.stringify(data));
        alert("Login Successful!");
        navigate("/"); // Home page par Redirect
      } else {
        alert(data.message || "Invalid Email or Password");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Server connect nahi ho raha, backend Terminal check karein!");
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

        <h1 className="auth__title">Welcome Back</h1>
        <p className="auth__subtitle">SIGN IN TO YOUR ACCOUNT</p>

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

          <button type="submit" className="auth__submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="auth__switch">
          WANT TO MAKE NEW ACCOUNT?{" "}
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
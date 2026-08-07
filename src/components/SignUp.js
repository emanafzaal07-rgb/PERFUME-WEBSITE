import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

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
      // 1. Firebase Authentication se user create karein
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // 2. User ka Profile Name set karein
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      alert("Account Created Successfully!");
      navigate("/signin");
    } catch (error) {
      console.error("SignUp Error:", error);
      
      // Friendly Error Messages
      if (error.code === "auth/email-already-in-use") {
        alert("This email is alredy registered!");
      } else if (error.code === "auth/weak-password") {
        alert("Password should be off 6 characters!");
      } else {
        alert(error.message || "Registration failed!");
      }
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
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              placeholder="you@mail.com"
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
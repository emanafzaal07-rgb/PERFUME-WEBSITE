import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Email/Password Sign In
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      localStorage.setItem("userInfo", JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      }));

      alert("Login Successful!");
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);

      if (
        error.code === "auth/invalid-credential" || 
        error.code === "auth/user-not-found" || 
        error.code === "auth/wrong-password"
      ) {
        alert("Wrong email or Password! Try Again.");
      } else {
        alert(error.message || "Login Failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Google Sign In Function
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      localStorage.setItem("userInfo", JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      }));

      alert("Google Login Successful!");
      navigate("/");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Google Sign-In is failed. Try Again.");
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

        <h1 className="auth__title">Welcome Back!</h1>
        <p className="auth__subtitle">sign in to your account.</p>

        <form onSubmit={handleSubmit} className="auth__form">
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
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Inline CSS Divider */}
        <div style={{
          textAlign: "center",
          margin: "15px 0",
          color: "#888",
          fontSize: "14px",
          fontWeight: "bold"
        }}>
          OR
        </div>

        {/* Inline CSS Google Sign-In Button */}
        <button 
          type="button" 
          onClick={handleGoogleSignIn} 
          disabled={loading}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            backgroundColor: "#ffffff",
            color: "#333333",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
            fontWeight: "500",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          <img 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
            alt="Google logo" 
            style={{ width: "18px", height: "18px" }}
          />
          Sign in with Google
        </button>

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
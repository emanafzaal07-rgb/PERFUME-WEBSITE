import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("✓ Aap ke email par password reset ka link bhej diya gaya hai. Apna Inbox/Spam folder check karein!");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("Yeh email system mein register nahi hai!");
      } else {
        setError("Email bhejne mein masla hua. Sahi email enter karke dubara koshish karein.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121416] text-white flex items-center justify-center p-6">
      <div className="bg-[#181a1d] border border-[#2e3238] p-8 rounded-2xl w-full max-w-md shadow-2xl space-y-6">
        <h2 className="text-2xl font-serif text-[#ffffff] text-center">Reset Password</h2>
        <p className="text-xs text-[#a09788] text-center">
          Apna registered email enter karein, hum aap ko password reset link bhejenge.
        </p>

        {message && (
          <div className="bg-green-500/10 border border-green-500/40 text-green-400 text-xs p-3 rounded-lg text-center">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/40 text-red-400 text-xs p-3 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label className="text-xs text-[#d4af37] font-serif uppercase tracking-widest block mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="your-email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#121315] border border-[#2e3238] rounded-lg px-4 py-2.5 text-sm text-[#e0d6c3] focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#d4af37] text-black font-serif font-semibold py-3 rounded-lg text-xs uppercase tracking-widest hover:bg-[#c5a059] transition"
          >
            {loading ? "Sending Email..." : "Send Reset Link"}
          </button>
        </form>

        <div className="text-center pt-2">
          <Link to="/signin" className="text-xs text-[#d4af37] hover:underline font-serif">
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
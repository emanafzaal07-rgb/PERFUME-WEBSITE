import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar({
  searchQuery = "",
  setSearchQuery,
  cartItems = [],
  setIsCartOpen,
}) {
  const [user, setUser] = useState(null);

  // Firebase auth state listen karein
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userInfo");
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const totalCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <nav className="navbar flex items-center justify-between px-10 py-5 bg-[#17181a] border-b border-[#2d2820]/60 text-[#d8cebe]">
      {/* Brand Logo */}
      <Link
        to="/"
        className="navbar__logo text-2xl font-serif tracking-[0.2em] text-[#d4af37] uppercase shrink-0 font-medium hover:opacity-90 transition"
      >
        OUD AL NOOR
      </Link>

      {/* Search Bar */}
      <div className="navbar__search flex-1 max-w-md mx-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search luxury oud al noor collection..."
            value={searchQuery}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            className="w-full py-2 pl-10 pr-4 text-xs rounded-full border border-[#8c7443]/60 bg-[#121315] text-[#e0d6c3] placeholder-[#8c7f6b] focus:outline-none focus:border-[#d4af37] transition"
          />
          <svg
            className="w-4 h-4 absolute left-3.5 top-2.5 text-[#8c7f6b]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Navigation Links & Dynamic Auth Buttons */}
      <div className="flex items-center gap-6 shrink-0">
        <Link
          to="/"
          className="text-[#d8cebe] hover:text-[#d4af37] text-xs font-serif tracking-widest uppercase transition"
        >
          Home
        </Link>
        <Link
          to="/products"
          className="text-[#d8cebe] hover:text-[#d4af37] text-xs font-serif tracking-widest uppercase transition"
        >
          Products
        </Link>
        <Link
          to="/contact"
          className="text-[#d8cebe] hover:text-[#d4af37] text-xs font-serif tracking-widest uppercase transition"
        >
          Contact
        </Link>

        {/* --- ADMIN BUTTON --- */}
        <Link
          to="/admin"
          className="border border-[#d4af37]/60 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#121315] px-3 py-1 rounded-full text-xs font-serif tracking-widest uppercase transition font-semibold"
        >
          Admin
        </Link>

        {/* --- DYNAMIC AUTH BUTTONS --- */}
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-[#d4af37] text-xs font-serif tracking-widest uppercase font-semibold">
              HI, {user.displayName || user.email?.split("@")[0]}
            </span>
            <button
              onClick={handleLogout}
              className="border border-[#8c7443]/60 text-[#d8cebe] hover:text-[#d4af37] hover:border-[#d4af37] px-3 py-1 rounded-full text-xs font-serif tracking-widest uppercase transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link
              to="/signin"
              className="text-[#d8cebe] hover:text-[#d4af37] text-xs font-serif tracking-widest uppercase transition"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="text-[#121315] bg-[#d4af37] hover:bg-[#c5a059] px-3.5 py-1.5 rounded-full text-xs font-serif tracking-widest uppercase transition font-semibold"
            >
              Sign Up
            </Link>
          </>
        )}

        {/* Cart Button */}
        <button
          onClick={() => setIsCartOpen && setIsCartOpen(true)}
          className="relative flex items-center gap-2 border border-[#8c7443]/70 bg-[#121315] text-[#d4af37] px-4 py-1.5 rounded-full text-xs font-medium hover:border-[#d4af37] transition ml-2"
        >
          <div className="relative">
            <svg
              className="w-4 h-4 text-[#d4af37]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.6"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span className="absolute -top-2 -right-2 bg-[#d4af37] text-[#121315] font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
              {totalCount}
            </span>
          </div>
          <span className="ml-1 tracking-wider text-xs">{totalCount} items</span>
        </button>
      </div>
    </nav>
  );
}
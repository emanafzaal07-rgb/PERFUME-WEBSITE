import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const ADMIN_EMAILS = [
  "39653@iqraisb.edu.pk",
  "emanafzaal07@gmail.com"
];

export default function Navbar({ user, cartCount = 0, onSearchClick }) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  const isAdmin = user && ADMIN_EMAILS.map(e => e.toLowerCase()).includes(user.email?.toLowerCase());

  // User ka name ya email prefix show karne ke liye
  const userName = user?.displayName || user?.email?.split('@')[0] || "User";

  return (
    <header className="w-full bg-[#090a0b] border-b border-[#1f1d19] sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* 1. Left: Logo */}
        <Link to="/" className="text-xl font-serif font-bold tracking-widest text-[#d4af37]">
          EMMA SCENTS
        </Link>

        {/* 2. Center: Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-serif uppercase tracking-widest text-[#b8af9e]">
          <Link to="/" className="hover:text-[#d4af37] transition">HOME</Link>
          <Link to="/products" className="hover:text-[#d4af37] transition">PRODUCTS</Link>
          <Link to="/collections" className="hover:text-[#d4af37] transition">COLLECTIONS</Link>
          <Link to="/contact" className="hover:text-[#d4af37] transition">CONTACT</Link>

          {isAdmin && (
            <Link to="/admin" className="text-[#d4af37] font-bold underline">
              ADMIN
            </Link>
          )}
        </nav>

        {/* 3. Right: Exact Pill Capsule (Jahan Red Circle hain) */}
        <div className="flex items-center gap-3">
          
          {/* Search Icon */}
          <button 
            onClick={onSearchClick} 
            className="text-[#b8af9e] hover:text-[#d4af37] transition p-1.5"
            aria-label="Search"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Cart Icon */}
          <Link to="/cart" className="relative text-[#b8af9e] hover:text-[#d4af37] transition p-1.5 mr-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#d4af37] text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Profile Capsule Button */}
          <div className="bg-[#141619] border border-[#2a261e] rounded-full p-1 pl-3 flex items-center gap-2.5 shadow-md">
            {user ? (
              <>
                {/* Profile Badge & Name */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#d4af37] text-black text-[10px] font-bold flex items-center justify-center uppercase">
                    {userName.charAt(0)}
                  </div>
                  <span className="text-xs text-[#e0d6c3] font-medium max-w-[100px] truncate capitalize">
                    {userName}
                  </span>
                </div>

                {/* Logout Action inside pill */}
                <button
                  onClick={handleLogout}
                  className="bg-[#211f1a] hover:bg-[#d4af37] text-[#d4af37] hover:text-black text-[10px] font-serif uppercase tracking-wider font-bold px-3 py-1.5 rounded-full transition-all"
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/signin" 
                  className="text-xs text-[#b8af9e] hover:text-white px-2 py-1 font-serif uppercase tracking-wider"
                >
                  SIGN IN
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-[#d4af37] hover:bg-[#c5a059] text-black text-xs font-bold px-4 py-1.5 rounded-full font-serif uppercase tracking-wider transition-all"
                >
                  SIGN UP
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden text-[#b8af9e] ml-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>

        </div>

      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-[#1f1d19] space-y-2 text-xs font-serif uppercase tracking-widest text-[#b8af9e]">
          <Link to="/" className="block py-1 hover:text-[#d4af37]" onClick={() => setIsMobileMenuOpen(false)}>HOME</Link>
          <Link to="/products" className="block py-1 hover:text-[#d4af37]" onClick={() => setIsMobileMenuOpen(false)}>PRODUCTS</Link>
          <Link to="/collections" className="block py-1 hover:text-[#d4af37]" onClick={() => setIsMobileMenuOpen(false)}>COLLECTIONS</Link>
          <Link to="/contact" className="block py-1 hover:text-[#d4af37]" onClick={() => setIsMobileMenuOpen(false)}>CONTACT</Link>
          {isAdmin && (
            <Link to="/admin" className="block py-1 text-[#d4af37] font-bold" onClick={() => setIsMobileMenuOpen(false)}>ADMIN</Link>
          )}
        </div>
      )}
    </header>
  );
}
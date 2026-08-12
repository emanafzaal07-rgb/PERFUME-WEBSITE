import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const ADMIN_EMAILS = [
  "39653@iqraisb.edu.pk",
  "emanafzaal07@gmail.com"
];

export default function Navbar({ user, cartCount = 0, onSearchClick }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  const isAdmin = user && ADMIN_EMAILS.map(e => e.toLowerCase()).includes(user.email?.toLowerCase());

  return (
    <header className="w-full bg-[#090a0b] border-b border-[#1f1d19] sticky top-0 z-50 px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link to="/" className="text-lg font-serif font-bold tracking-widest text-[#d4af37] whitespace-nowrap">
          EMMA SCENTS & SECRETS
        </Link>

        {/* Search Bar */}
        <div 
          onClick={onSearchClick}
          className="hidden lg:flex items-center gap-2 bg-[#141619] border border-[#2a261e] rounded-full px-4 py-1.5 w-72 cursor-pointer text-xs text-gray-400 hover:border-[#d4af37]/50 transition-all"
        >
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="truncate">Search luxury oud al noor collection...</span>
        </div>

        {/* Navigation & Actions */}
        <nav className="flex items-center gap-5 text-xs font-serif uppercase tracking-widest text-[#d8d0c5]">
          <Link to="/" className="hover:text-[#d4af37] transition">HOME</Link>
          <Link to="/products" className="hover:text-[#d4af37] transition">PRODUCTS</Link>
          <Link to="/contact" className="hover:text-[#d4af37] transition">CONTACT</Link>

          {isAdmin && (
            <Link to="/admin" className="bg-[#1f1a10] border border-[#d4af37]/40 text-[#d4af37] px-3 py-1 rounded font-bold">
              ADMIN
            </Link>
          )}

          {user ? (
            <button 
              onClick={handleLogout}
              className="border border-[#d4af37] text-[#d4af37] px-4 py-1.5 rounded-full hover:bg-[#d4af37] hover:text-black transition"
            >
              LOGOUT
            </button>
          ) : (
            <>
              <Link to="/signin" className="hover:text-[#d4af37] transition">SIGN IN</Link>
              <Link to="/signup" className="bg-[#d4af37] text-black font-bold px-4 py-1.5 rounded-full hover:bg-[#c5a059] transition">
                SIGN UP
              </Link>
            </>
          )}

          {/* Cart Icon */}
          <Link to="/cart" className="flex items-center gap-1.5 text-xs text-[#d4af37]">
            <svg className="w-5 h-5 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="font-bold">{cartCount} ITEMS</span>
          </Link>
        </nav>

      </div>
    </header>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ searchQuery = '', setSearchQuery, cartItems = [], setIsCartOpen }) {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b border-gray-100 gap-4">
      {/* Brand Logo */}
      <Link to="/" className="text-xl font-bold tracking-widest text-amber-950 uppercase shrink-0">
        Emma Scent &amp; MUSK
      </Link>

      {/* --- SEARCH BAR --- */}
      <div className="flex-1 max-w-sm mx-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search perfumes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            className="w-full px-4 py-1.5 pl-9 text-sm rounded-full border border-gray-300 focus:outline-none focus:border-amber-800 transition"
          />
          <span className="absolute left-3 top-2 text-gray-400 text-xs">🔍</span>
        </div>
      </div>

      {/* Navigation Links & Cart Button */}
      <div className="flex items-center gap-6 shrink-0">
        <Link to="/" className="text-gray-700 hover:text-amber-800 font-medium text-sm">Home</Link>
        <Link to="/products" className="text-gray-700 hover:text-amber-800 font-medium text-sm">Products</Link>
        <Link to="/contact" className="text-gray-700 hover:text-amber-800 font-medium text-sm">Contact</Link>
        
        {/* Cart Button with Red Badge (1, 2, 3...) */}
        <button
          onClick={() => setIsCartOpen && setIsCartOpen(true)}
          className="relative flex items-center gap-2 bg-black text-white px-3.5 py-1.5 rounded-md text-xs font-medium hover:bg-gray-800 transition"
        >
          <span>🛒 Cart</span>
          
          {cartItems.length > 0 && (
            <span className="bg-red-600 text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
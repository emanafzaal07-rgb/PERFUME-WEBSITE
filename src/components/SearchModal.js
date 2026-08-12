import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SearchModal({ isOpen, onClose, products = [] }) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  // Real-time filtering logic
  const filteredProducts = products.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-start pt-20 px-4">
      <div className="bg-[#181a1d] border border-[#2e3238] w-full max-w-2xl rounded-2xl shadow-2xl p-6 text-white space-y-4">
        
        {/* Search Header */}
        <div className="flex items-center justify-between border-b border-[#2e3238] pb-3">
          <div className="flex items-center gap-3 flex-1">
            <span className="text-gray-400">🔍</span>
            <input
              type="text"
              autoFocus
              placeholder="Search perfumes, oud, scents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-base text-[#e0d6c3] focus:outline-none placeholder-gray-500"
            />
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white text-sm bg-[#2e3238] px-3 py-1 rounded-full transition"
          >
            ✕ Close
          </button>
        </div>

        {/* Live Search Results */}
        <div className="max-h-96 overflow-y-auto space-y-3 pr-1">
          {searchTerm && filteredProducts.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-8">
              Koi perfume nahi mila matching "{searchTerm}"
            </p>
          ) : (
            filteredProducts.map((p) => (
              <div 
                key={p.id} 
                className="flex items-center justify-between bg-[#121315] p-3 rounded-xl border border-[#2e3238] hover:border-[#d4af37] transition"
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-12 h-12 object-cover rounded-lg border border-[#2e3238]" 
                  />
                  <div>
                    <p className="font-semibold text-sm text-white">{p.name}</p>
                    <p className="text-xs text-[#d4af37] font-semibold">Rs. {p.price}</p>
                  </div>
                </div>
                <Link
                  to="/products"
                  onClick={onClose}
                  className="text-xs bg-[#d4af37] text-black font-semibold px-4 py-1.5 rounded-lg hover:bg-[#c5a059] transition"
                >
                  View
                </Link>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
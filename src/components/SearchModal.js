import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DEFAULT_PRODUCTS = [
  { id: "1", name: "Musk silk", price: "2700", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=300" },
  { id: "2", name: "Aurum Noir", price: "4500", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=300" },
  { id: "3", name: "Chanel N°5", price: "3800", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=300" },
  { id: "4", name: "Honey Oud", price: "5200", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=300" },
  { id: "5", name: "Oud Al Noor", price: "6000", image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=300" },
  { id: "6", name: "Black Opium", price: "4800", image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=300" },
  { id: "7", name: "Sauvage Elixir", price: "5500", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=300" },
  { id: "8", name: "Tom Ford Velvet", price: "6200", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=300" }
];

export default function SearchModal({ isOpen, onClose, products = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null;

  // Merge database products + local fallback list
  const safePassedProducts = Array.isArray(products) ? products : [];
  const combinedProducts = [...safePassedProducts, ...DEFAULT_PRODUCTS];

  // Remove duplicates
  const uniqueProducts = combinedProducts.filter(
    (item, index, self) =>
      index === self.findIndex((p) => p.id === item.id || (p.name && item.name && p.name.toLowerCase() === item.name.toLowerCase()))
  );

  const query = searchTerm.toLowerCase().trim();

  // Search logic for name, title, or description
  const filteredProducts = query === "" 
    ? [] 
    : uniqueProducts.filter((item) => {
        const itemTitle = (item.name || item.title || "").toLowerCase();
        const itemDesc = (item.description || "").toLowerCase();
        return itemTitle.includes(query) || itemDesc.includes(query);
      });

  const handleSelectProduct = (id) => {
    onClose();
    setSearchTerm("");
    navigate(`/products#${id}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div className="bg-[#141619] border border-[#2a261e] rounded-2xl w-full max-w-xl p-5 shadow-2xl space-y-4">
        
        {/* Search Header */}
        <div className="flex items-center gap-3 pb-3 border-b border-[#2a261e]">
          <svg className="w-5 h-5 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          <input
            type="text"
            placeholder="Search perfumes (e.g. Musk, Chanel, Oud, Black)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm font-sans"
          />

          <button
            onClick={() => {
              setSearchTerm("");
              onClose();
            }}
            className="text-gray-400 hover:text-white hover:bg-[#2a261e] p-1.5 rounded-full transition-colors flex items-center justify-center"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto space-y-2">
          {query === "" ? (
            <p className="text-center text-xs text-gray-500 py-6">
              Type perfume name to search...
            </p>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product, idx) => (
              <div
                key={product.id || idx}
                onClick={() => handleSelectProduct(product.id)}
                className="flex items-center justify-between p-3 rounded-xl border border-[#2a261e] bg-[#090a0b] hover:border-[#d4af37]/60 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image || "https://via.placeholder.com/150"}
                    alt={product.name || product.title}
                    className="w-12 h-12 object-cover rounded-lg border border-[#2a261e]"
                  />
                  <div>
                    <h4 className="text-sm font-medium text-white">{product.name || product.title}</h4>
                    <p className="text-xs text-[#d4af37] font-semibold">Rs. {product.price}</p>
                  </div>
                </div>
                <button className="bg-[#d4af37] text-black text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-[#c5a059] transition">
                  View
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-xs text-gray-400 py-6">
              No products found for "{searchTerm}".
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
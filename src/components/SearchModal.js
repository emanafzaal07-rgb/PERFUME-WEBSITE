import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function SearchModal({ isOpen, onClose, onSelectProduct }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);

  // Firestore se live products fetch karna
  useEffect(() => {
    if (!isOpen) return;
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
    });
    return () => unsubscribe();
  }, [isOpen]);

  // Search logic
  const filteredProducts = searchTerm.trim() === "" 
    ? [] 
    : products.filter((p) => {
        const name = (p.name || p.title || "").toLowerCase();
        const cat = (p.category || "").toLowerCase();
        const term = searchTerm.toLowerCase();
        return name.includes(term) || cat.includes(term);
      });

  // Suggestions logic (Matching names)
  const suggestions = searchTerm.trim() === ""
    ? []
    : Array.from(
        new Set(
          filteredProducts.map((p) => (p.name || p.title || "").toLowerCase())
        )
      ).slice(0, 3);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex justify-center pt-8 md:pt-14 px-4 font-sans text-left">
      <div className="w-full max-w-lg bg-[#141414] text-white rounded-2xl border border-[#d4af37]/30 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Top Search Input Bar */}
        <div className="p-4 border-b border-[#d4af37]/20 flex items-center justify-between gap-3 bg-black/60">
          <div className="flex-1 relative flex items-center">
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search fragrances, notes..."
              className="w-full bg-black border border-[#d4af37]/40 rounded-full py-2.5 pl-4 pr-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
            />
            <svg
              className="w-5 h-5 absolute right-3 text-[#d4af37]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition text-lg"
          >
            ✕
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 overflow-y-auto space-y-5 flex-1">
          {searchTerm.trim() === "" ? (
            <div className="text-center py-10 text-gray-500 text-xs tracking-widest uppercase">
              Type product name to search...
            </div>
          ) : (
            <>
              {/* SUGGESTIONS Section */}
              {suggestions.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-extrabold text-[#d4af37] uppercase tracking-widest mb-2">
                    SUGGESTIONS
                  </h4>
                  <div className="space-y-1">
                    {suggestions.map((sugg, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSearchTerm(sugg)}
                        className="bg-black/40 hover:bg-[#d4af37]/15 p-2 rounded-lg text-xs font-semibold cursor-pointer text-gray-300 hover:text-[#d4af37] transition capitalize"
                      >
                        {sugg}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PRODUCTS Section */}
              <div>
                <h4 className="text-[11px] font-extrabold text-[#d4af37] uppercase tracking-widest mb-3">
                  PRODUCTS ({filteredProducts.length})
                </h4>

                {filteredProducts.length === 0 ? (
                  <p className="text-xs text-gray-500 py-6 text-center">
                    No products found matching "{searchTerm}"
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    {filteredProducts.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          if (onSelectProduct) onSelectProduct(prod);
                          onClose();
                        }}
                        className="flex items-center gap-3.5 p-2 rounded-xl bg-black/40 hover:bg-[#d4af37]/10 border border-transparent hover:border-[#d4af37]/40 cursor-pointer transition"
                      >
                        <img
                          src={prod.image || (Array.isArray(prod.gallery) && prod.gallery[0]) || "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600"}
                          alt={prod.name}
                          className="w-14 h-14 object-cover rounded-lg bg-black border border-[#d4af37]/20 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-sm font-bold text-white uppercase truncate">
                            {prod.name || prod.title}
                          </h5>
                          <p className="text-[11px] text-gray-400">
                            {prod.category || "EMMA SCENTS"}
                          </p>
                          <p className="text-xs font-extrabold text-[#d4af37] mt-0.5">
                            Rs.{prod.price?.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer Link */}
        {searchTerm.trim() !== "" && filteredProducts.length > 0 && (
          <div className="p-3 bg-black/90 border-t border-[#d4af37]/20 text-center">
            <button
              onClick={onClose}
              className="text-xs font-extrabold text-[#d4af37] hover:underline uppercase tracking-wider"
            >
              Show all results for "{searchTerm}" →
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
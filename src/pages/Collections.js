import React from "react";
import ProductList from "../components/ProductList";

export default function Collections({ addToCart }) {
  return (
    <div className="bg-[#090a0b] text-[#e0d6c3] min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <span className="text-[#d4af37] text-xs font-serif uppercase tracking-[0.3em]">
            ✦ Exclusive Line
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-white tracking-wide">
            Fragrance Collections
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto font-light">
            Explore our curated range of luxury oud, floral extractions, and signature scents.
          </p>
        </div>
        <ProductList addToCart={addToCart} />
      </div>
    </div>
  );
}
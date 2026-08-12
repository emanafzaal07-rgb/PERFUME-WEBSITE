import React from "react";

export default function About() {
  return (
    <div className="bg-[#090a0b] text-[#e0d6c3] min-h-screen py-16 px-6 flex items-center justify-center">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <span className="text-[#d4af37] text-xs font-serif uppercase tracking-[0.3em]">
          ✦ Our Heritage
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-white tracking-wide">
          About Scentoria
        </h1>
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-light">
          Crafted from rare aged agarwood and precious botanical essences, Scentoria offers unparalleled longevity and deep complexity. Experience luxury in every spray.
        </p>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import heroImage from "../assets/homepage-perfume.png";
import ProductList from "./productList";
import Cart from "./Cart";
import "./Home.css";

function Home({
  addToCart,
  cartItems = [],
  setCartItems,
  isCartOpen,
  setIsCartOpen,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  // Tab Title Update
  useEffect(() => {
    document.title = "OUD AL NOOR | Luxury Fragrances & Perfumes";
  }, []);

  return (
    <div className="home bg-[#000000] min-h-screen text-[#f4efe6]">
      {/* Top Navigation Bar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartItems={cartItems}
        setIsCartOpen={setIsCartOpen}
      />

      {/* Hero Section */}
      <section className="hero-section relative bg-[#090a0b] px-6 lg:px-16 py-12 lg:py-20 overflow-hidden border-b border-[#2a261e]/50">
        
        {/* Soft Glow Ambient Background */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-[#d4af37]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Minimalist Gold Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 text-[#d4af37] text-[10px] font-serif tracking-[0.3em] uppercase">
              <span>✦</span> Royal Essence
            </div>
            
            {/* Main Title */}
            <h1 className="hero-heading text-5xl sm:text-6xl lg:text-7xl font-serif text-[#ffffff] tracking-wide leading-[1.1] my-2">
              Luxury in every <br />
              <span 
                style={{ 
                  fontFamily: "'Times New Roman', Times, serif", 
                  color: "#d4af37", 
                  fontStyle: "italic",
                  textTransform: "capitalize",
                  display: "inline-block",
                  marginTop: "6px"
                }}
              >
                Spray
              </span>
            </h1>

            {/* Description */}
            <p className="text-[#b8af9e] text-sm sm:text-base leading-relaxed max-w-lg font-light tracking-wide pt-1 opacity-90">
              Crafted from the rarest aged oud and precious botanical essences,
              OUD AL NOOR perfumes offer unparalleled longevity and deep
              complexity. Experience fragrances that define sophistication.
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <Link 
                to="/products"
                className="bg-[#d4af37] text-black font-serif text-xs font-semibold px-8 py-3.5 rounded-full tracking-widest uppercase hover:bg-[#c5a059] transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.25)] hover:scale-105"
              >
                Shop Collection
              </Link>
              
              <Link 
                to="/contact"
                className="border border-[#4a3f2c] text-[#e0d6c3] font-serif text-xs px-7 py-3.5 rounded-full tracking-widest uppercase hover:border-[#d4af37] hover:text-[#d4af37] transition-all duration-300"
              >
                Explore Oud
              </Link>
            </div>

          </div>

          {/* Right Hero Image */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="hero-image-wrapper w-full max-w-xl">
              <img
                src={heroImage}
                alt="Luxury Perfume Collection"
                className="hero-full-img w-full h-auto max-h-[580px] object-cover rounded-xl"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Bottom Product Section */}
      <section className="product-section-marble py-16 px-6 relative">
        <div className="relative z-10 max-w-7xl mx-auto">
          <ProductList searchQuery={searchQuery} addToCart={addToCart} />
        </div>
      </section>

      {/* Cart Drawer */}
      <Cart
        cartItems={cartItems}
        setCartItems={setCartItems}
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
      />

      {/* Footer */}
      <footer className="bg-[#060607] text-[#736a5c] py-6 text-center border-t border-[#1a1c20] text-xs tracking-widest uppercase font-serif">
        <p>&copy; {new Date().getFullYear()} OUD AL NOOR. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
import React from "react";
import { Link } from "react-router-dom";
import ProductList from "./productList";
import Cart from "./Cart";

const HERO_IMAGE_URL = "https://img.freepik.com/premium-vector/bottle-perfume-with-gold-ribbons-top_889056-186003.jpg";

function Home({
  addToCart,
  cartItems = [],
  setCartItems,
  isCartOpen,
  setIsCartOpen,
}) {
  return (
    <div className="home bg-[#090a0b] min-h-screen text-[#f4efe6]">
      {/* Hero Section */}
      <section className="relative bg-[#090a0b] px-6 lg:px-16 py-12 lg:py-20 overflow-hidden border-b border-[#1f1d19]">
        
        {/* Glow */}
        <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-[#d4af37]/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 text-[#d4af37] text-[10px] font-serif tracking-[0.25em] uppercase">
              ✦ ROYAL ESSENCE
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-white tracking-wide leading-[1.15]">
              Luxury in every <br />
              <span className="text-[#d4af37] font-serif italic capitalize">
                Spray
              </span>
            </h1>

            <p className="text-[#b8af9e] text-sm sm:text-base leading-relaxed max-w-lg font-light tracking-wide opacity-90">
              Crafted from the rarest aged oud and precious botanical essences,
              EMMA SCENTS & SECRETS perfumes offer unparalleled longevity and
              deep complexity. Experience fragrances that define sophistication.
            </p>

            <div className="pt-3 flex flex-wrap gap-4 items-center">
              <Link 
                to="/collections"
                className="bg-[#d4af37] text-black font-serif text-xs font-bold px-8 py-3.5 rounded-full tracking-widest uppercase hover:bg-[#c5a059] transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                SHOP COLLECTION
              </Link>
              
            </div>
          </div>

          {/* Right Perfume Image */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-xl rounded-2xl overflow-hidden border border-[#2a261e] shadow-2xl bg-[#141619]">
              <img
                src={HERO_IMAGE_URL}
                alt="Luxury Perfumes Collection"
                className="w-full h-[400px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Product Section */}
      <section className="bg-[#f0eae1] py-16 px-6 text-black">
        <div className="max-w-7xl mx-auto">
          <ProductList addToCart={addToCart} />
        </div>
      </section>

      {/* Cart */}
      <Cart
        cartItems={cartItems}
        setCartItems={setCartItems}
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
      />
    </div>
  );
}

export default Home;
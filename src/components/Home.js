import React, { useState } from "react";
import Navbar from "./Navbar";
import heroImage from "../assets/homepage-perfume.png";
import ProductList from "./productList";
import Cart from "./Cart";
import "./Home.css";

function Home({ addToCart, cartItems = [], setCartItems, isCartOpen, setIsCartOpen }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="home">
      {/* Navbar ko cartItems aur setIsCartOpen pass kiya */}
      <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        cartItems={cartItems}
        setIsCartOpen={setIsCartOpen}
      />
      
      <section className="hero">
        <div className="hero__text">
          <p className="hero__eyebrow">Eau de Parfum Collection</p>
          <h1 className="hero__title">
            A Scent for Every <span>Story</span>
          </h1>
          <p className="hero__subtitle">
            Long-lasting, luxury fragrances crafted from rare ingredients.
          </p>
        </div>
        <div className="hero__image">
          <img src={heroImage} alt="Perfume bottle" />
        </div>
      </section>

      <ProductList searchQuery={searchQuery} addToCart={addToCart} /> 

      <Cart 
        cartItems={cartItems} 
        setCartItems={setCartItems} 
        isOpen={isCartOpen} 
        setIsOpen={setIsCartOpen} 
      />

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Emma scent &amp; MUSK. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
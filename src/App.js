import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";

import Navbar from "./components/Navbar";
import SearchModal from "./components/SearchModal";
import Home from "./components/Home";
import ProductList from "./components/productList"; 
import Collections from "./components/Collections";
import About from "./components/About";
import Contact from "./components/Contact";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Cart from "./components/Cart";
import PrivacyPolicy from "./components/PrivacyPolicy";
import AdminOrders from "./components/AdminOrders";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
    });
    return () => unsubscribe();
  }, []);

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
    setToastMessage(`✓ Added ${product.name}`);
    setTimeout(() => setToastMessage(""), 2500);
  };

  return (
    <BrowserRouter>
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        products={products} 
      />

      <Navbar 
        user={user} 
        cartCount={cartItems.length} 
        onSearchClick={() => setIsSearchOpen(true)} 
      />

      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-black/90 text-white text-xs px-3 py-2 rounded-md shadow-lg flex items-center gap-1.5 transition-all">
          <span className="text-green-400 font-bold">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              cartItems={cartItems} 
              setCartItems={setCartItems} 
              addToCart={addToCart}
              isCartOpen={isCartOpen}
              setIsCartOpen={setIsCartOpen}
            />
          } 
        />
        <Route path="/collections" element={<Collections />} />
        <Route path="/products" element={<ProductList addToCart={addToCart} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<AdminOrders />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route 
          path="/cart" 
          element={
            <Cart 
              cartItems={cartItems} 
              setCartItems={setCartItems} 
              isOpen={true} 
              setIsOpen={setIsCartOpen} 
            />
          } 
        />          
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
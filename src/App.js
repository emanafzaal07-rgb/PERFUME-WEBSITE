import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";

// Components
import Navbar from "./components/Navbar";
import SearchModal from "./components/SearchModal";
import ProductDetailModal from "./components/ProductDetailModal";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

// Pages
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivacyPolicy from "./pages/PrivacyPolicy";

import AdminOrders from "./Admin/AdminOrders";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

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
    setToastMessage(`✓ Added ${product.name || product.title}`);
    setTimeout(() => setToastMessage(""), 2500);
  };

  const handleOpenDetail = (product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  return (
    <BrowserRouter>
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        products={products}
        onSelectProduct={handleOpenDetail}
      />

      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        addToCart={addToCart}
      />

      <Navbar 
        user={user} 
        cartCount={cartItems.length} 
        onSearchClick={() => setIsSearchOpen(true)} 
      />

      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#121212] text-white text-xs px-4 py-2.5 rounded-lg shadow-2xl flex items-center gap-2 border border-[#d4af37]">
          <span className="text-[#d4af37] font-bold">✓</span>
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
              onViewProduct={handleOpenDetail}
            />
          } 
        />
        <Route path="/collections" element={<Collections onViewProduct={handleOpenDetail} />} />
        <Route 
          path="/products" 
          element={
            <ProductList 
              addToCart={addToCart} 
              onViewProduct={handleOpenDetail} 
            />
          } 
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
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
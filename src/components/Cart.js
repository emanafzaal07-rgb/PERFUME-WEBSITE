import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Cart({
  cartItems = [],
  setCartItems,
  isOpen = true,
  setIsOpen,
}) {
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "" });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  // 1. Total Price Calculate
  const subtotal = cartItems.reduce((acc, item) => {
    const price = typeof item.price === "number" ? item.price : parseFloat(item.price) || 0;
    return acc + price;
  }, 0);

  // 2. Navigation Handlers (Fixes non-working buttons)
  const handleClose = () => {
    if (setIsOpen) setIsOpen(false);
    navigate("/");
  };

  const handleContinueShopping = () => {
    if (setIsOpen) setIsOpen(false);
    navigate("/products");
  };

  // 3. Place Order in Firestore
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!customer.name || !customer.phone || !customer.address) {
      alert("Please fill in all details!");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "orders"), {
        customerName: customer.name,
        phone: customer.phone,
        address: customer.address,
        items: cartItems,
        totalPrice: subtotal,
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      if (setCartItems) setCartItems([]);
      setOrderPlaced(true);
      setIsCheckingOut(false);
    } catch (err) {
      console.error("Order placing error:", err);
      alert("Failed to place order. Try again!");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end">
      {/* Background Overlay */}
      <div className="absolute inset-0" onClick={handleClose} />

      <div className="relative w-full max-w-md bg-[#0e0f11] text-[#e0d6c3] border-l border-[#2a261e] h-full shadow-2xl flex flex-col justify-between z-10 p-6 overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#2a261e]">
          <h2 className="text-lg font-serif text-white tracking-wide">
            Shopping Cart ({cartItems.length})
          </h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-[#1e2024] text-gray-400 hover:text-white flex items-center justify-center transition border border-[#2a261e]"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 py-6">
          {orderPlaced ? (
            /* Order Success Message */
            <div className="text-center py-12 space-y-4">
              <div className="text-4xl text-green-400">✓</div>
              <h3 className="text-xl font-serif text-white">Order Confirmed!</h3>
              <p className="text-xs text-gray-400">
                Thank you for your purchase. We will contact you soon for delivery.
              </p>
              <button
                onClick={() => {
                  setOrderPlaced(false);
                  handleClose();
                }}
                className="mt-4 bg-[#d4af37] text-black text-xs font-semibold uppercase px-6 py-2.5 rounded-full hover:bg-[#c5a059] transition"
              >
                Back to Store
              </button>
            </div>
          ) : isCheckingOut ? (
            /* Shipping Checkout Form */
            <form onSubmit={handlePlaceOrder} className="space-y-4 text-left">
              <h3 className="text-sm font-serif text-[#d4af37] uppercase tracking-wider mb-2">
                Shipping Details
              </h3>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  className="w-full bg-[#16181b] border border-[#2a261e] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  placeholder="e.g. Ali Khan"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="w-full bg-[#16181b] border border-[#2a261e] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  placeholder="0300 1234567"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Delivery Address</label>
                <textarea
                  required
                  rows={3}
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  className="w-full bg-[#16181b] border border-[#2a261e] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  placeholder="Complete shipping address"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="w-1/2 border border-[#2a261e] text-xs py-2.5 rounded text-gray-400 hover:text-white"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-1/2 bg-[#d4af37] text-black text-xs font-semibold uppercase py-2.5 rounded hover:bg-[#c5a059] transition"
                >
                  {loading ? "Placing..." : "Confirm Order"}
                </button>
              </div>
            </form>
          ) : cartItems.length === 0 ? (
            /* Empty Cart View */
            <div className="text-center py-16 space-y-4">
              <p className="text-xs text-gray-400">Your cart is currently empty.</p>
              <button
                onClick={handleContinueShopping}
                className="text-xs text-[#d4af37] border-b border-[#d4af37] pb-1 uppercase tracking-widest hover:text-[#f3e5ab] transition inline-block font-serif"
              >
                CONTINUE SHOPPING →
              </button>
            </div>
          ) : (
            /* Items List */
            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
              {cartItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-[#141619] p-3 rounded-lg border border-[#2a261e]"
                >
                  <div className="flex items-center gap-3">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded border border-[#2a261e]"
                      />
                    )}
                    <div>
                      <p className="text-xs font-semibold text-white">{item.name}</p>
                      <p className="text-xs text-[#d4af37]">Rs. {item.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const updated = cartItems.filter((_, i) => i !== idx);
                      if (setCartItems) setCartItems(updated);
                    }}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {!orderPlaced && !isCheckingOut && (
          <div className="pt-4 border-t border-[#2a261e] space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="font-serif">Subtotal</span>
              <span className="font-semibold text-[#d4af37]">Rs. {subtotal}</span>
            </div>

            <button
              disabled={cartItems.length === 0}
              onClick={() => setIsCheckingOut(true)}
              className={`w-full py-3 rounded text-xs font-semibold uppercase tracking-widest transition ${
                cartItems.length === 0
                  ? "bg-[#2a261e] text-gray-500 cursor-not-allowed"
                  : "bg-[#d4af37] text-black hover:bg-[#c5a059]"
              }`}
            >
              Checkout (Rs. {subtotal})
            </button>

            <div className="text-center pt-1">
              <button
                onClick={handleContinueShopping}
                className="text-[11px] text-[#d4af37] hover:underline uppercase tracking-wider font-serif"
              >
                or CONTINUE SHOPPING →
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
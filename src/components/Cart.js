import React, { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

export default function Cart({ cartItems = [], setCartItems, isOpen = false, setIsOpen }) {
  /* --- STATES & HANDLERS --- */
  const [step, setStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [formData, setFormData] = useState({ name: '', phone: '', city: '', address: '' });

  const subtotal = cartItems.reduce((total, item) => total + (Number(item.price) || 0), 0);

  const handleRemove = (id) => {
    if (setCartItems) setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address || !formData.city) {
      alert('Disclaimer: Please fill in all the required details!');
      return;
    }
    setStep('success');
    if (setCartItems) setCartItems([]);
  };

  const handleClose = () => {
    if (setIsOpen) setIsOpen(false);
    setTimeout(() => setStep('cart'), 300);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500 ease-in-out" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out">
              <div className="flex h-full flex-col overflow-y-auto bg-[#181a1d] text-[#e0d6c3] border-l border-[#2e3238] shadow-2xl">
                
                {/* Header */}
                <div className="px-4 py-6 sm:px-6 border-b border-[#2e3238] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {step === 'checkout' && (
                      <button 
                        onClick={() => setStep('cart')} 
                        className="text-[#d4af37] hover:text-[#c5a059] p-1 font-bold text-lg transition-colors"
                      >
                        &larr;
                      </button>
                    )}
                    <DialogTitle className="text-lg font-serif tracking-wide text-[#ffffff]">
                      {step === 'cart' && `Shopping Cart (${cartItems.length})`}
                      {step === 'checkout' && 'Shipping & Payment'}
                      {step === 'success' && 'Order Confirmed!'}
                    </DialogTitle>
                  </div>
                  <button 
                    type="button" 
                    onClick={handleClose} 
                    className="p-1 text-[#a09788] hover:text-[#ffffff] font-bold text-xl transition-colors"
                  >
                    &times;
                  </button>
                </div>

                {/* Body Content */}
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  
                  {/* STEP 1: CART LIST */}
                  {step === 'cart' && (
                    <div className="flow-root">
                      {cartItems.length === 0 ? (
                        <div className="text-center py-16 space-y-4">
                          <p className="text-[#a09788] text-sm font-light">Your cart is currently empty.</p>
                          <button 
                            onClick={handleClose} 
                            className="text-xs font-serif tracking-widest text-[#d4af37] hover:underline uppercase"
                          >
                            Continue Shopping &rarr;
                          </button>
                        </div>
                      ) : (
                        <ul role="list" className="-my-6 divide-y divide-[#2e3238]">
                          {cartItems.map((product, index) => (
                            <li key={index} className="flex py-6">
                              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-[#2e3238] bg-[#22252a]">
                                <img src={product.image} alt={product.name} className="h-full w-full object-contain p-2" />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-serif text-[#ffffff]">
                                    <h3>{product.name}</h3>
                                    <p className="ml-4 font-bold text-[#d4af37]">Rs. {product.price}</p>
                                  </div>
                                  <p className="mt-1 text-xs text-[#a09788] line-clamp-2">{product.description}</p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-[#a09788] text-xs">Qty: 1</p>
                                  <button 
                                    type="button" 
                                    onClick={() => handleRemove(product.id)} 
                                    className="font-medium text-red-400 hover:text-red-300 text-xs transition-colors"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {/* STEP 2: CHECKOUT FORM */}
                  {step === 'checkout' && (
                    <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                      <div>
                        <label className="block text-xs font-serif text-[#a09788] uppercase tracking-wider mb-1">Full Name *</label>
                        <input 
                          type="text" 
                          name="name" 
                          required 
                          placeholder="e.g. Ali Ahmed" 
                          value={formData.name} 
                          onChange={handleInputChange} 
                          className="w-full rounded-lg border border-[#383d44] bg-[#2b2e34] px-4 py-2.5 text-sm text-[#ffffff] placeholder-[#7d8590] focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37]" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-serif text-[#a09788] uppercase tracking-wider mb-1">Phone Number *</label>
                        <input 
                          type="tel" 
                          name="phone" 
                          required 
                          placeholder="0300 1234567" 
                          value={formData.phone} 
                          onChange={handleInputChange} 
                          className="w-full rounded-lg border border-[#383d44] bg-[#2b2e34] px-4 py-2.5 text-sm text-[#ffffff] placeholder-[#7d8590] focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37]" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-serif text-[#a09788] uppercase tracking-wider mb-1">City *</label>
                        <input 
                          type="text" 
                          name="city" 
                          required 
                          placeholder="e.g. Lahore, Karachi" 
                          value={formData.city} 
                          onChange={handleInputChange} 
                          className="w-full rounded-lg border border-[#383d44] bg-[#2b2e34] px-4 py-2.5 text-sm text-[#ffffff] placeholder-[#7d8590] focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37]" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-serif text-[#a09788] uppercase tracking-wider mb-1">Delivery Address *</label>
                        <textarea 
                          name="address" 
                          rows="3" 
                          required 
                          placeholder="House No, Street, Area" 
                          value={formData.address} 
                          onChange={handleInputChange} 
                          className="w-full rounded-lg border border-[#383d44] bg-[#2b2e34] px-4 py-2.5 text-sm text-[#ffffff] placeholder-[#7d8590] focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] resize-none"
                        ></textarea>
                      </div>
                      <div className="pt-2">
                        <label className="block text-xs font-serif text-[#a09788] uppercase tracking-wider mb-1">Payment Method</label>
                        <div className="p-3 border border-[#d4af37]/40 rounded-lg bg-[#d4af37]/10 flex items-center justify-between">
                          <span className="text-sm font-serif text-[#ffffff]">Cash on Delivery (COD)</span>
                          <span className="text-[10px] bg-[#d4af37] text-black px-2 py-0.5 rounded font-bold uppercase tracking-wider">Selected</span>
                        </div>
                      </div>
                    </form>
                  )}

                  {/* STEP 3: ORDER SUCCESS SCREEN */}
                  {step === 'success' && (
                    <div className="text-center py-10 space-y-4">
                      <div className="w-16 h-16 bg-[#d4af37]/20 border border-[#d4af37] text-[#d4af37] rounded-full flex items-center justify-center text-3xl font-bold mx-auto">
                        &check;
                      </div>
                      <h3 className="text-2xl font-serif text-[#ffffff]">Thank You!</h3>
                      <p className="text-[#a09788] text-sm font-light">Your order has been placed successfully.</p>
                      
                      <div className="p-4 bg-[#2b2e34] rounded-xl text-left text-xs space-y-1.5 text-[#e0d6c3] border border-[#383d44]">
                        <p><strong className="text-[#d4af37]">Name:</strong> {formData.name}</p>
                        <p><strong className="text-[#d4af37]">Phone:</strong> {formData.phone}</p>
                        <p><strong className="text-[#d4af37]">Address:</strong> {formData.address}, {formData.city}</p>
                      </div>
                    </div>
                  )}

                </div>

                {/* Footer Buttons */}
                <div className="border-t border-[#2e3238] px-4 py-6 sm:px-6 bg-[#121416]">
                  {step === 'cart' && (
                    <>
                      <div className="flex justify-between text-base font-serif text-[#ffffff]">
                        <p>Subtotal</p>
                        <p className="text-lg font-bold text-[#d4af37]">Rs. {subtotal}</p>
                      </div>
                      <div className="mt-6 space-y-3">
                        <button 
                          type="button" 
                          disabled={cartItems.length === 0} 
                          onClick={() => setStep('checkout')} 
                          className="w-full flex items-center justify-center rounded-lg bg-[#d4af37] px-6 py-3.5 text-sm font-semibold text-black shadow-lg hover:bg-[#c5a059] transition-all duration-300 disabled:opacity-40 disabled:hover:bg-[#d4af37]"
                        >
                          Checkout (Rs. {subtotal})
                        </button>
                        <div className="flex justify-center text-center text-xs text-[#a09788]">
                          <p>
                            or{' '}
                            <button 
                              type="button" 
                              onClick={handleClose} 
                              className="font-serif text-[#d4af37] hover:underline uppercase tracking-wider"
                            >
                              Continue Shopping &rarr;
                            </button>
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {step === 'checkout' && (
                    <button 
                      type="submit" 
                      form="checkout-form" 
                      className="w-full flex items-center justify-center rounded-lg bg-[#d4af37] px-6 py-3.5 text-sm font-semibold text-black shadow-lg hover:bg-[#c5a059] transition-all duration-300"
                    >
                      Confirm Order (Rs. {subtotal})
                    </button>
                  )}

                  {step === 'success' && (
                    <button 
                      type="button" 
                      onClick={handleClose} 
                      className="w-full bg-[#d4af37] text-black py-3.5 rounded-lg font-semibold text-sm hover:bg-[#c5a059] transition-all duration-300"
                    >
                      Continue Shopping
                    </button>
                  )}
                </div>

              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
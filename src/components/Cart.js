import React, { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

export default function Cart({ cartItems = [], setCartItems, isOpen = false, setIsOpen }) {
  
  /* --- 1. NEW STATES & HANDLERS --- */
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
      alert('Khabardar: Tamam details pur karein!');
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
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out">
              <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                
                {/* Header */}
                <div className="px-4 py-6 sm:px-6 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {step === 'checkout' && (
                      <button onClick={() => setStep('cart')} className="text-gray-500 hover:text-gray-800 p-1 font-bold text-lg">
                        &larr;
                      </button>
                    )}
                    <DialogTitle className="text-lg font-bold text-gray-900">
                      {step === 'cart' && `Shopping Cart (${cartItems.length})`}
                      {step === 'checkout' && 'Shipping & Payment'}
                      {step === 'success' && 'Order Confirmed!'}
                    </DialogTitle>
                  </div>
                  <button type="button" onClick={handleClose} className="p-1 text-gray-400 hover:text-gray-500 font-bold text-xl">
                    &times;
                  </button>
                </div>

                {/* Body Content */}
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  
                  {/* STEP 1: CART LIST */}
                  {step === 'cart' && (
                    <div className="flow-root">
                      {cartItems.length === 0 ? (
                        <div className="text-center py-16">
                          <p className="text-gray-500 mb-4">Aapka cart abhi khali hai.</p>
                          <button onClick={handleClose} className="text-sm font-semibold text-amber-700 hover:underline">
                            Continue Shopping &rarr;
                          </button>
                        </div>
                      ) : (
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {cartItems.map((product, index) => (
                            <li key={index} className="flex py-6">
                              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{product.name}</h3>
                                    <p className="ml-4 font-bold text-amber-800">Rs. {product.price}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">Qty 1</p>
                                  <button type="button" onClick={() => handleRemove(product.id)} className="font-medium text-red-600 hover:text-red-500">
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

                  {/* --- 2. NEW: CHECKOUT FORM --- */}
                  {step === 'checkout' && (
                    <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" name="name" required placeholder="e.g. Ali Ahmed" value={formData.name} onChange={handleInputChange} className="mt-1 w-full rounded-md border border-gray-300 p-2.5 text-sm outline-none focus:border-black" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="tel" name="phone" required placeholder="0300 1234567" value={formData.phone} onChange={handleInputChange} className="mt-1 w-full rounded-md border border-gray-300 p-2.5 text-sm outline-none focus:border-black" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">City</label>
                        <input type="text" name="city" required placeholder="e.g. Lahore, Karachi" value={formData.city} onChange={handleInputChange} className="mt-1 w-full rounded-md border border-gray-300 p-2.5 text-sm outline-none focus:border-black" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Delivery Address</label>
                        <textarea name="address" rows="3" required placeholder="House No, Street, Area" value={formData.address} onChange={handleInputChange} className="mt-1 w-full rounded-md border border-gray-300 p-2.5 text-sm outline-none focus:border-black"></textarea>
                      </div>
                      <div className="pt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                        <div className="p-3 border rounded-md bg-gray-50 flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-800">Cash on Delivery (COD)</span>
                          <span className="text-xs bg-black text-white px-2 py-1 rounded">Selected</span>
                        </div>
                      </div>
                    </form>
                  )}

                  {/* --- 3. NEW: ORDER SUCCESS SCREEN --- */}
                  {step === 'success' && (
                    <div className="text-center py-12 space-y-4">
                      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto">&check;</div>
                      <h3 className="text-2xl font-bold text-gray-900">Shukriya!</h3>
                      <p className="text-gray-600 text-sm">Aap ka order kamyabi se record ho gaya hai.</p>
                      <div className="p-4 bg-amber-50 rounded-lg text-left text-xs space-y-1 text-amber-900 border border-amber-200">
                        <p><strong>Name:</strong> {formData.name}</p>
                        <p><strong>Phone:</strong> {formData.phone}</p>
                        <p><strong>Address:</strong> {formData.address}, {formData.city}</p>
                      </div>
                    </div>
                  )}

                </div>

                {/* Footer Buttons */}
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  {step === 'cart' && (
                    <>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p className="text-lg font-bold text-amber-800">Rs. {subtotal}</p>
                      </div>
                      <div className="mt-6 space-y-3">
                        <button type="button" disabled={cartItems.length === 0} onClick={() => setStep('checkout')} className="w-full flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 disabled:bg-gray-300">
                          Checkout (Rs. {subtotal})
                        </button>
                        <div className="flex justify-center text-center text-sm text-gray-500">
                          <p>or <button type="button" onClick={handleClose} className="font-semibold text-amber-700 hover:text-amber-800">Continue Shopping &rarr;</button></p>
                        </div>
                      </div>
                    </>
                  )}

                  {step === 'checkout' && (
                    <button type="submit" form="checkout-form" className="w-full flex items-center justify-center rounded-md border border-transparent bg-amber-700 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-amber-800">
                      Confirm Order (Rs. {subtotal})
                    </button>
                  )}

                  {step === 'success' && (
                    <button type="button" onClick={handleClose} className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800">
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
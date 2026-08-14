import React, { useState, useEffect } from "react";

export default function ProductDetailModal({ product, isOpen, onClose, addToCart }) {
  const [selectedVariant, setSelectedVariant] = useState("50ml");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    if (product) {
      setSelectedVariant("50ml");
      setQuantity(1);
      setActiveImage(product.image || "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600");
    }
  }, [product]);

  if (!isOpen || !product) return null;

  // Prices calculation
  const originalPrice = selectedVariant === "15ml" ? 1890 : Number(product.originalPrice || 4290);
  const salePrice = selectedVariant === "15ml" ? 1540 : Number(product.price || 3690);
  const discountPercent = originalPrice > salePrice
    ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
    : 0;

  // Gallery Thumbnails
  const images = product.gallery || [
    product.image || "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600",
    "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=600",
    "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600"
  ];

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedVariant,
      price: salePrice,
      quantity
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#141619] rounded-2xl max-w-4xl w-full p-6 relative shadow-2xl my-8 border border-[#2a261e] text-[#e0d6c3]">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#b8af9e] hover:text-white bg-[#1e2024] p-2 rounded-full transition z-10 border border-[#2a261e]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

          {/* Left: Thumbnails + Main Image */}
          <div className="md:col-span-7 flex gap-3">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition ${
                    activeImage === img ? "border-[#d4af37]" : "border-[#2a261e]"
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 bg-[#0e0f11] rounded-xl overflow-hidden relative border border-[#2a261e] h-[380px] flex items-center justify-center">
              {discountPercent > 0 && (
                <span className="absolute top-3 left-3 bg-[#d4af37] text-black text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                  Sale {discountPercent}% Off
                </span>
              )}
              <img src={activeImage} alt={product.name} className="max-h-full max-w-full object-contain p-4" />
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="md:col-span-5 space-y-4 text-left">
            <div>
              <h2 className="text-2xl font-serif uppercase tracking-wider text-white">{product.name}</h2>

              {/* Stars & Category */}
              <div className="flex items-center gap-2 mt-1">
                <div className="flex text-[#d4af37] text-sm">★★★★★</div>
                <span className="text-xs text-[#a09788] font-medium">67 Reviews</span>
              </div>
              <p className="text-xs text-[#a09788] mt-1 font-medium">{product.category || "Poetic Range"}</p>
            </div>

            {/* Variants Selector */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setSelectedVariant("50ml")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold border transition ${
                  selectedVariant === "50ml"
                    ? "border-[#d4af37] bg-[#d4af37] text-black"
                    : "border-[#2e3238] text-[#b8af9e] hover:border-[#d4af37]"
                }`}
              >
                Perfume Spray (50ml)
              </button>
              <button
                onClick={() => setSelectedVariant("15ml")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold border transition ${
                  selectedVariant === "15ml"
                    ? "border-[#d4af37] bg-[#d4af37] text-black"
                    : "border-[#2e3238] text-[#b8af9e] hover:border-[#d4af37]"
                }`}
              >
                Pocket Perfume - (15ml)
              </button>
            </div>

            {/* Pricing */}
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xl font-bold text-[#d4af37]">Rs.{salePrice.toLocaleString()}</span>
              <span className="text-sm text-[#6f6a60] line-through">Rs.{originalPrice.toLocaleString()}</span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center border border-[#2e3238] rounded-md w-28 text-sm bg-[#0e0f11]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 text-[#b8af9e] hover:text-[#d4af37] font-bold"
              >
                -
              </button>
              <span className="flex-1 text-center font-semibold text-white">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1.5 text-[#b8af9e] hover:text-[#d4af37] font-bold"
              >
                +
              </button>
            </div>

            {/* Trust Features */}
            <ul className="text-xs text-[#b8af9e] space-y-1.5 pt-2 border-t border-[#2a261e]">
              <li className="flex items-center gap-2">🛡️ 15 Days Easy Returns</li>
              <li className="flex items-center gap-2">🎁 Free gift card with all products</li>
              <li className="flex items-center gap-2">🏆 Award Winning Fragrance Brand</li>
            </ul>

            {/* Add To Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#d4af37] hover:bg-[#c5a059] text-black font-bold py-3.5 rounded-lg text-sm uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              Add to cart
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

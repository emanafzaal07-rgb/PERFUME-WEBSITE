import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

// Existing Perfume Imports
import product1 from "../assets/aurum-noir.png"; 
import product2 from "../assets/chanel.png"; 
import product3 from "../assets/honey.png"; 
import product4 from "../assets/vanila.png"; 

// New Bella Vita Imports
import product5 from "../assets/bella-vita-black.png";
import product6 from "../assets/bella-vita-blue.png";
import product7 from "../assets/bella-vita-purple.png";
import product8 from "../assets/bella-vita-white.png";

// Exact 8 Items Local Array
const localItemsArray = [ 
  { 
    id: "1", 
    name: "Musk Silk", 
    category: "Musk Range",
    price: 2700,
    originalPrice: 3100,
    reviews: 65,
    image: product1, 
    description: "Pure subtle royal musk scent" 
  }, 
  { 
    id: "2", 
    name: "Aurum Noir", 
    category: "Poetic Range",
    price: 4500,
    originalPrice: 5200,
    reviews: 120,
    image: product2, 
    description: "Long lasting luxury perfume" 
  }, 
  { 
    id: "3", 
    name: "Chanel",
    category: "Executive Range",
    price: 3800,
    originalPrice: 4500,
    reviews: 85,
    image: product3, 
    description: "Fresh and energetic fragrance" 
  }, 
  { 
    id: "4",
    name: "Honey",
    category: "Sensory Range",
    price: 5200,
    originalPrice: 6000,
    reviews: 210,
    image: product4,
    description: "Deep, sweet & woody scent" 
  },
  { 
    id: "5",
    name: "Bella Vita Noir",
    category: "Poetic Range",
    price: 4200,
    originalPrice: 4900,
    reviews: 142,
    image: product5,
    description: "Intense dark aromatic EDP" 
  },
  { 
    id: "6",
    name: "Bella Vita Ocean",
    category: "Executive Range",
    price: 3900,
    originalPrice: 4600,
    reviews: 78,
    image: product6,
    description: "Refreshing aquatic splash fragrance" 
  },
  { 
    id: "7",
    name: "Bella Vita Luxury",
    category: "Sensory Range",
    price: 4800,
    originalPrice: 5500,
    reviews: 164,
    image: product7,
    description: "Elegant floral & fruity notes" 
  },
  { 
    id: "8",
    name: "Bella Vita White",
    category: "Royal Range",
    price: 4100,
    originalPrice: 4800,
    reviews: 112,
    image: product8,
    description: "Pure subtle royal musk scent" 
  }
]; 

function ProductList({ searchQuery, addToCart }) {
  const [products, setProducts] = useState(localItemsArray);
  
  // Modal States
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState("50ml");
  const [quantity, setQuantity] = useState(1);

  // Firestore Products Sync
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        const firestoreProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (firestoreProducts.length > 0) {
          setProducts([...firestoreProducts, ...localItemsArray]);
        } else {
          setProducts(localItemsArray);
        }
      },
      (error) => {
        console.error("Firebase Fetch Error:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  // Filter Search
  const filteredProducts = products.filter((product) =>
    (product.name || "").toLowerCase().includes((searchQuery || "").toLowerCase())
  );

  // Modal Handlers
  const openModal = (product) => {
    setSelectedProduct(product);
    setSelectedVariant("50ml");
    setQuantity(1);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleModalAddToCart = () => {
    if (!selectedProduct) return;
    
    const finalPrice = selectedVariant === "15ml" 
      ? Math.round((selectedProduct.price || 3000) * 0.45) 
      : (selectedProduct.price || 3000);

    addToCart && addToCart({
      ...selectedProduct,
      selectedVariant,
      price: finalPrice,
      quantity
    });

    closeModal();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-white">
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => {
            const salePrice = Number(product.price) || 0;
            const originalPrice = product.originalPrice || Math.round(salePrice * 1.18);
            const reviewsCount = product.reviews || 65;
            const categoryName = product.category || "Poetic Range";

            return (
              <div
                key={product.id || index}
                className="group relative bg-[#f9f9f9] border border-gray-200 rounded-xl overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300"
              >
                {/* Product Image Box (Clickable) */}
                <div 
                  onClick={() => openModal(product)}
                  className="relative h-60 bg-white p-4 flex items-center justify-center overflow-hidden cursor-pointer"
                >
                  <span className="absolute top-2.5 left-2.5 bg-[#cc0000] text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider z-10">
                    SALE
                  </span>

                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-500"
                  />
                </div>

                {/* Product Info (Clickable Title) */}
                <div className="p-4 text-left bg-white flex-1 flex flex-col justify-between border-t border-gray-100">
                  <div>
                    <h3
                      onClick={() => openModal(product)}
                      className="font-bold text-sm text-gray-900 cursor-pointer hover:text-[#cc0000] transition truncate uppercase tracking-tight"
                    >
                      {product.name}
                    </h3>

                    <p className="text-[11px] text-gray-400 font-medium mt-0.5">{categoryName}</p>

                    <div className="flex items-center gap-1 mt-1.5">
                      <div className="flex text-amber-400 text-xs">★★★★★</div>
                      <span className="text-[10px] text-gray-500 font-semibold">{reviewsCount} Reviews</span>
                    </div>
                  </div>

                  <div className="pt-3 mt-2 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-gray-400 text-[10px]">from</span>
                      <span className="text-[#cc0000] font-bold text-sm">Rs.{salePrice.toLocaleString()}</span>
                      <span className="text-gray-400 line-through text-xs font-normal">Rs.{originalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => openModal(product)}
                    className="w-full mt-3 bg-[#0d0d0d] hover:bg-[#cc0000] text-white text-xs font-bold py-2.5 rounded-lg uppercase tracking-wider transition duration-200"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Not Available</h2>
          <p className="text-xs">Aap jo perfume dhoond rahe hain wo filhal hamare paas nahi hai.</p>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 💥 POPUP DETAIL MODAL (SCENTS N STORIES STYLE) 💥 */}
      {/* ------------------------------------------------------------------- */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 relative shadow-2xl text-gray-800 my-8">
            
            {/* Close Cross Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-black bg-gray-100 p-2 rounded-full transition z-10"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Product Image */}
              <div className="md:col-span-6 bg-gray-50 rounded-xl p-6 h-80 flex items-center justify-center relative border border-gray-100">
                <span className="absolute top-3 left-3 bg-[#cc0000] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  SALE
                </span>
                <img src={selectedProduct.image} alt={selectedProduct.name} className="max-h-full max-w-full object-contain" />
              </div>

              {/* Product Controls */}
              <div className="md:col-span-6 text-left space-y-4">
                <div>
                  <h2 className="text-2xl font-bold uppercase tracking-wider text-black">{selectedProduct.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex text-amber-400 text-sm">★★★★★</div>
                    <span className="text-xs text-gray-500 font-medium">{selectedProduct.reviews || 65} Reviews</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 font-medium">{selectedProduct.category || "Poetic Range"}</p>
                </div>

                {/* Variant Selector */}
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => setSelectedVariant("50ml")}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold border transition ${
                      selectedVariant === "50ml"
                        ? "border-black bg-black text-white"
                        : "border-gray-300 text-gray-700 hover:border-black"
                    }`}
                  >
                    Perfume Spray (50ml)
                  </button>
                  <button
                    onClick={() => setSelectedVariant("15ml")}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold border transition ${
                      selectedVariant === "15ml"
                        ? "border-black bg-black text-white"
                        : "border-gray-300 text-gray-700 hover:border-black"
                    }`}
                  >
                    Pocket Perfume (15ml)
                  </button>
                </div>

                {/* Dynamic Price */}
                <div className="flex items-center gap-3 pt-1">
                  <span className="text-xl font-bold text-[#cc0000]">
                    Rs.{selectedVariant === "15ml" ? Math.round(selectedProduct.price * 0.45).toLocaleString() : selectedProduct.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    Rs.{selectedVariant === "15ml" ? Math.round(selectedProduct.price * 0.55).toLocaleString() : (selectedProduct.originalPrice || Math.round(selectedProduct.price * 1.18)).toLocaleString()}
                  </span>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center border border-gray-300 rounded-md w-28 text-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 font-bold"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleModalAddToCart}
                  className="w-full bg-[#cc0000] hover:bg-black text-white font-bold py-3 rounded-lg text-xs uppercase tracking-wider transition shadow-md"
                >
                  ADD TO CART
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ProductList;
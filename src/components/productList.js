import React, { useState, useEffect } from "react";

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

// Aap ka exact 8 Items ka Local Array
const localItemsArray = [ 
  { 
    id: 1, 
    name: "Aurum Noir", 
    price: 4500,
    image: product1, 
    description: "Long lasting luxury perfume" 
  }, 
  { 
    id: 2, 
    name: "Chanel",
    price: 3800,
    image: product2, 
    description: "Fresh and energetic fragrance" 
  }, 
  { 
    id: 3,
    name: "Honey",
    price: 5200,
    image: product3,
    description: "Deep, sweet & woody scent" 
  },
  { 
    id: 4,
    name: "Vanila",
    price: 9500,
    image: product4,
    description: "Premium fresh aromatic perfume" 
  },
  { 
    id: 5,
    name: "Bella Vita Noir",
    price: 4200,
    image: product5,
    description: "Intense dark aromatic EDP" 
  },
  { 
    id: 6,
    name: "Bella Vita Ocean",
    price: 3900,
    image: product6,
    description: "Refreshing aquatic splash fragrance" 
  },
  { 
    id: 7,
    name: "Bella Vita Luxury",
    price: 4800,
    image: product7,
    description: "Elegant floral & fruity notes" 
  },
  { 
    id: 8,
    name: "Bella Vita White",
    price: 4100,
    image: product8,
    description: "Pure subtle royal musk scent" 
  }
]; 

function ProductList({ searchQuery, addToCart }) {
  const [products, setProducts] = useState(localItemsArray);

  // -------------------------------------------------------------------
  // 👇 YAHAN YEH EFFECT CODE LAGAYA HAI JO BACKEND DATA KO CHECK KAREGA 👇
  // -------------------------------------------------------------------
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("Backend Response:", data);
        const backendProducts = Array.isArray(data) ? data : (data.products || []);
        if (backendProducts.length > 0) {
          setProducts([...backendProducts, ...localItemsArray]);
        }
      })
      .catch((err) => console.error("Backend Connection Error:", err));
  }, []);

  // Search filter implementation
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes((searchQuery || "").toLowerCase())
  );

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1280px", margin: "0 auto" }}>
      {filteredProducts.length > 0 ? (
        /* CSS Grid: Exact 4 Columns per Row with proper gap */
        <div 
          style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", 
            gap: "24px", 
            justifyContent: "center" 
          }}
        >
          {filteredProducts.map((product, index) => (
            <div 
              key={product._id || product.id || index} 
              style={{ 
                backgroundColor: "#ffffff", 
                borderRadius: "12px", 
                padding: "20px 16px", 
                textAlign: "center",
                boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "transform 0.2s ease-in-out"
              }}
            >
              {/* Image Container */}
              <div style={{ width: "100%", height: "200px", marginBottom: "12px", overflow: "hidden", borderRadius: "6px" }}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                />
              </div>

              {/* Text Details */}
              <div style={{ width: "100%", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h3 style={{ 
                  fontFamily: "'Playfair Display', serif", 
                  fontSize: "18px", 
                  color: "#1a1a1a", 
                  margin: "6px 0 4px 0",
                  fontWeight: "600"
                }}>
                  {product.name}
                </h3>

                <p style={{ 
                  color: "#777777", 
                  fontSize: "13px", 
                  margin: "0 0 8px 0", 
                  fontStyle: "italic",
                  lineHeight: "1.4"
                }}>
                  {product.description}
                </p>

                <strong style={{ 
                  color: "#c5a059", 
                  fontSize: "15px", 
                  fontFamily: "serif",
                  display: "block",
                  marginBottom: "14px"
                }}>
                  Rs. {product.price}
                </strong>
              </div>

              {/* Add to Cart Button */}
              <button 
                onClick={() => addToCart && addToCart(product)}
                style={{ 
                  width: "100%", 
                  backgroundColor: "#0d0d0d", 
                  color: "#ffffff", 
                  padding: "10px", 
                  border: "none", 
                  borderRadius: "6px", 
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "14px",
                  letterSpacing: "0.5px"
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#777" }}>
          <h2 style={{ fontSize: "28px", marginBottom: "10px", color: "#111" }}>Not Available</h2>
          <p>Aap jo perfume dhoond rahe hain wo filhal hamare paas nahi hai.</p>
        </div>
      )}
    </div>
  );
}

export default ProductList;
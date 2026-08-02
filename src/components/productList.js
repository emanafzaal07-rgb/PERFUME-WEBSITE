import React from "react";
import product1 from "../assets/oud.png"; 
import product2 from "../assets/janansport.png"; 
import product3 from "../assets/musk.png"; 
import product4 from "../assets/versace.png"; 

// Aap ka original Data Array
const itemsArray = [ 
  { 
    id: 1, 
    name: "Oud Supreme", 
    price: 4500,
    image: product1, 
    description: "Long lasting luxury perfume" 
  }, 
  { 
    id: 2, 
    name: "Janan Sport",
    price: 3800,
    image: product2, 
    description: "Fresh and energetic fragrance" 
  }, 
  { 
    id: 3,
    name: "Royal Musk",
    price: 5200,
    image: product3,
    description: "Deep, sweet & woody scent" 
  },
  { 
    id: 4,
    name: "Versace Eros",
    price: 9500,
    image: product4,
    description: "Premium fresh aromatic perfume" 
  }
]; 

// 1. Function mein searchQuery aur addToCart receive kiya
function ProductList({ searchQuery, addToCart }) {

  // 2. Search query ke mutabiq filter
  const filteredProducts = itemsArray.filter((product) =>
    product.name.toLowerCase().includes((searchQuery || "").toLowerCase())
  );

  return (
    <div style={{ padding: "40px 20px" }}>
      {filteredProducts.length > 0 ? (
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
          {filteredProducts.map((product) => (
            <div key={product.id} style={{ border: "1px solid #eee", padding: "15px", borderRadius: "10px", width: "220px", textAlign: "center" }}>
              <img src={product.image} alt={product.name} style={{ width: "100%", height: "180px", objectFit: "contain" }} />
              <h3>{product.name}</h3>
              <p style={{ color: "#666", fontSize: "14px" }}>{product.description}</p>
              <strong style={{ color: "#b89433" }}>Rs. {product.price}</strong>
              
              {/* Button par onClick handler lagaya hai */}
              <button 
                onClick={() => addToCart && addToCart(product)}
                style={{ marginTop: "10px", width: "100%", backgroundColor: "#111", color: "#fff", padding: "8px", border: "none", borderRadius: "5px", cursor: "pointer" }}
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
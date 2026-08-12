import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  
  // Form State
  const [editingId, setEditingId] = useState(null); // Edit Mode Tracker
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("Poetic Range");
  const [imagesInput, setImagesInput] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setProducts(items);
    });
    return () => unsubscribe();
  }, []);

  // Form Reset Function
  const resetForm = () => {
    setEditingId(null);
    setName("");
    setPrice("");
    setOriginalPrice("");
    setStock("");
    setImagesInput("");
    setDescription("");
  };

  // Add OR Update Handler
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!name || !price) return alert("Product Name and Price are required!");

    const galleryArray = imagesInput
      ? imagesInput.split(",").map((url) => url.trim()).filter((url) => url.length > 0)
      : ["https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600"];

    const productPayload = {
      name,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : Number(price) + 600,
      stock: stock ? Number(stock) : 10,
      category,
      image: galleryArray[0],
      gallery: galleryArray,
      description,
    };

    if (editingId) {
      // Update Existing Product
      await updateDoc(doc(db, "products", editingId), {
        ...productPayload,
        updatedAt: new Date()
      });
      alert("✓ Product updated successfully!");
    } else {
      // Add New Product
      await addDoc(collection(db, "products"), {
        ...productPayload,
        createdAt: new Date()
      });
      alert("✓ Product saved to inventory!");
    }

    resetForm();
  };

  // Populate Form for Editing
  const handleEditClick = (item) => {
    setEditingId(item.id);
    setName(item.name || item.title || "");
    setPrice(item.price || "");
    setOriginalPrice(item.originalPrice || "");
    setStock(item.stock ?? 10);
    setCategory(item.category || "Poetic Range");
    setImagesInput(Array.isArray(item.gallery) ? item.gallery.join(", ") : item.image || "");
    setDescription(item.description || "");
  };

  // Delete Product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteDoc(doc(db, "products", id));
      if (editingId === id) resetForm();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
      
      {/* Form (Add or Edit) */}
      <div className="lg:col-span-5 bg-[#141414] p-6 rounded-2xl border border-[#d4af37]/30 shadow-2xl h-fit">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-extrabold text-[#d4af37] uppercase tracking-widest flex items-center gap-2">
            {editingId ? "✏️ Edit Product" : "✨ Add New Item"}
          </h2>
          {editingId && (
            <button
              onClick={resetForm}
              className="text-[10px] text-gray-400 hover:text-white bg-gray-800 px-2.5 py-1 rounded-md uppercase font-bold"
            >
              Cancel
            </button>
          )}
        </div>
        
        <form onSubmit={handleSaveProduct} className="space-y-3.5 text-xs">
          
          <div>
            <label className="text-gray-300 block mb-1 uppercase font-bold tracking-wider">Product Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Velvet OUD"
              required
              className="w-full bg-black/80 border border-gray-800 rounded-lg p-3 text-white focus:border-[#d4af37] outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-gray-300 block mb-1 uppercase font-bold tracking-wider">Sale Price (PKR) *</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="3690"
                required
                className="w-full bg-black/80 border border-gray-800 rounded-lg p-3 text-white focus:border-[#d4af37] outline-none"
              />
            </div>
            <div>
              <label className="text-gray-300 block mb-1 uppercase font-bold tracking-wider">Original Price</label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="4290"
                className="w-full bg-black/80 border border-gray-800 rounded-lg p-3 text-white focus:border-[#d4af37] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-gray-300 block mb-1 uppercase font-bold tracking-wider">Stock Qty</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="10"
                className="w-full bg-black/80 border border-gray-800 rounded-lg p-3 text-white focus:border-[#d4af37] outline-none"
              />
            </div>
            <div>
              <label className="text-gray-300 block mb-1 uppercase font-bold tracking-wider">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-black/80 border border-gray-800 rounded-lg p-3 text-white focus:border-[#d4af37] outline-none"
              >
                <option value="Poetic Range">Poetic Range</option>
                <option value="Executive Range">Executive Range</option>
                <option value="Musk Range">Musk Range</option>
                <option value="Sensory Range">Sensory Range</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-gray-300 block mb-1 uppercase font-bold tracking-wider">
              Multiple Images (Comma Separated URLs)
            </label>
            <textarea
              rows="2"
              value={imagesInput}
              onChange={(e) => setImagesInput(e.target.value)}
              placeholder="https://img1.com, https://img2.com"
              className="w-full bg-black/80 border border-gray-800 rounded-lg p-3 text-white focus:border-[#d4af37] outline-none text-[11px]"
            />
          </div>

          <div>
            <label className="text-gray-300 block mb-1 uppercase font-bold tracking-wider">Description</label>
            <textarea
              rows="2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Fragrance notes and details..."
              className="w-full bg-black/80 border border-gray-800 rounded-lg p-3 text-white focus:border-[#d4af37] outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#d4af37] hover:bg-[#b8952b] text-black font-extrabold py-3.5 rounded-xl uppercase tracking-widest transition-all shadow-lg shadow-[#d4af37]/10 mt-2"
          >
            {editingId ? "Update Product" : "+ Save Product"}
          </button>
        </form>
      </div>

      {/* Inventory Panel */}
      <div className="lg:col-span-7 bg-[#141414] p-6 rounded-2xl border border-[#d4af37]/30 shadow-2xl">
        <h2 className="text-lg font-extrabold text-[#d4af37] uppercase tracking-widest mb-4">
          INVENTORY ({products.length})
        </h2>

        {products.length === 0 ? (
          <p className="text-xs text-gray-500 py-10 text-center uppercase tracking-widest">
            No products in inventory.
          </p>
        ) : (
          <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
            {products.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between p-3.5 rounded-xl bg-black/60 border transition-all ${
                  editingId === item.id ? "border-[#d4af37] bg-black/90" : "border-gray-800/90 hover:border-[#d4af37]/50"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={item.image || (Array.isArray(item.gallery) && item.gallery[0]) || "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600"}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-lg bg-black border border-[#d4af37]/30"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">{item.name || item.title}</h3>
                    <p className="text-[11px] text-gray-400">{item.category}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs">
                      <span className="font-extrabold text-[#d4af37]">Rs.{item.price}</span>
                      {item.originalPrice && (
                        <span className="text-gray-500 line-through text-[10px]">Rs.{item.originalPrice}</span>
                      )}
                      <span className="bg-gray-800 text-gray-300 text-[10px] px-2 py-0.5 rounded border border-gray-700">
                        Stock: {item.stock ?? 10}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="bg-[#d4af37]/10 hover:bg-[#d4af37] text-[#d4af37] hover:text-black border border-[#d4af37]/40 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-950/40 hover:bg-red-600 text-red-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all border border-red-900/50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
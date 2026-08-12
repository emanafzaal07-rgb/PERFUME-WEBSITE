import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Firestore se Products Fetch
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
    });
    return () => unsubscribe();
  }, []);

  // Add ya Update Product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !image) return alert("Pura form fill karein!");

    try {
      if (editingId) {
        await updateDoc(doc(db, 'products', editingId), {
          name, price: Number(price), category, image, description
        });
        setEditingId(null);
      } else {
        await addDoc(collection(db, 'products'), {
          name, price: Number(price), category, image, description, createdAt: serverTimestamp()
        });
      }
      resetForm();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const handleEdit = (p) => {
    setEditingId(p.id);
    setName(p.name);
    setPrice(p.price);
    setCategory(p.category || '');
    setImage(p.image);
    setDescription(p.description || '');
  };

  const handleDelete = async (id) => {
    if (window.confirm("Kiya aap yeh perfume delete karna chahte hain?")) {
      await deleteDoc(doc(db, 'products', id));
    }
  };

  const resetForm = () => {
    setName(''); setPrice(''); setCategory(''); setImage(''); setDescription(''); setEditingId(null);
  };

  return (
    <div className="bg-[#181a1d] border border-[#2e3238] p-6 rounded-2xl space-y-6 text-[#e0d6c3]">
      <h2 className="text-xl font-serif text-[#d4af37] border-b border-[#2e3238] pb-3">
        {editingId ? "Edit Perfume" : "Add New Perfume"}
      </h2>

      {/* Add / Edit Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text" placeholder="Perfume Name" value={name} onChange={(e) => setName(e.target.value)} required
          className="bg-[#121315] border border-[#2e3238] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
        />
        <input
          type="number" placeholder="Price (PKR)" value={price} onChange={(e) => setPrice(e.target.value)} required
          className="bg-[#121315] border border-[#2e3238] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
        />
        <input
          type="text" placeholder="Category (e.g. Royal Oud, Floral)" value={category} onChange={(e) => setCategory(e.target.value)}
          className="bg-[#121315] border border-[#2e3238] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
        />
        <input
          type="url" placeholder="Image URL (Unsplash / Online Link)" value={image} onChange={(e) => setImage(e.target.value)} required
          className="bg-[#121315] border border-[#2e3238] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
        />
        <textarea
          placeholder="Perfume Description" value={description} onChange={(e) => setDescription(e.target.value)} rows="2"
          className="md:col-span-2 bg-[#121315] border border-[#2e3238] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
        />

        <div className="md:col-span-2 flex gap-3">
          <button type="submit" className="flex-1 bg-[#d4af37] text-black font-semibold py-2.5 rounded-lg text-xs uppercase font-serif tracking-widest hover:bg-[#c5a059] transition">
            {editingId ? "Update Product" : "Save Product"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="px-5 border border-red-500/40 text-red-400 rounded-lg text-xs uppercase font-serif">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Inventory Table */}
      <div className="pt-6 border-t border-[#2e3238]">
        <h3 className="text-lg font-serif text-white mb-4">Live Inventory ({products.length})</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {products.map((p) => (
            <div key={p.id} className="flex gap-4 items-center bg-[#121315] p-3 rounded-xl border border-[#2e3238]">
              <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-lg border border-[#2e3238]" />
              <div className="flex-1 text-xs space-y-1">
                <p className="font-semibold text-white text-sm">{p.name}</p>
                <p className="text-[#d4af37]">Rs. {p.price}</p>
                <p className="text-[#a09788] text-[10px] uppercase">{p.category || 'General'}</p>
              </div>
              <div className="flex flex-col gap-1">
                <button onClick={() => handleEdit(p)} className="text-[10px] px-2.5 py-1 bg-[#2b2e34] text-white rounded hover:bg-[#383d44]">
                  Edit
                </button>
                <button onClick={() => handleDelete(p.id)} className="text-[10px] px-2.5 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
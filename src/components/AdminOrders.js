import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  doc, 
  updateDoc, 
  getDoc, 
  addDoc, 
  deleteDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// 👑 Allowed Admin Emails
const HARDCODED_ADMINS = [
  "39653@iqraisb.edu.pk",
  "emanafzaal07@gmail.com"
];

// -------------------------------------------------------------------
// 🛒 SUB-COMPONENT: Product Management (Add / Edit / Delete)
// -------------------------------------------------------------------
function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Firestore se live Products load karein
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
    });
    return () => unsubscribe();
  }, []);

  // Form Submit (Add ya Update)
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
        {editingId ? "✏️ Edit Perfume" : "✨ Add New Perfume"}
      </h2>

      {/* Add / Edit Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-[#a09788] block mb-1 font-serif">Perfume Name</label>
          <input
            type="text" placeholder="e.g. Royal Amber" value={name} onChange={(e) => setName(e.target.value)} required
            className="w-full bg-[#121315] border border-[#2e3238] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div>
          <label className="text-xs text-[#a09788] block mb-1 font-serif">Price (PKR)</label>
          <input
            type="number" placeholder="e.g. 4500" value={price} onChange={(e) => setPrice(e.target.value)} required
            className="w-full bg-[#121315] border border-[#2e3238] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div>
          <label className="text-xs text-[#a09788] block mb-1 font-serif">Category</label>
          <input
            type="text" placeholder="e.g. Luxury Oud, Floral" value={category} onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-[#121315] border border-[#2e3238] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div>
          <label className="text-xs text-[#a09788] block mb-1 font-serif">Image URL</label>
          <input
            type="url" placeholder="https://..." value={image} onChange={(e) => setImage(e.target.value)} required
            className="w-full bg-[#121315] border border-[#2e3238] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-xs text-[#a09788] block mb-1 font-serif">Description</label>
          <textarea
            placeholder="Fragrance notes & details..." value={description} onChange={(e) => setDescription(e.target.value)} rows="2"
            className="w-full bg-[#121315] border border-[#2e3238] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div className="md:col-span-2 flex gap-3 pt-2">
          <button type="submit" className="flex-1 bg-[#d4af37] text-black font-semibold py-3 rounded-lg text-xs uppercase font-serif tracking-widest hover:bg-[#c5a059] transition shadow-lg">
            {editingId ? "Update Product" : "Save Product"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="px-6 border border-red-500/40 text-red-400 rounded-lg text-xs uppercase font-serif hover:bg-red-500/10 transition">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Live Products Inventory Table */}
      <div className="pt-6 border-t border-[#2e3238]">
        <h3 className="text-lg font-serif text-white mb-4">Live Inventory ({products.length})</h3>
        {products.length === 0 ? (
          <p className="text-xs text-[#a09788]">Database mein abhi tak koi dynamic perfume add nahi hua.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {products.map((p) => (
              <div key={p.id} className="flex gap-4 items-center bg-[#121315] p-3.5 rounded-xl border border-[#2e3238]">
                <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-lg border border-[#2e3238]" />
                <div className="flex-1 text-xs space-y-1">
                  <p className="font-semibold text-white text-sm">{p.name}</p>
                  <p className="text-[#d4af37] font-semibold">Rs. {p.price}</p>
                  <p className="text-[#a09788] text-[10px] uppercase tracking-wider">{p.category || 'General'}</p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <button onClick={() => handleEdit(p)} className="text-[11px] px-3 py-1 bg-[#2b2e34] text-white rounded hover:bg-[#383d44] transition">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="text-[11px] px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition">
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

// -------------------------------------------------------------------
// 👑 MAIN COMPONENT: Admin Panel
// -------------------------------------------------------------------
export default function AdminOrders() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'products'

  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Admin Access Check
  const verifyAdminStatus = async (currentUser) => {
    if (!currentUser || !currentUser.email) {
      setIsAdmin(false);
      setCheckingAuth(false);
      return;
    }

    const userEmail = currentUser.email.toLowerCase();

    // 1. Check Hardcoded List
    if (HARDCODED_ADMINS.map(e => e.toLowerCase()).includes(userEmail)) {
      setIsAdmin(true);
      setCheckingAuth(false);
      return;
    }

    // 2. Check Firebase Firestore 'admins' Collection
    try {
      const adminDocRef = doc(db, 'admins', userEmail);
      const adminDocSnap = await getDoc(adminDocRef);
      setIsAdmin(adminDocSnap.exists());
    } catch (err) {
      console.error("Admin verification error:", err);
      setIsAdmin(false);
    }
    
    setCheckingAuth(false);
  };

  // Auth Listener
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      verifyAdminStatus(currentUser);
    });
    return () => unsubscribeAuth();
  }, []);

  // Fetch Orders
  useEffect(() => {
    if (user && isAdmin) {
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const ordersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrders(ordersData);
        setLoading(false);
      }, (error) => {
        console.error("Orders Fetch Error:", error);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [user, isAdmin]);

  // Login Handler
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoginError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setLoginError("Invalid Email or Password!");
    }
  };

  // Status Change Handler
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status: newStatus });
    } catch (error) {
      console.error("Status Update Error:", error);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#121416] text-[#d4af37] flex items-center justify-center font-serif">
        Verifying Admin Access...
      </div>
    );
  }

  // 🔒 Admin Login Form (Agar user Admin nahi hai)
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-[#121416] text-white flex flex-col items-center justify-center p-6">
        <div className="bg-[#181a1d] border border-[#2e3238] p-8 rounded-2xl w-full max-w-md shadow-2xl text-center space-y-6">
          <div className="text-4xl text-[#d4af37]">👑</div>
          <h2 className="text-2xl font-serif text-[#ffffff] tracking-wide">Admin Portal</h2>
          <p className="text-xs text-[#a09788]">Authorized creators & admins only</p>

          {user && !isAdmin && (
            <div className="bg-red-500/10 border border-red-500/40 text-red-400 text-xs p-3 rounded-lg">
              Aap ka account (`{user.email}`) Admin list mein add nahi hai.
            </div>
          )}

          {loginError && (
            <div className="bg-red-500/10 border border-red-500/40 text-red-400 text-xs p-3 rounded-lg">
              {loginError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
            <div>
              <label className="text-xs text-[#d4af37] font-serif uppercase tracking-widest block mb-1">Email</label>
              <input 
                type="email" 
                required
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#121315] border border-[#2e3238] rounded-lg px-4 py-2.5 text-sm text-[#e0d6c3] focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="text-xs text-[#d4af37] font-serif uppercase tracking-widest block mb-1">Password</label>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#121315] border border-[#2e3238] rounded-lg px-4 py-2.5 text-sm text-[#e0d6c3] focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#d4af37] text-black font-serif font-semibold py-3 rounded-lg text-xs uppercase tracking-widest hover:bg-[#c5a059] transition shadow-[0_0_15px_rgba(212,175,55,0.2)]"
            >
              Sign In As Admin
            </button>
          </form>

          {user && (
            <button 
              onClick={() => signOut(auth)}
              className="text-xs text-[#a09788] hover:text-[#d4af37] underline transition pt-2 block mx-auto"
            >
              Sign Out (`{user.email}`)
            </button>
          )}
        </div>
      </div>
    );
  }

  // 🔓 Live Admin Dashboard
  return (
    <div className="min-h-screen bg-[#121416] text-[#e0d6c3] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Top Header */}
        <div className="flex justify-between items-center mb-6 border-b border-[#2e3238] pb-4">
          <div>
            <h1 className="text-3xl font-serif text-[#ffffff]">Admin Control Panel</h1>
            <p className="text-xs text-[#a09788] mt-1">Logged in as: <span className="text-[#d4af37]">{user.email}</span></p>
          </div>
          <button 
            onClick={() => signOut(auth)}
            className="border border-red-500/40 text-red-400 hover:bg-red-500/10 px-4 py-1.5 rounded-full text-xs font-serif uppercase tracking-widest transition"
          >
            Logout
          </button>
        </div>

        {/* Tab Navigation Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-2.5 text-xs font-serif uppercase tracking-widest rounded-xl transition ${
              activeTab === 'orders'
                ? 'bg-[#d4af37] text-black font-semibold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                : 'bg-[#181a1d] text-[#a09788] hover:text-white border border-[#2e3238]'
            }`}
          >
            📦 Customer Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-2.5 text-xs font-serif uppercase tracking-widest rounded-xl transition ${
              activeTab === 'products'
                ? 'bg-[#d4af37] text-black font-semibold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                : 'bg-[#181a1d] text-[#a09788] hover:text-white border border-[#2e3238]'
            }`}
          >
            ✨ Manage Products
          </button>
        </div>

        {/* Dynamic Tab Content */}
        {activeTab === 'orders' ? (
          loading ? (
            <div className="text-[#d4af37] p-8 text-center font-serif">Loading Customer Orders...</div>
          ) : orders.length === 0 ? (
            <p className="text-[#a09788] py-8 text-center">Abhi tak koi order nahi aaya.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {orders.map((order) => (
                <div key={order.id} className="bg-[#181a1d] border border-[#2e3238] rounded-xl p-5 shadow-lg space-y-4">
                  <div className="flex justify-between items-center border-b border-[#2e3238] pb-3">
                    <span className="text-xs text-[#a09788]">ID: {order.id.slice(0, 8)}...</span>
                    <span className={`text-xs px-2.5 py-1 rounded font-semibold uppercase ${
                      order.status === 'Delivered' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    }`}>
                      {order.status || 'Pending'}
                    </span>
                  </div>

                  <div className="space-y-1 text-sm">
                    <p><strong className="text-[#d4af37]">Name:</strong> {order.customerInfo?.name}</p>
                    <p><strong className="text-[#d4af37]">Phone:</strong> {order.customerInfo?.phone}</p>
                    <p><strong className="text-[#d4af37]">City:</strong> {order.customerInfo?.city}</p>
                    <p className="text-xs text-[#a09788]"><strong className="text-[#d4af37]">Address:</strong> {order.customerInfo?.address}</p>
                  </div>

                  <div className="border-t border-[#2e3238] pt-3">
                    <p className="text-xs font-serif text-[#a09788] uppercase mb-2">Items Ordered:</p>
                    <ul className="space-y-1 text-xs">
                      {order.items?.map((item, idx) => (
                        <li key={idx} className="flex justify-between text-[#ffffff]">
                          <span>• {item.name}</span>
                          <span className="text-[#d4af37]">Rs. {item.price}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex justify-between font-bold text-sm text-[#ffffff] border-t border-[#2e3238] mt-3 pt-2">
                      <span>Total Amount:</span>
                      <span className="text-[#d4af37]">Rs. {order.totalAmount}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button
                      onClick={() => handleStatusChange(order.id, 'Pending')}
                      className="flex-1 text-xs py-1.5 rounded bg-[#2b2e34] hover:bg-[#383d44] transition-colors text-[#ffffff]"
                    >
                      Mark Pending
                    </button>
                    <button
                      onClick={() => handleStatusChange(order.id, 'Delivered')}
                      className="flex-1 text-xs py-1.5 rounded bg-[#d4af37] text-black font-semibold hover:bg-[#c5a059] transition-colors"
                    >
                      Mark Delivered
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <AdminProducts />
        )}
      </div>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// 👑 Allowed Admin Emails (Aap aur Aap ki Dost ka Email)
const HARDCODED_ADMINS = [
  "39653@iqraisb.edu.pk",
  "emanafzaal07@gmail.com"
];

export default function AdminOrders() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
      
      if (adminDocSnap.exists()) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
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
  if (loading) {
    return <div className="min-h-screen bg-[#121416] text-[#d4af37] p-8 text-center font-serif">Loading Orders...</div>;
  }

  return (
    <div className="min-h-screen bg-[#121416] text-[#e0d6c3] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-[#2e3238] pb-4">
          <div>
            <h1 className="text-3xl font-serif text-[#ffffff]">Admin Orders Panel</h1>
            <p className="text-xs text-[#a09788] mt-1">Logged in as: <span className="text-[#d4af37]">{user.email}</span></p>
          </div>
          <button 
            onClick={() => signOut(auth)}
            className="border border-red-500/40 text-red-400 hover:bg-red-500/10 px-4 py-1.5 rounded-full text-xs font-serif uppercase tracking-widest transition"
          >
            Logout
          </button>
        </div>

        {orders.length === 0 ? (
          <p className="text-[#a09788]">Abhi tak koi order nahi aaya.</p>
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
        )}
      </div>
    </div>
  );
}
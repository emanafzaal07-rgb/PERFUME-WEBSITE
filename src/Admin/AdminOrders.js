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
  deleteDoc
} from 'firebase/firestore';

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

import AdminProducts from './AdminProducts';

// ============================================================
// 👑 ALLOWED ADMIN EMAILS
// ============================================================
export const HARDCODED_ADMINS = [
  "39653@iqraisb.edu.pk",
  "emanafzaal07@gmail.com"
];

// ============================================================
// ADMIN ORDERS
// ============================================================
export default function AdminOrders() {

  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('orders');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // ============================================================
  // GET FIELD VALUE
  // ============================================================
  const getFieldValue = (...fields) => {
    for (const field of fields) {
      if (
        field !== undefined &&
        field !== null &&
        field !== ''
      ) {
        if (
          typeof field === 'object' &&
          !Array.isArray(field)
        ) {
          const values = Object.values(field)
            .filter(
              value =>
                value !== undefined &&
                value !== null &&
                typeof value !== 'object'
            )
            .join(', ');

          if (values) return values;
        } else if (
          typeof field === 'string' ||
          typeof field === 'number'
        ) {
          return String(field);
        }
      }
    }
    return 'N/A';
  };

  // ============================================================
  // VERIFY ADMIN
  // ============================================================
  const verifyAdminStatus = async (currentUser) => {
    if (!currentUser || !currentUser.email) {
      setIsAdmin(false);
      setCheckingAuth(false);
      return;
    }

    const userEmail = currentUser.email.toLowerCase().trim();

    if (
      HARDCODED_ADMINS.map(email => email.toLowerCase()).includes(userEmail)
    ) {
      setIsAdmin(true);
      setCheckingAuth(false);
      return;
    }

    try {
      const adminRef = doc(db, 'admins', userEmail);
      const adminSnap = await getDoc(adminRef);
      setIsAdmin(adminSnap.exists());
    } catch (error) {
      console.error('Admin verification error:', error);
      setIsAdmin(false);
    }

    setCheckingAuth(false);
  };

  // ============================================================
  // AUTH LISTENER
  // ============================================================
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      setUser(currentUser);
      await verifyAdminStatus(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // ============================================================
  // LOAD ORDERS
  // ============================================================
  useEffect(() => {
    if (!user || !isAdmin) {
      setOrders([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const ordersQuery = query(
      collection(db, 'orders'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      ordersQuery,
      snapshot => {
        const orderData = snapshot.docs.map(orderDoc => ({
          id: orderDoc.id,
          ...orderDoc.data()
        }));

        setOrders(orderData);
        setLoading(false);
      },
      error => {
        console.error('Orders Fetch Error:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user, isAdmin]);

  // ============================================================
  // ADMIN LOGIN
  // ============================================================
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoginError('');

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (error) {
      console.error('Login Error:', error);
      setLoginError('Invalid Email or Password!');
    }
  };

  // ============================================================
  // CHANGE ORDER STATUS
  // ============================================================
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status: newStatus
      });
    } catch (error) {
      console.error('Status Update Error:', error);
      alert('Order status update nahi ho saka.');
    }
  };

  // ============================================================
  // DELETE ORDER
  // ============================================================
  const handleDeleteOrder = async (orderId) => {
    const confirmed = window.confirm(
      'Kya aap is order ko delete karna chahte hain?'
    );

    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, 'orders', orderId));
    } catch (error) {
      console.error('Delete Order Error:', error);
      alert('Order delete nahi ho saka.');
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#121416] text-[#d4af37] flex items-center justify-center font-serif">
        Verifying Admin Access...
      </div>
    );
  }

  // LOGIN SCREEN
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-[#121416] text-white flex items-center justify-center p-6">
        <div className="bg-[#181a1d] border border-[#2e3238] p-8 rounded-2xl w-full max-w-md shadow-2xl">
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">👑</div>
            <h2 className="text-2xl font-serif text-white">Admin Portal</h2>
          </div>

          {loginError && (
            <div className="bg-red-500/10 border border-red-500/40 text-red-400 text-xs p-3 rounded-lg mb-4">
              {loginError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="text-xs text-[#d4af37] font-serif uppercase block mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full bg-[#121315] border border-[#2e3238] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="text-xs text-[#d4af37] font-serif uppercase block mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#121315] border border-[#2e3238] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#d4af37] text-black font-semibold py-3 rounded-lg text-xs uppercase font-serif tracking-widest hover:bg-[#c5a059] transition"
            >
              Sign In As Admin
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-[#121416] text-[#e0d6c3] p-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6 border-b border-[#2e3238] pb-4">
          <div>
            <h1 className="text-3xl font-serif text-white">
              Admin Control Panel
            </h1>
            <p className="text-xs text-[#a09788] mt-1">
              Logged in as:{' '}
              <span className="text-[#d4af37]">{user.email}</span>
            </p>
          </div>

          <button
            onClick={() => signOut(auth)}
            className="border border-red-500/40 text-red-400 hover:bg-red-500/10 px-4 py-2 rounded-full text-xs font-serif uppercase transition"
          >
            Logout
          </button>
        </div>

        {/* TABS */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 text-xs font-serif uppercase tracking-widest rounded-xl transition ${
              activeTab === 'orders'
                ? 'bg-[#d4af37] text-black font-semibold'
                : 'bg-[#181a1d] text-[#a09788] border border-[#2e3238]'
            }`}
          >
            📦 Customer Orders ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 text-xs font-serif uppercase tracking-widest rounded-xl transition ${
              activeTab === 'products'
                ? 'bg-[#d4af37] text-black font-semibold'
                : 'bg-[#181a1d] text-[#a09788] border border-[#2e3238]'
            }`}
          >
            ✨ Manage Products
          </button>
        </div>

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <>
            {loading ? (
              <div className="text-[#d4af37] p-10 text-center font-serif">
                Loading Customer Orders...
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[#a09788]">Abhi tak koi order nahi aaya.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {orders.map(order => {
                  const status = (order.status || 'Pending').toUpperCase();

                  const name = getFieldValue(
                    order.customerName,
                    order.name,
                    order.customerInfo?.name,
                    order.formData?.name
                  );

                  const phone = getFieldValue(
                    order.phone,
                    order.customerInfo?.phone,
                    order.formData?.phone
                  );

                  const address = getFieldValue(
                    order.address,
                    order.customerInfo?.address,
                    order.formData?.address
                  );

                  const totalAmount =
                    order.totalPrice ??
                    order.total ??
                    order.totalAmount ??
                    0;

                  return (
                    <div
                      key={order.id}
                      className="bg-[#181a1d] border border-[#2e3238] rounded-xl p-5 space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-center border-b border-[#2e3238] pb-3">
                          <span className="text-xs text-[#a09788] font-mono">
                            ID: {order.id.slice(0, 8)}...
                          </span>
                          <span
                            className={`text-[10px] px-2.5 py-1 rounded font-semibold uppercase ${
                              status === 'DELIVERED'
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            }`}
                          >
                            {status}
                          </span>
                        </div>

                        {/* CUSTOMER DETAILS */}
                        <div className="space-y-1.5 text-xs">
                          <p>
                            <strong className="text-[#d4af37]">Name:</strong>{' '}
                            {name}
                          </p>
                          <p>
                            <strong className="text-[#d4af37]">Phone:</strong>{' '}
                            {phone}
                          </p>
                          <p>
                            <strong className="text-[#d4af37]">Address:</strong>{' '}
                            {address}
                          </p>
                          <p>
                            <strong className="text-[#d4af37]">Total:</strong>{' '}
                            Rs. {totalAmount}
                          </p>
                        </div>

                        {/* ORDERED ITEMS LIST */}
                        {Array.isArray(order.items) && order.items.length > 0 && (
                          <div className="pt-3 border-t border-[#2e3238]">
                            <p className="text-[11px] font-serif uppercase text-[#d4af37] mb-2">
                              Items Ordered ({order.items.length}):
                            </p>
                            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                              {order.items.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between text-xs bg-[#121315] p-2 rounded border border-[#2e3238]"
                                >
                                  <div className="flex items-center gap-2">
                                    {item.image && (
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-8 h-8 object-cover rounded border border-[#2e3238]"
                                      />
                                    )}
                                    <div>
                                      <p className="font-semibold text-white leading-tight">
                                        {item.name || "Product"}
                                      </p>
                                      <p className="text-[10px] text-gray-400">
                                        Qty: {item.quantity || 1}
                                      </p>
                                    </div>
                                  </div>
                                  <span className="text-[#d4af37] text-[11px] font-semibold">
                                    Rs. {item.price}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* ACTION BUTTONS */}
                      <div className="flex gap-2 pt-3 border-t border-[#2e3238]">
                        <button
                          onClick={() =>
                            handleStatusChange(
                              order.id,
                              status === 'DELIVERED' ? 'PENDING' : 'DELIVERED'
                            )
                          }
                          className="flex-1 text-xs py-2 rounded bg-[#d4af37] text-black font-semibold hover:bg-[#c5a059] transition uppercase tracking-wider"
                        >
                          {status === 'DELIVERED' ? 'Mark Pending' : 'Delivered'}
                        </button>

                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          className="text-xs px-4 py-2 rounded bg-red-900/40 text-red-300 hover:bg-red-900/60 transition uppercase tracking-wider"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <AdminProducts
            isAdmin={isAdmin}
            adminEmail={user.email}
          />
        )}
      </div>
    </div>
  );
}
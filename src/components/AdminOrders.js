import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy, doc, updateDoc } from 'firebase/firestore';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Real-time Orders Fetching
  useEffect(() => {
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
  }, []);

  // Order Status Change Handler
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status: newStatus });
    } catch (error) {
      console.error("Status Update Error:", error);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-[#d4af37]">Loading Orders...</div>;
  }

  return (
    <div className="min-h-screen bg-[#121416] text-[#e0d6c3] p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-serif text-[#ffffff] mb-8 border-b border-[#2e3238] pb-4">
          Admin Panel — Orders ({orders.length})
        </h1>

        {orders.length === 0 ? (
          <p className="text-[#a09788]">Abhi tak koi order nahi aaya.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
              <div key={order.id} className="bg-[#181a1d] border border-[#2e3238] rounded-xl p-5 shadow-lg space-y-4">
                
                {/* Order Header */}
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

                {/* Customer Details */}
                <div className="space-y-1 text-sm">
                  <p><strong className="text-[#d4af37]">Name:</strong> {order.customerInfo?.name}</p>
                  <p><strong className="text-[#d4af37]">Phone:</strong> {order.customerInfo?.phone}</p>
                  <p><strong className="text-[#d4af37]">City:</strong> {order.customerInfo?.city}</p>
                  <p className="text-xs text-[#a09788]"><strong className="text-[#d4af37]">Address:</strong> {order.customerInfo?.address}</p>
                </div>

                {/* Ordered Items */}
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

                {/* Action Buttons */}
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
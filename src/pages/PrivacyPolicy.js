import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy | OUD AL NOOR";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#e0d6c3] py-12 px-4 sm:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Navigation */}
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xs text-[#d4af37] hover:underline flex items-center gap-1 font-medium">
            ← Back to Home
          </Link>
          <span className="text-xs text-[#7d8590]">Last Updated: August 2026</span>
        </div>

        {/* Header Banner */}
        <div className="bg-[#1e2024] p-8 sm:p-10 rounded-3xl border border-[#2e3238] shadow-2xl relative overflow-hidden text-center sm:text-left">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none"></div>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#ffffff] tracking-wide">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-[#a09788] max-w-xl leading-relaxed">
            At <span className="text-[#d4af37] font-semibold">OUD AL NOOR</span>, your privacy is as precious as our fragrances. Here is how we safeguard your personal details.
          </p>
        </div>

        {/* Quick Highlights / Key Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#1e2024] p-5 rounded-2xl border border-[#2e3238] flex items-center gap-4">
            <span className="text-2xl">🔒</span>
            <div>
              <h3 className="text-sm font-semibold text-white">100% Encrypted</h3>
              <p className="text-xs text-[#7d8590]">Your data is protected</p>
            </div>
          </div>
          <div className="bg-[#1e2024] p-5 rounded-2xl border border-[#2e3238] flex items-center gap-4">
            <span className="text-2xl">🚫</span>
            <div>
              <h3 className="text-sm font-semibold text-white">No Spam</h3>
              <p className="text-xs text-[#7d8590]">Only order updates</p>
            </div>
          </div>
          <div className="bg-[#1e2024] p-5 rounded-2xl border border-[#2e3238] flex items-center gap-4">
            <span className="text-2xl">💳</span>
            <div>
              <h3 className="text-sm font-semibold text-white">Secure Payments</h3>
              <p className="text-xs text-[#7d8590]">Safe checkout process</p>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="bg-[#1e2024] p-8 sm:p-12 rounded-3xl border border-[#2e3238] shadow-2xl space-y-8">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-serif text-[#d4af37] flex items-center gap-2">
              <span>01.</span> Information We Collect
            </h2>
            <p className="text-sm text-[#a09788] leading-relaxed">
              When you browse our luxury store, place an order, or submit inquiries through our contact forms, we collect relevant information such as your name, email address, phone number, and delivery location.
            </p>
          </section>

          <hr className="border-[#2e3238]" />

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-serif text-[#d4af37] flex items-center gap-2">
              <span>02.</span> How We Use Your Information
            </h2>
            <ul className="text-sm text-[#a09788] space-y-2 list-disc list-inside leading-relaxed">
              <li>To seamlessly process, ship, and deliver your perfume orders.</li>
              <li>To provide instant updates regarding your delivery status.</li>
              <li>To respond to your inquiries through our customer service team.</li>
            </ul>
          </section>

          <hr className="border-[#2e3238]" />

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-serif text-[#d4af37] flex items-center gap-2">
              <span>03.</span> Cookies & Security
            </h2>
            <p className="text-sm text-[#a09788] leading-relaxed">
              We use standard browser cookies to remember cart items and provide a personalized experience. Your personal information is never sold or rented to third-party advertisers.
            </p>
          </section>

          <hr className="border-[#2e3238]" />

          {/* Section 4 - Contact Box */}
          <div className="bg-[#2b2e34] p-6 rounded-2xl border border-[#383d44] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-white">Have questions regarding your privacy?</h3>
              <p className="text-xs text-[#a09788] mt-1">Get in touch with our team for any data concerns.</p>
            </div>
            <Link 
              to="/contact" 
              className="px-5 py-2.5 bg-[#d4af37] text-black text-xs font-semibold rounded-lg hover:bg-[#c5a059] transition shrink-0"
            >
              Contact Us
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
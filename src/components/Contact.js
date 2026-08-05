import React, { useState, useEffect } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    country: 'US',
    phoneNumber: '',
    message: '',
    agreed: false,
  });

  // Page title automatically update karne ke liye
  useEffect(() => {
    document.title = "Contact Us | OUD AL NOOR";
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] p-4 sm:p-8 flex items-center justify-center font-sans">
      {/* Container Card (Same Dark Card Style as Sign In / Create Account) */}
      <div className="w-full max-w-5xl bg-[#1e2024] rounded-3xl shadow-2xl border border-[#2e3238] overflow-hidden text-[#e0d6c3]">
        <div className="grid grid-cols-1 lg:grid-cols-2 p-8 sm:p-14 gap-12 items-center">
          
          {/* Left Column: Heading & Contact Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl sm:text-5xl font-serif tracking-wide text-[#ffffff]">
                Contact Us
              </h1>
              <p className="mt-4 text-sm text-[#a09788] max-w-sm leading-relaxed font-light">
                We are committed to processing the information in order to contact you and talk about your project.
              </p>
            </div>

            {/* Info Items with Gold Icons */}
            <div className="space-y-5 text-sm font-medium text-[#d0c5b4]">
              {/* Email */}
              <div className="flex items-center gap-4">
                <span className="flex items-center justify-center w-9 h-9 rounded-lg border border-[#d4af37]/30 text-[#d4af37] bg-[#d4af37]/10 shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <span>Oud-Al-Noor@gmail.com</span>
              </div>

              {/* Address */}
              <div className="flex items-center gap-4">
                <span className="flex items-center justify-center w-9 h-9 rounded-lg border border-[#d4af37]/30 text-[#d4af37] bg-[#d4af37]/10 shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <span>4074 Ebert Summit Suite 375<br/>Lake Leonardchester</span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4">
                <span className="flex items-center justify-center w-9 h-9 rounded-lg border border-[#d4af37]/30 text-[#d4af37] bg-[#d4af37]/10 shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                <span>+92 222 333 444</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dark Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name *"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#383d44] bg-[#2b2e34] px-4 py-3 text-sm text-[#ffffff] placeholder-[#7d8590] shadow-sm focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                    required
                  />
                </div>

                {/* Last Name */}
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name *"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#383d44] bg-[#2b2e34] px-4 py-3 text-sm text-[#ffffff] placeholder-[#7d8590] shadow-sm focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                    required
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[#383d44] bg-[#2b2e34] px-4 py-3 text-sm text-[#ffffff] placeholder-[#7d8590] shadow-sm focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                />
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[#383d44] bg-[#2b2e34] px-4 py-3 text-sm text-[#ffffff] placeholder-[#7d8590] shadow-sm focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                  required
                />
              </div>

              {/* Phone Number with Country Select */}
              <div className="flex rounded-lg border border-[#383d44] bg-[#2b2e34] shadow-sm focus-within:ring-1 focus-within:ring-[#d4af37] focus-within:border-[#d4af37]">
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="rounded-l-lg bg-transparent px-3 py-3 text-sm text-[#a09788] focus:outline-none border-r border-[#383d44]"
                >
                  <option value="US" className="bg-[#2b2e34] text-[#ffffff]">US</option>
                  <option value="CA" className="bg-[#2b2e34] text-[#ffffff]">CA</option>
                  <option value="PK" className="bg-[#2b2e34] text-[#ffffff]">PK</option>
                </select>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number (123-456-7890)"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full bg-transparent rounded-r-lg px-4 py-3 text-sm text-[#ffffff] placeholder-[#7d8590] focus:outline-none"
                />
              </div>

              {/* Message */}
              <div>
                <textarea
                  name="message"
                  placeholder="Message *"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[#383d44] bg-[#2b2e34] px-4 py-3 text-sm text-[#ffffff] placeholder-[#7d8590] shadow-sm focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] resize-none"
                  required
                />
              </div>

              {/* Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  name="agreed"
                  id="agreed"
                  checked={formData.agreed}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-[#383d44] bg-[#2b2e34] text-[#d4af37] focus:ring-[#d4af37]"
                  required
                />
                <label htmlFor="agreed" className="text-xs text-[#a09788]">
                  By selecting this, you agree to our{' '}
                  <a href="#" className="font-medium text-[#d4af37] underline">
                    privacy policy
                  </a>.
                </label>
              </div>

              {/* Submit Button (Matching Gold Button from Sign In) */}
              <button
                type="submit"
                className="w-full mt-2 rounded-lg bg-[#d4af37] px-6 py-3.5 text-center text-sm font-semibold text-black shadow-lg transition duration-300 hover:bg-[#c5a059] hover:scale-[1.01] focus:outline-none"
              >
                Submit
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
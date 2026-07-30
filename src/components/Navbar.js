import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Abhi ke liye sirf console me dikhayenge, baad me search logic yahan add hoga
    console.log("Searching for:", search);
  };

  return (
    <header className="navbar">
      <Link to="/" className="navbar__logo">
       Emma Scent <span>&amp;</span> MUSK
      </Link>

      <nav className="navbar__links">
        <a href="#about" className="navbar__link">
          About
        </a>
        <a  href="#contact " className="navbar__link">
          contact
        </a>
        <form className="navbar__search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search perfumes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" aria-label="Search">
            ⚲
          </button>
        </form>

        <Link to="/signin" className="navbar__link">
          Sign In
        </Link>
        <Link to="/signup" className="navbar__cta">
          Sign Up
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;

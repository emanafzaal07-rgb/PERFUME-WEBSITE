import React from "react";
import Navbar from "./Navbar";
import heroImage from "../assets/homepage-perfume.png";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <Navbar />

      <section className="hero">
        <div className="hero__text">
          <p className="hero__eyebrow">Eau de Parfum Collection</p>
          <h1 className="hero__title">
            A Scent for Every <span>Story</span>
          </h1>
          <p className="hero__subtitle">
            Long-lasting, luxury fragrances crafted from rare ingredients.
            Har khushbu ek naya andaz.
          </p>
          <div className="hero__actions">
            <button className="btn btn--gold">Shop Now</button>
            <a href="#about" className="btn btn--outline">
              Learn More
            </a>
          </div>
        </div>

        <div className="hero__image">
          <img src={heroImage} alt="Emma scent & MUSK perfume bottle illustration" />
        </div>
      </section>

      <section id="about" className="about">
        <h2>About Emma scent &amp; MUSK</h2>
        <p>
           Emma scent &amp; MUSK ek premium fragrance brand hai jo apni perfumes
          finest ingredients se banata hai. Hamara maqsad hai har customer ko
          uski personality ke mutabiq behtareen khushbu dena — chahe woh
          sober ho, bold ho, ya romantic.
        </p>
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Emma scent &amp; MUSK. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;

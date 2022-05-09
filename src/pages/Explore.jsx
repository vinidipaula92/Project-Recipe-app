import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Explore() {
  return (
    <div className="container">
      <Header />
      <span data-testid="page-title">Explore</span>
      <Link to="/explore/foods">
        <button
          type="button"
          data-testid="explore-foods"
        >
          Explore Foods

        </button>
      </Link>
      <Link to="/explore/drinks">
        <button
          type="button"
          data-testid="explore-drinks"
        >
          Explore Drinks

        </button>
      </Link>
      <Footer />
    </div>
  );
}

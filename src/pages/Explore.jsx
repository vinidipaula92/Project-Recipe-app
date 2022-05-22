import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../css/Explore.css';
import Explorar from '../images/Explorar.png';
import Pedrin from '../images/Pedrin.png';

export default function Explore() {
  return (
    <div className="container">
      <div className="explore-header">
        <Header />
        <Link to="/">
          <img src={ Pedrin } alt="logo" width="50px" />
        </Link>
        <span data-testid="page-title">Explore</span>
      </div>
      <div className="btn">
        <Link to="/explore/foods">
          <button
            type="button"
            data-testid="explore-foods"
            className="btn-explore-foods"
          >
            Explore Foods

          </button>
        </Link>
        <Link to="/explore/drinks">
          <button
            type="button"
            data-testid="explore-drinks"
            className="btn-explore-drinks"
          >
            Explore Drinks

          </button>
        </Link>
      </div>
      <img
        src={ Explorar }
        alt="logo"
        className="explore-img"
      />
      <Footer />
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const userEmail = localStorage.getItem('user');

  const handleClick = () => {
    localStorage.clear();
  };
  return (
    <div>
      <Header />
      <span data-testid="page-title">Profile</span>
      <div>
        <h3 data-testid="profile-email">{userEmail}</h3>
        <Link to="/done-recipes">
          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Done Recipes

          </button>
        </Link>
        <Link to="/favorite-recipes">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes

          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ handleClick }
          >
            Logout

          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

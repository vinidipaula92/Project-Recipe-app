import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../css/profile.css';

export default function Profile() {
  const userEmail = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')) : { email: '' };

  const handleClick = () => {
    localStorage.clear();
  };
  return (
    <div className="container profile-container">
      <Header />
      <span data-testid="page-title">Profile</span>
      <h3 data-testid="profile-email">{userEmail.email}</h3>
      <Link to="/done-recipes">
        <button
          type="button"
          data-testid="profile-done-btn"
          className="done-btn"
        >
          Done Recipes

        </button>
      </Link>
      <Link to="/favorite-recipes">
        <button
          type="button"
          data-testid="profile-favorite-btn"
          className="favorite-btn"
        >
          Favorite Recipes

        </button>
      </Link>
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          className="logout-btn"
          onClick={ handleClick }
        >
          Logout

        </button>
      </Link>
      <Footer />
    </div>
  );
}

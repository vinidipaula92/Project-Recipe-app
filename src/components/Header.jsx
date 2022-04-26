import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Searchheader from './SearchHeader';

function Header() {
  return (
    <div className="header">
      <Link to="/profile">
        <img
          src="src/images/profileIcon.svg"
          alt="login"
          data-testid="profile-top-btn"
        />
      </Link>
      <span data-testid="page-title">Titulo da pagina</span>
      <button
        type="button"
        data-testid="search-btn"
      >
        <img
          src="src/images/searchIcon.svg"
          alt="search"
          data-testid="search-icon"
        />

      </button>
      <Searchheader />
    </div>
  );
}

export default Header;

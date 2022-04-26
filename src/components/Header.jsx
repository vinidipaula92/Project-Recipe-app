import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Searchheader from './SearchHeader';

function Header() {
  return (
    <div className="header">
      <Link to="/profile">
        <img
          src={ profileIcon }
          alt="login"
          data-testid="profile-top-btn"
        />
      </Link>
      <span data-testid="page-title">Titulo da pagina</span>
      <button
        type="button"
        data-testid="search-top-btn"
      >
        <img
          src={ searchIcon }
          alt="search"
          data-testid="search-icon"
        />

      </button>
      <Searchheader />
    </div>
  );
}

export default Header;

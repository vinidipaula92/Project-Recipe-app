import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import profileIcon from '../images/profileIcon.svg';

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
    </div>
  );
}

export default Header;

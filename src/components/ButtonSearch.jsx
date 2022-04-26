import React from 'react';
import searchIcon from '../images/searchIcon.svg';

export default function ButtonSearch() {
  return (
    <div>
      <button
        type="button"
      >
        <img
          src={ searchIcon }
          alt="search"
          data-testid="search-top-btn"
        />

      </button>
    </div>
  );
}

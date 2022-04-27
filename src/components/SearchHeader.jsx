import React, { useState } from 'react';
import searchIcon from '../images/searchIcon.svg';

function Searchheader() {
  const [disable, inputDisable] = useState(false);
  const [click, setClick] = useState(0);

  const handleInput = () => {
    if (click === 0) {
      inputDisable(true);
      setClick(1);
    }
    if (click === 1) {
      inputDisable(false);
      setClick(0);
    }
  };
  return (
    <div>
      <button
        type="button"
        onClick={ handleInput }
      >
        <img
          src={ searchIcon }
          alt="search"
          data-testid="search-top-btn"
        />

      </button>
      <form>
        {
          disable ? (
            <input
              data-testid="search-input"
              type="text"
            />
          ) : null
        }
        <label htmlFor="ingredient">
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            id="Ingredient"
            name="Ingredient"
            value="Ingredient"
          />
        </label>
        <label htmlFor="Name">
          <input
            data-testid="name-search-radio"
            type="radio"
            id="Name"
            name="Name"
            value="Name"
          />
        </label>
        <label htmlFor="First letter">
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            id="First letter"
            name="First letter"
            value="First letter"
          />
        </label>
      </form>
      <button
        data-testid="exec-search-btn"
        type="submit"
      >
        Search
      </button>
    </div>
  );
}

export default Searchheader;

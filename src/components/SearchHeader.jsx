import React from 'react';

function Searchheader() {
  return (
    <>
      <form>
        <input
          data-testid="search-input"
          type="text"
        />
        <label htmlFor="ingredient">
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            id="Ingredient"
            name="search-method"
            value="ingredient"
          />
        </label>
        <label htmlFor="Name">
          <input
            data-testid="name-search-radio"
            type="radio"
            id="Name"
            name="search-method"
            value="name"
          />
        </label>
        <label htmlFor="First letter">
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            id="First letter"
            name="search-method"
            value="first-letter"
          />
        </label>
      </form>
      <button
        data-testid="exec-search-btn"
        type="submit"
      >
        Search
      </button>
    </>
  );
}

export default Searchheader;

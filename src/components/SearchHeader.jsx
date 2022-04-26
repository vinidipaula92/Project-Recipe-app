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
    </>
  );
}

export default Searchheader;

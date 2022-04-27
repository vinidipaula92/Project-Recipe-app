import React, { useState } from 'react';

function Searchheader() {
  const [search, setSearchMethod] = useState({
    searchMethod: '',
    searchValue: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setSearchMethod({ ...search, [name]: value });
  };

  async function getApi(link) {
    const response = await fetch(link);
    const data = await response.json();
    console.log(data);
    // return data;
  }

  const handleClick = () => {
    const { searchMethod, searchValue } = search;
    if (searchMethod === 'name') {
      const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
      getApi(URL);
    }
    if (searchMethod === 'ingrediente') {
      const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchValue}`;
      getApi(URL);
    }
    if (searchMethod === 'firstLetter') {
      const URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchValue}`;
      getApi(URL);
    }
  };

  return (
    <>
      <form>
        <input
          data-testid="search-input"
          type="text"
          name="searchValue"
          value={ searchMethod.searchValue }
          onChange={ handleChange }
        />
        <label htmlFor="ingredient">
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            id="Ingredient"
            name="searchMethod"
            value="ingredient"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="Name">
          <input
            data-testid="name-search-radio"
            type="radio"
            id="Name"
            name="searchMethod"
            value="name"
            onClick={ handleChange }
          />
        </label>
        <label htmlFor="First letter">
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            id="First letter"
            name="searchMethod"
            value="firstLetter"
            onClick={ handleChange }
          />
        </label>
      </form>
      <button
        data-testid="exec-search-btn"
        type="submit"
        onClick={ handleClick }
      >
        Search
      </button>
    </>
  );
}

export default Searchheader;

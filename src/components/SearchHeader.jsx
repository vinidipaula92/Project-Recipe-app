import React, { useState } from 'react';
import searchIcon from '../images/searchIcon.svg';

export default function Searchheader() {
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
    return data;
  }

  const handleClick = () => {
    const { searchMethod, searchValue } = search;
    if (searchMethod === 'name') {
      const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
      getApi(URL);
    }
    if (searchMethod === 'ingredient') {
      const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchValue}`;
      getApi(URL);
    }
    if (searchMethod === 'firstLetter') {
      const um = 1;
      const alert = 'Your search must have only 1 (one) character';
      if (searchValue.length > um) {
        global.alert(alert);
      } else {
        const URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchValue}`;
        getApi(URL);
      }
    }
  };
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
      {
        disable ? (
          <>
            <form>
              <input
                data-testid="search-input"
                type="text"
                name="searchValue"
                value={ search.searchValue }
                onChange={ handleChange }
              />
              <div>
                <label htmlFor="ingredient">
                  <input
                    data-testid="ingredient-search-radio"
                    type="radio"
                    id="Ingredient"
                    name="searchMethod"
                    value="ingredient"
                    onChange={ handleChange }
                  />
                  ingredient
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
                  name
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
                  first letter
                </label>
              </div>
            </form>
            <button
              data-testid="exec-search-btn"
              type="submit"
              onClick={ handleClick }
            >
              Search
            </button>

          </>
        ) : null
      }
    </div>
  );
}

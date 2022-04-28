import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import { saveDataDrink, saveDataFood } from '../redux/actions';
import { resquestByDrink, resquestByMeal } from '../services/apiRequest';
import { NUMBER_ONE } from '../services/consts';

export default function Searchheader() {
  const [search, setSearchMethod] = useState({
    searchMethod: '',
    searchValue: '',
  });

  const { pathname } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = ({ target: { name, value } }) => {
    setSearchMethod({ ...search, [name]: value });
  };

  /*   async function getApi(link) {
    const response = await fetch(link);
    const data = await response.json();
    console.log(data);
    return data;
  } */

  /*   const handleClick = () => {
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
  }; */

  const handleClick = async () => {
    const { searchMethod, searchValue } = search;
    let newData = {};
    if (pathname === '/foods') {
      newData = await resquestByMeal(searchMethod, searchValue);
      if (newData.meals.length === NUMBER_ONE) {
        history.push(`/foods/${newData.meals[0].idMeal}`);
        return;
      }
      dispatch(saveDataFood(newData));
    }
    if (pathname === '/drinks') {
      newData = await resquestByDrink(searchMethod, searchValue);
      if (newData.drinks.length === NUMBER_ONE) {
        history.push(`/drinks/${newData.drinks[0].idDrink}`);
        return;
      }
      dispatch(saveDataDrink(newData));
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
                    id="ingredient"
                    name="searchMethod"
                    value="ingredient"
                    onChange={ handleChange }
                  />
                  ingredient
                </label>
                <label htmlFor="name">
                  <input
                    data-testid="name-search-radio"
                    type="radio"
                    id="name"
                    name="searchMethod"
                    value="name"
                    onClick={ handleChange }
                  />
                  name
                </label>
                <label htmlFor="firstLetter">
                  <input
                    data-testid="first-letter-search-radio"
                    type="radio"
                    id="firstLetter"
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

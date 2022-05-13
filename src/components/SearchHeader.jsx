import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import '../css/searchHeader.css';
import searchIcon from '../images/searchIcon.svg';
import { saveDataDrink, saveDataFood } from '../redux/actions';
import { resquestByDrink, resquestByMeal } from '../services/apiRequest';
import { NUMBER_ONE } from '../services/consts';
import CategoriesRender from './CategoriesRender';

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

  const ifRouteFood = async (searchMethod, searchValue) => {
    const newData = await resquestByMeal(searchMethod, searchValue);
    dispatch(saveDataFood(newData));
    if (!newData?.meals) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return;
    }
    if (newData.meals.length === NUMBER_ONE) {
      history.push(`/foods/${newData.meals[0].idMeal}`);
    }
  };

  const ifRouteDrink = async (searchMethod, searchValue) => {
    const newData = await resquestByDrink(searchMethod, searchValue);
    dispatch(saveDataDrink(newData));
    if (!newData?.drinks) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return;
    }
    if (newData.drinks.length === NUMBER_ONE) {
      history.push(`/drinks/${newData.drinks[0].idDrink}`);
    }
  };

  const handleClick = async () => {
    const { searchMethod, searchValue } = search;
    if (pathname === '/foods') {
      ifRouteFood(searchMethod, searchValue);
    } else {
      ifRouteDrink(searchMethod, searchValue);
    }
  };

  const [disable, inputDisable] = useState(false);
  const [click, setClick] = useState(0);

  const handleInput = () => {
    if (click === 0) {
      inputDisable(true);
      setClick(1);
    } else {
      inputDisable(false);
      setClick(0);
    }
  };
  return (
    <div>
      <button
        type="button"
        onClick={ handleInput }
        className="search-button"
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
                className="search-input"
              />
              <div className="container-search">
                <label
                  htmlFor="ingredient"
                  className="search-label"
                >
                  <input
                    data-testid="ingredient-search-radio"
                    type="radio"
                    id="ingredient"
                    name="searchMethod"
                    value="ingredient"
                    onChange={ handleChange }
                    className="search-radio"
                  />
                  ingredient
                </label>
                <label
                  htmlFor="name"
                  className="search-label"
                >
                  <input
                    data-testid="name-search-radio"
                    type="radio"
                    id="name"
                    name="searchMethod"
                    value="name"
                    onClick={ handleChange }
                    className="search-radio"
                  />
                  name
                </label>
                <label
                  htmlFor="firstLetter"
                  className="search-label"
                >
                  <input
                    data-testid="first-letter-search-radio"
                    type="radio"
                    id="firstLetter"
                    name="searchMethod"
                    value="firstLetter"
                    onClick={ handleChange }
                    className="search-radio"
                  />
                  first letter
                </label>
              </div>
            </form>
            <button
              data-testid="exec-search-btn"
              type="submit"
              onClick={ handleClick }
              className="search-button"
            >
              Search
            </button>

          </>
        ) : <CategoriesRender />
      }
    </div>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { requestDrinksCategories,
  requestMealsCategories,
  requestMealsByCategory,
  requestDrinksByCategories,
  requestMeal,
  requestDrinks } from '../services/apiRequest';
import { NUMBER_FIVE } from '../services/consts';
import { saveDataDrink, saveDataFood, addCategorieFilter } from '../redux/actions';

export default function CategoriesRender() {
  const { pathname } = useLocation();
  const [categoriesList, setCategoriesList] = useState([]);
  const dispatch = useDispatch();
  const { categorieFilter } = useSelector((state) => state.dataReducer);

  async function provideCategories() {
    if (pathname === '/drinks') {
      const drinksCategories = await requestDrinksCategories();
      const { drinks } = drinksCategories;
      setCategoriesList(drinks);
    } else if (pathname === '/foods') {
      const mealsCategories = await requestMealsCategories();
      const { meals } = mealsCategories;
      setCategoriesList(meals);
    }
  }

  async function filterCategories({ target }) {
    const { value } = target;
    if (pathname === '/drinks') {
      if (categorieFilter === value) {
        const drinksList = await requestDrinks();
        dispatch(saveDataDrink(drinksList));
        dispatch(addCategorieFilter(''));
      } else {
        const drinksByCategorie = await requestDrinksByCategories(value);
        dispatch(saveDataDrink(drinksByCategorie));
        dispatch(addCategorieFilter(value));
      }
    } else if (pathname === '/foods') {
      if (categorieFilter === value) {
        const mealsList = await requestMeal();
        dispatch(saveDataFood(mealsList));
        dispatch(addCategorieFilter(''));
      } else {
        const mealsByCategorie = await requestMealsByCategory(value);
        dispatch(saveDataFood(mealsByCategorie));
        dispatch(addCategorieFilter(value));
      }
    }
  }

  useEffect(() => {
    provideCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {
        categoriesList.map((element, index) => (
          index < NUMBER_FIVE
          && (
            <button
              type="button"
              data-testid={ `${element.strCategory}-category-filter` }
              key={ element.strCategory }
              value={ element.strCategory }
              onClick={ filterCategories }
            >
              {element.strCategory}
            </button>)
        ))
      }
    </div>
  );
}

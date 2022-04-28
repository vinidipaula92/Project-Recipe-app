/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { requestDrinksCategories,
  requestMealsCategories,
  requestMealsByCategory,
  requestDrinksByCategories } from '../services/apiRequest';
import { NUMBER_FIVE } from '../services/consts';
import { saveDataDrink, saveDataFood } from '../redux/actions';

export default function CategoriesRender() {
  const { pathname } = useLocation();
  const [categoriesList, setCategoriesList] = useState([]);
  const dispatch = useDispatch();

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
      const drinksByCategorie = await requestDrinksByCategories(value);
      dispatch(saveDataDrink(drinksByCategorie));
    } else if (pathname === '/foods') {
      const mealsByCategorie = await requestMealsByCategory(value);
      dispatch(saveDataFood(mealsByCategorie));
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

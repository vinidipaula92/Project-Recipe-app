/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { requestDrinksCategories, requestMealsCategories } from '../services/apiRequest';
import { NUMBER_FIVE } from '../services/consts';

export default function CategoriesRender() {
  const { pathname } = useLocation();
  const [categoriesList, setCategoriesList] = useState([]);

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

  useEffect(() => {
    provideCategories();
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
            >
              {element.strCategory}
            </button>)
        ))
      }
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { addCategorieFilter, saveDataFood } from '../redux/actions';
import {
  requestExploreIngredientFood, resquestByMeal
} from '../services/apiRequest';
import { NUMBER_ELEVEN } from '../services/consts';
/* eslint comma-dangle: ["error", "never"] */

export default function ExploreFoodByIngredient() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const { meals } = useSelector((state) => state.dataReducer.dataFood);

  async function askApi() {
    const mealsList = await requestExploreIngredientFood();
    dispatch(saveDataFood(mealsList));
    setLoading(false);
  }
  useEffect(() => {
    askApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCick = async ({ target }) => {
    const { value } = target;
    if (pathname === '/explore/foods/ingredients') {
      const mealsByCategorie = await resquestByMeal('ingredient', value);
      dispatch(saveDataFood(mealsByCategorie));
      dispatch(addCategorieFilter(value));
    }
    history.push('/foods');
  };

  return (
    <div>
      <Header />
      <span data-testid="page-title">Explore Ingredients</span>
      <div data-testid="ingredient-container">
        {
          loading ? <p>Loading...</p> : (
            <div>
              {
                meals && meals.map((ingredient, index) => (
                  index <= NUMBER_ELEVEN && (
                    <div>
                      <div
                        key={ ingredient.idMeal }
                        value={ ingredient.strIngredient }

                      >
                        <img
                          data-testid={ `${index}-card-img` }
                          src={ `https://www.themealdb.com/images/ingredients/${ingredient
                            .strIngredient}-Small.png` }
                          alt="recipes cards"
                        />
                      </div>
                      <p
                        data-testid={ `${index}-card-name` }
                      >
                        {ingredient.strIngredient}
                      </p>
                      <button
                        type="button"
                        onClick={ handleCick }
                        value={ ingredient.strIngredient }
                        data-testid={ `${index}-ingredient-card` }
                      >
                        {' '}
                        { ingredient.strIngredient }
                      </button>
                    </div>
                  )))
              }
            </div>
          )
        }
      </div>
      <Footer />
    </div>
  );
}

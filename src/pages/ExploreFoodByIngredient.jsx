import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../css/Explore.css';
import Pedrin from '../images/Pedrin.png';
import { addCategorieFilter, saveDataFood } from '../redux/actions';
import { requestExploreIngredientFood, resquestByMeal } from '../services/apiRequest';
import { NUMBER_ELEVEN } from '../services/consts';

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
    <div className="container">
      <div className="explore-header">
        <Header />
        <Link to="/">
          <img src={ Pedrin } alt="logo" width="50px" />
        </Link>
        <span data-testid="page-title">Explore Ingredients</span>
      </div>
      <div
        data-testid="ingredient-container"
      >
        {
          loading ? <p>Loading...</p> : (
            <div className="ingredient">
              {
                meals && meals.map((ingredient, index) => (
                  index <= NUMBER_ELEVEN && (
                    <div
                      key={ index }
                      value={ ingredient.strIngredient }
                      className="ingredient-container"
                    >
                      <img
                        data-testid={ `${index}-card-img` }
                        src={ `https://www.themealdb.com/images/ingredients/${ingredient
                          .strIngredient}-Small.png` }
                        alt="recipes cards"
                      />
                      <button
                        type="button"
                        onClick={ handleCick }
                        value={ ingredient.strIngredient }
                        data-testid={ `${index}-ingredient-card` }
                        className="btn-ingredient"
                      >
                        <p>
                          {' '}
                          { ingredient.strIngredient }
                        </p>
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

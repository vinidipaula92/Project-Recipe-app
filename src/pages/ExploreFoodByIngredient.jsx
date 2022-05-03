import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { saveDataFood } from '../redux/actions';
import { requestExploreIngredientFood } from '../services/apiRequest';
import { NUMBER_ELEVEN } from '../services/consts';

export default function ExploreFoodByIngredient() {
  const [loading, setLoading] = useState(true);
  const { meals } = useSelector((state) => state.dataReducer.dataFood);
  const dispatch = useDispatch();

  async function askApi(props) {
    console.log(props);
    const mealsList = await requestExploreIngredientFood();
    dispatch(saveDataFood(mealsList));
    setLoading(false);
  }
  useEffect(() => {
    askApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                      <Link to="/foods">

                        <div
                          data-testid={ `${index}-ingredient-card` }
                          key={ ingredient.idMeal }

                        >
                          <img
                            data-testid={ `${index}-card-img` }
                            src={ `https://www.themealdb.com/images/ingredients/${ingredient
                              .strIngredient}-Small.png` }
                            alt="recipes cards"
                          />
                          <p
                            data-testid={ `${index}-card-name` }
                          >
                            {ingredient.strIngredient}

                          </p>
                        </div>
                      </Link>
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

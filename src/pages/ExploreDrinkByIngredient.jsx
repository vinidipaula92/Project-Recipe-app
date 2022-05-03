import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { saveDataDrink } from '../redux/actions';
import { requestExploreIngredientDrink } from '../services/apiRequest';
import { NUMBER_ELEVEN } from '../services/consts';

export default function ExploreDrinkByIngredient() {
  const [loading, setLoading] = useState(true);
  const { drinks } = useSelector((state) => state.dataReducer.dataDrink);
  const dispatch = useDispatch();
  // const [ingredient, setIngredient] = useState([]);

  async function askApi() {
    const drinksList = await requestExploreIngredientDrink();
    dispatch(saveDataDrink(drinksList));
    setLoading(false);
    // setIngredient(drinksList);
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
                drinks.map((drink, index) => (
                  index <= NUMBER_ELEVEN && (
                    <div
                      data-testid={ `${index}-ingredient-card` }
                      key={ index }
                    >
                      <img
                        data-testid={ `${index}-card-img` }
                        src={ `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png` }
                        alt="recipes cards"
                      />
                      <Link
                        data-testid={ `${index}-recipe-card` }
                        to={ `/drinks/${drink.strIngredient1}` }
                      >
                        <p data-testid={ `${index}-card-name` }>
                          {drink.strIngredient1}

                        </p>
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

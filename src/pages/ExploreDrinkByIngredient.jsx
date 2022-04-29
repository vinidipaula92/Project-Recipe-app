import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { saveDataDrink } from '../redux/actions';
import { requestDrinks } from '../services/apiRequest';
import { NUMBER_ELEVEN } from '../services/consts';

export default function ExploreDrinkByIngredient() {
  const [loading, setLoading] = useState(true);
  const { drinks } = useSelector((state) => state.dataReducer.dataDrink);
  const dispatch = useDispatch();
  const [drink, setDrink] = useState({});

  async function askApi() {
    const drinksList = await requestDrinks();
    dispatch(saveDataDrink(drinksList));
    setLoading(false);
    setDrink(drinksList.drinks[0]);
  }
  useEffect(() => {
    askApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [console.log(drinks)]);

  // const ingredients = Object
  //   .keys(meals).filter((key) => key.includes('strIngredient'));
  // console.log(ingredients);

  const ingredients = Object.keys(drink).filter((key) => key.includes('strIngredient'));
  return (
    <div>
      <Header />
      <span data-testid="page-title">Explore Ingredients</span>
      <div data-testid="ingredient-container">
        {
          loading ? <p>Loading...</p> : (
            <div>
              {
                ingredients.map((ingredient, index) => (drink[ingredient] !== ''
                  && (
                    index <= NUMBER_ELEVEN && (
                      <div
                        data-testid={ `${index}-ingredient-card` }
                        key={ ingredient.idDrink }
                      >
                        <img
                          data-testid={ `${index}-card-img` }
                          src={ `https://www.themealdb.com/images/ingredients/${drink[ingredient]}-Small.png` }
                          alt="recipes cards"
                        />
                        <Link
                          data-testid={ `${index}-recipe-card` }
                          to={ `/drinks/${drink[ingredient]}` }
                        >
                          <p data-testid={ `${index}-card-name` }>{drink[ingredient]}</p>
                        </Link>
                      </div>
                    ))))
              }
            </div>
          )
        }
      </div>
      <Footer />
    </div>
  );
}

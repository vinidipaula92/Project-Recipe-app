import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { saveDataFood } from '../redux/actions';
import { requestMeal } from '../services/apiRequest';
import { NUMBER_ELEVEN } from '../services/consts';

export default function ExploreFoodByIngredient() {
  const [loading, setLoading] = React.useState(true);
  const { meals } = useSelector((state) => state.dataReducer.dataFood);
  const dispatch = useDispatch();
  const [foods, setFoods] = useState({});

  async function askApi() {
    const mealsList = await requestMeal();
    dispatch(saveDataFood(mealsList));
    setLoading(false);
    setFoods(mealsList.meals[0]);
  }
  useEffect(() => {
    askApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [console.log(meals)]);

  // const ingredients = Object
  //   .keys(meals).filter((key) => key.includes('strIngredient'));
  // console.log(ingredients);

  const ingredients = Object.keys(foods).filter((key) => key.includes('strIngredient'));
  const idFood = foods.idMeal;
  console.log(ingredients);
  console.log(foods);
  console.log(idFood);
  return (
    <div>
      <Header />
      <span data-testid="page-title">Explore Ingredients</span>
      <div data-testid="ingredient-container">
        {
          loading ? <p>Loading...</p> : (
            <div>
              {
                ingredients.map((ingredient, index) => (foods[ingredient] !== ''
                  && (
                    index <= NUMBER_ELEVEN && (
                      <div
                        data-testid={ `${index}-ingredient-card` }
                        key={ ingredient.idMeal }
                      >
                        <img
                          data-testid={ `${index}-card-img` }
                          src={ `https://www.themealdb.com/images/ingredients/${foods[ingredient]}-Small.png` }
                          alt="recipes cards"
                        />
                        <Link
                          data-testid={ `${index}-recipe-card` }
                          to={ `/foods/${foods[ingredient]}` }
                        >
                          <p data-testid={ `${index}-card-name` }>{foods[ingredient]}</p>
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

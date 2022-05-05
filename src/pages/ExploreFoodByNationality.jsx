import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { nationality, requestFoodNationality, requestMeal } from '../services/apiRequest';
import { NUMBER_ELEVEN } from '../services/consts';

export default function ExploreFoodByNationality() {
  const [loading, setLoading] = useState(true);
  const [native, setNative] = useState([]);
  const [recipe, setRecipe] = useState([]);
  // const [allMeal, setAllMeal] = useState([]);

  async function askApi() {
    const response = await nationality();
    setRecipe(response.meals);
    const mealsListFood = await requestMeal();
    setNative(mealsListFood.meals);
    setLoading(false);
  }

  const handleChange = async ({ target }) => {
    const { value } = target;
    if (value === 'All') {
      const mealsListFood = await requestMeal();
      setNative(mealsListFood.meals);
    }
    const mealsListFood = await requestFoodNationality(value);
    setNative(mealsListFood.meals);
    console.log(native);
    console.log(value);
  };

  useEffect(() => {
    askApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <span data-testid="page-title">Explore Nationalities</span>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <select
          data-testid="explore-by-nationality-dropdown"
          onChange={ handleChange }
        >
          <option data-testid="All-option">All</option>
          {recipe
            && recipe.map((nacionalidade, index) => (
              <option
                data-testid={ `${nacionalidade.strArea}-option` }
                key={ index }
                value={ nacionalidade.strArea }
              >
                {nacionalidade.strArea}
              </option>
            ))}
        </select>
      )}
      {native
        && native.map(
          (meal, index) => index <= NUMBER_ELEVEN && (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <Link to={ `/foods/${meal.idMeal}` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ meal.strMealThumb }
                  alt="recipes cards"
                />
                <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
              </Link>
            </div>
          ),
        )}
      <Footer />
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Searchheader from '../components/SearchHeader';
import '../css/Explore.css';
import Pedrin from '../images/Pedrin.png';
import { nationality, requestFoodNationality, requestMeal } from '../services/apiRequest';
import { NUMBER_ELEVEN } from '../services/consts';

export default function ExploreFoodByNationality() {
  const [loading, setLoading] = useState(true);
  const [native, setNative] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [allMeal, setAllMeal] = useState([]);

  async function askApi() {
    const response = await nationality();
    setRecipe(response.meals);
    const mealsListFood = await requestMeal();
    setNative(mealsListFood.meals);
    setAllMeal(mealsListFood.meals);
    setLoading(false);
  }

  const handleChange = async ({ target }) => {
    const { value } = target;
    if (value !== 'All') {
      const data = await requestFoodNationality(value);
      setNative(data.meals);
      console.log(data);
    } else {
      setNative(allMeal);
    }
  };

  useEffect(() => {
    askApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <div className="explore-header">
        <Header />
        <Link to="/">
          <img src={ Pedrin } alt="logo" width="50px" />
        </Link>
        <span data-testid="page-title">Explore Nationalities</span>
      </div>
      <Searchheader />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <select
          data-testid="explore-by-nationality-dropdown"
          onChange={ handleChange }
          className="select-nationality"
        >
          <option
            data-testid="All-option"
            value="All"
          >
            All

          </option>
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
            <div
              key={ index }
              data-testid={ `${index}-recipe-card` }
              className="recipe-card"
            >
              <Link
                to={ `/foods/${meal.idMeal}` }
                className="recipe-card-link"
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ meal.strMealThumb }
                  alt="recipes cards"
                  className="card-img"
                />
                <p
                  data-testid={ `${index}-card-name` }
                  className="card-name"
                >
                  {meal.strMeal}

                </p>
              </Link>
            </div>
          ),
        )}
      <Footer />
    </div>
  );
}

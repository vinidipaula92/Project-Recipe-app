import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function RecipeDone() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    setRecipes(localStorage.getItem('doneRecipes'));
  }, []);

  return (
    <div>
      <Header />
      <span data-testid="page-title">Done Recipes</span>
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>

      {
        recipes
      && recipes.map((recipe, index) => (
        recipe.type === 'food'
          ? (
            <div key={ recipe.idMeal }>
              <Link to={ `/foods/${recipe.idMeal}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.strMealThumb }
                  alt={ recipe.strMeal }
                />
                <h1 data-testid={ `${index}-horizontal-name` }>{recipe.strMeal}</h1>
                <p data-testid={ `${index}-horizontal-top-text` }>{recipe.strCategory}</p>
                <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
                <p data-testid={ `${index}-horizontal-done-share-btn` }>share</p>
                <p data-testid={ `${index}-${tagName}horizontal-tag` }>tag</p>
              </Link>
            </div>
          )
          : (
            <div key={ recipe.idDrink }>
              <Link to={ `/drinks/${recipe.idDrink}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.strDrinkThumb }
                  alt={ recipe.strDrink }
                />
                <h1 data-testid={ `${index}-horizontal-name` }>{recipe.strDrink}</h1>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {recipe.strAlcoholic}
                </p>
                <p data-testid={ `${index}-horizontal-done-date` }>
                  {recipe.doneDate}
                </p>
                <p data-testid={ `${index}-horizontal-done-share-btn` }>share</p>
                <p data-testid={ `${index}-${tagName}horizontal-tag` }>tag</p>
              </Link>
            </div>
          )
      ))
      }
    </div>
  );
}

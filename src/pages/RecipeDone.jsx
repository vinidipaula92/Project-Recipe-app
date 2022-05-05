import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonShare from '../components/ButtonShare';
import Header from '../components/Header';

export default function RecipeDone() {
  const [recipes, setRecipes] = useState([]);
  const [localRecipes, setLocalRecipes] = useState([]);

  useEffect(() => {
    const getDoneRecipes = () => {
      const doneRecipes = localStorage.getItem('doneRecipes');
      console.log(JSON.parse(doneRecipes));
      if (doneRecipes) {
        setRecipes(JSON.parse(doneRecipes));
        setLocalRecipes(JSON.parse(doneRecipes));
      }
    };
    getDoneRecipes();
  }, []);

  const handleFood = () => {
    setRecipes(localRecipes.filter((recipe) => recipe.type === 'food'));
  };

  const handleDrink = () => {
    setRecipes(localRecipes.filter((recipe) => recipe.type === 'drink'));
  };

  const handleAll = () => {
    setRecipes(localRecipes);
  };

  return (
    <div>
      <Header />
      <span data-testid="page-title">Done Recipes</span>
      <button
        onClick={ handleFood }
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        onClick={ handleDrink }
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <button
        onClick={ handleAll }
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>

      {
        recipes && recipes.map((recipe, index) => (
          <div key={ recipe.id }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <div>
                <h1 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h1>
                <img
                  width="300px"
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.name }
                />
              </div>
            </Link>
            { recipe.type === 'food' ? (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`${recipe?.nationality} - ${recipe?.category}`}
              </p>
            ) : (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {recipe?.alcoholicOrNot}
              </p>
            ) }
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <ButtonShare
              index={ index }
              recipes={ recipe }
            />
            {recipe.tags.map((tag) => (
              <p
                key={ `${index}-${tag}horizontal-tag` }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {recipe.tags}
              </p>
            ))}

          </div>
        ))
      }
    </div>
  );
}

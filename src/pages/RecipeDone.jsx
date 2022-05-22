import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonShare from '../components/ButtonShare';
import Header from '../components/Header';
import '../css/Explore.css';
import '../css/RecipeDone.css';
import Pedrin from '../images/Pedrin.png';

export default function RecipeDone() {
  const [recipes, setRecipes] = useState([]);
  const [localRecipes, setLocalRecipes] = useState([]);

  useEffect(() => {
    const getDoneRecipes = () => {
      const doneRecipes = localStorage.getItem('doneRecipes');
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
    <div className="container">
      <div className="explore-header">
        <Header />
        <Link to="/">
          <img src={ Pedrin } alt="logo" width="50px" />
        </Link>
        <span data-testid="page-title">Done Recipes</span>
      </div>
      <button
        onClick={ handleFood }
        type="button"
        data-testid="filter-by-food-btn"
        className="btn-filter-by-food"
      >
        Food
      </button>
      <button
        onClick={ handleDrink }
        type="button"
        data-testid="filter-by-drink-btn"
        className="btn-filter-by-drink"
      >
        Drinks
      </button>
      <button
        onClick={ handleAll }
        type="button"
        data-testid="filter-by-all-btn"
        className="btn-filter-by-all"
      >
        All
      </button>

      {
        recipes.length && recipes.map((recipe, index) => {
          console.log('dentro do map', recipe);
          return (
            <div
              key={ recipe.id }
            >
              <Link
                to={ `/${recipe.type}s/${recipe.id}` }
                className="link-favorite"
              >
                <div className="container-favorite">
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
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                  className="horizontal-top-text"
                >
                  {`${recipe?.nationality} - ${recipe?.category}`}
                </p>
              ) : (
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                  className="horizontal-top-text"
                >
                  {recipe?.alcoholicOrNot}
                </p>
              ) }
              <p
                data-testid={ `${index}-horizontal-done-date` }
                className="horizontal-done-date"
              >
                {recipe.doneDate}

              </p>
              <ButtonShare
                index={ index }
                recipes={ recipe }
              />
              {recipe.tags && recipe.tags.map((tag) => (
                <p
                  key={ `${index}-${tag}-horizontal-tag` }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                  className="horizontal-tag"
                >
                  {tag}
                </p>
              ))}

            </div>
          );
        })
      }
    </div>
  );
}

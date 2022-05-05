/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ButtonShare from '../components/ButtonShare';
import FavoriteButton from '../components/FavoriteButton';
import '../css/progress.css';
import { requestFoodRecipeById } from '../services/apiRequest';
import { recipeDispatch } from '../redux/actions';

export default function ProgressFood() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);

  const getRecipeById = async () => {
    const { meals } = await requestFoodRecipeById(id);
    setRecipe(meals[0]);
    setLoading(false);
    dispatch(recipeDispatch(meals[0]));
  };

  useEffect(() => {
    getRecipeById();
  }, []);

  const ingredients = Object.keys(recipe)
    .filter((key) => key.includes('strIngredient'));

  const measure = Object.keys(recipe)
    .filter((key) => key.includes('strMeasure'));

  const handleClick = () => {
    console.log('legal fera');
  };

  return (
    <div>
      {
        loading ? <p>Loading...</p> : (
          <div>
            <div>
              <img
                data-testid="recipe-photo"
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
              />
              <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
            </div>
            <div>
              <ButtonShare recipes={ recipe } />
              <FavoriteButton recipe={ recipe } />
            </div>
            <p data-testid="recipe-category">{recipe.strCategory}</p>
            <h3>Ingredients</h3>
            {
              ingredients.map((ingredient, index) => (recipe[ingredient] !== ''
                && recipe[ingredient] !== null
                && recipe[measure[index]] !== null
                && (
                  <p>
                    <label
                      key={ `${index}` }
                      htmlFor={ `${index}-ingredient-step` }
                      data-testid={ `${index}-ingredient-step` }
                    >
                      <input
                        type="checkbox"
                        id={ `${index}-ingredient-step` }
                        value={ `${ingredient} ${measure[index]}` }
                        checked={ false }
                      />
                      {`${recipe[ingredient]} - ${recipe[measure[index]]}`}
                    </label>
                  </p>
                )
              ))
            }
            <h3>Instructions</h3>
            <p data-testid="instructions">{recipe.strInstructions}</p>
            <button
              type="button"
              data-testid="finish-recipe-btn"
              onClick={ handleClick }
            >
              Finish
            </button>
          </div>
        )
      }
    </div>
  );
}

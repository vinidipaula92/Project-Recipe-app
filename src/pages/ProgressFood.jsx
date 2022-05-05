/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ButtonShare from '../components/ButtonShare';
import FavoriteButton from '../components/FavoriteButton';
import '../css/progress.css';
import { requestFoodRecipeById } from '../services/apiRequest';

export default function ProgressFood() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  // const [isChecked, setIsChecked] = useState(false);

  const getRecipeById = async () => {
    const { meals } = await requestFoodRecipeById(id);
    setRecipe(meals[0]);
    setLoading(false);
  };

  useEffect(() => {
    getRecipeById();
  }, []);

  const ingredients = Object.keys(recipe)
    .filter((key) => key.includes('strIngredient'));

  const measure = Object.keys(recipe)
    .filter((key) => key.includes('strMeasure'));

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
              <ButtonShare />
              <FavoriteButton />
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
                        // value={ `${ingredient} ${measure[index]}` }
                        // checked={ false }
                        // onChange={ functio }
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
            >
              Finish
            </button>
          </div>
        )
      }
    </div>
  );
}

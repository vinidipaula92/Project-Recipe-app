/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ButtonShare from '../components/ButtonShare';
import FavoriteButton from '../components/FavoriteButton';
import '../css/progress.css';
import { requestDrinkRecipeById } from '../services/apiRequest';
import { drinkRecipeDispatch } from '../redux/actions';

export default function ProgressDrink() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [drinkRecipe, setDrinkRecipe] = useState({});
  const [loading, setLoading] = useState(true);

  const getRecipeById = async () => {
    const { drinks } = await requestDrinkRecipeById(id);
    setDrinkRecipe(drinks[0]);
    setLoading(false);
    dispatch(drinkRecipeDispatch(drinks[0]));
  };

  useEffect(() => {
    getRecipeById();
  }, []);

  const ingredients = Object.keys(drinkRecipe)
    .filter((key) => key.includes('strIngredient'));

  const measure = Object.keys(drinkRecipe)
    .filter((key) => key.includes('strMeasure'));

  return (
    <div>
      {
        loading ? <p>Loading...</p> : (
          <div>
            <div>
              <img
                data-testid="recipe-photo"
                src={ drinkRecipe.strDrinkThumb }
                alt={ drinkRecipe.strDrink }
              />
              <h1 data-testid="recipe-title">{drinkRecipe.strDrink}</h1>
            </div>
            <div>
              <ButtonShare recipes={ drinkRecipe } />
              <FavoriteButton recipe={ drinkRecipe } />
            </div>
            <p data-testid="recipe-category">{drinkRecipe.strAlcoholic}</p>
            <h3>Ingredients</h3>
            {
              ingredients.map((ingredient, index) => (drinkRecipe[ingredient] !== ''
              && drinkRecipe[ingredient] !== null
              && drinkRecipe[measure[index]] !== null
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
                      />
                      {`${drinkRecipe[ingredient]} - ${drinkRecipe[measure[index]]}`}
                    </label>
                  </p>
                )
              ))
            }
            <h3>Instructions</h3>
            <p data-testid="instructions">{drinkRecipe.strInstructions}</p>
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

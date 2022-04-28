import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { requestFoodRecipeById } from '../services/apiRequest';

export default function DetailsFood() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);

  const getRecipeById = async () => {
    const { meals } = await requestFoodRecipeById(id);
    setRecipe(meals[0]);
    setLoading(false);
  };

  useEffect(() => {
    getRecipeById();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ingredients = Object.keys(recipe).filter((key) => key.includes('strIngredient'));
  const measure = Object.keys(recipe).filter((key) => key.includes('strMeasure'));
  console.log(ingredients, measure);
  return (
    <div>
      {
        loading ? <p>Loading...</p> : (
          <div>
            <img
              data-testid="recipe-photo"
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
            />
            <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
            <button type="button" data-testid="share-btn">Share</button>
            <button type="button" data-testid="favorite-btn">Favorite</button>
            <p data-testid="recipe-category">{recipe.strCategory}</p>
            {
              ingredients.map((ingredient, index) => (recipe[ingredient] !== ''
                && (
                  <p
                    key={ ingredient }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {`${recipe[ingredient]} - ${recipe[measure[index]]}`}
                  </p>
                )
              ))
            }
            <p data-testid="instructions">{recipe.strInstructions}</p>
            <video width="320" height="240" controls data-testid="video">
              <source src={ recipe.strYoutube } type="video/mp4" />
              <track
                src="captions_en.vtt"
                kind="captions"
                srcLang="en"
                label="english_captions"
              />
              Your browser does not support the video tag.
            </video>

            <p data-testid={ `${0}-recomendation-card` }>Card recomedações faze depois</p>

            <button type="button" data-testid="start-recipe-btn">Start</button>
          </div>
        )
      }

    </div>
  );
}

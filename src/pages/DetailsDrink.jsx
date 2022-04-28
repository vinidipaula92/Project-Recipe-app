import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { requestDrinkRecipeById } from '../services/apiRequest';

export default function DetailsDrink() {
  const { id } = useParams();
  const [drinkRecipe, setDrinkRecipe] = useState({});
  const [loading, setLoading] = useState(true);

  const getRecipeById = async () => {
    const { drinks } = await requestDrinkRecipeById(id);
    setDrinkRecipe(drinks[0]);
    setLoading(false);
  };

  useEffect(() => {
    getRecipeById();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ingredients = Object.keys(drinkRecipe)
    .filter((key) => key.includes('strIngredient'));
  const measure = Object.keys(drinkRecipe).filter((key) => key.includes('strMeasure'));

  console.log(drinkRecipe);

  return (
    <div>
      {
        loading ? <p>Loading...</p> : (
          <div>
            <img
              data-testid="recipe-photo"
              src={ drinkRecipe.strDrinkThumb }
              alt={ drinkRecipe.strDrink }
            />
            <h1 data-testid="recipe-title">{drinkRecipe.strDrink}</h1>
            <button type="button" data-testid="share-btn">Share</button>
            <button type="button" data-testid="favorite-btn">Favorite</button>
            <p data-testid="recipe-category">{drinkRecipe.strCategory}</p>
            {
              ingredients.map((ingredient, index) => (drinkRecipe[ingredient]
                && (
                  <p
                    key={ ingredient }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {`${drinkRecipe[ingredient]} - ${drinkRecipe[measure[index]]}`}
                  </p>
                )
              ))
            }
            <p data-testid="instructions">{drinkRecipe.strInstructions}</p>
            <video width="320" height="240" controls data-testid="video">
              <source src={ drinkRecipe.strVideo } type="video/mp4" />
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

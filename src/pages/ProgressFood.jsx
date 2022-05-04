/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import ButtonShare from '../components/ButtonShare';
import FavoriteButton from '../components/FavoriteButton';
import '../css/progress.css';

export default function ProgressFood() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  // const [add, setAdd] = useState(false);
  // const [count, setCount] = useState(0);

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

  // const handleClick = () => {
  //   if (count === 0) {
  //     setAdd(true);
  //     setCount(1);
  //   } else {
  //     setAdd(false);
  //     setCount(0);
  //   }
  // };

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
            {
              ingredients.map((ingredient, index) => (recipe[ingredient] !== ''
                && (
                  <checkbox
                    key={ ingredient }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    {`${recipe[measure[index]]} - ${recipe[ingredient]}`}
                  </checkbox>
                )
              ))
            }
          </div>
        )
      }
    </div>
  );
}

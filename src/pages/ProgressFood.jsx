/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import ButtonShare from '../components/ButtonShare';
import FavoriteButton from '../components/FavoriteButton';
import '../css/progress.css';
import { recipeDispatch } from '../redux/actions';
import ProgressCheckbox from '../components/ProgressCheckbox';
import { requestFoodRecipeById } from '../services/apiRequest';
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
    // const ingredientes = Object.keys(recipe)
    //   .filter((key) => key.includes('strIngredient'));
    // console.log(ingredientes);
  };

  const ingredients = Object.keys(recipe)
    .filter((key) => key.includes('strIngredient'));

  const measure = Object.keys(recipe)
    .filter((key) => key.includes('strMeasure'));

  useEffect(() => {
    getRecipeById();
  }, []);

  // const handleChange = ({ target: { checked, name } }) => {
  //   console.log(isChecked);
  //   console.log(checked);
  //   console.log(name);
  //   if (checked) {
  //     setIsChecked(
  //       ...isChecked,
  //       { [name]: true },
  //     );
  //   } else {
  //     setIsChecked({
  //       ...isChecked,
  //       [name]: false,
  //     });
  //   }
  // };

  const handleClick = () => {
    console.log('legal fera');
  };

  return (
    <div className="container">
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
                  <ProgressCheckbox
                    recipe={ recipe }
                    ingredient={ ingredient }
                    measure={ measure }
                    index={ index }
                  />
                )
              ))
            }
            <h3>Instructions</h3>
            <p data-testid="instructions">{recipe.strInstructions}</p>
            <Link to="/done-recipes">
              <button
                type="button"
                data-testid="finish-recipe-btn"
                onClick={ handleClick }
              >
                Finish
              </button>
            </Link>
          </div>
        )
      }
    </div>
  );
}

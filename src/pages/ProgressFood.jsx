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
  const [isChecked, setIsChecked] = useState([]);

  const addCheckBox = (ingredientes) => {
    ingredientes.map((_qualquer, index) => {
      setIsChecked({
        ...isChecked,
        [index]: false });
      return null;
    });
    console.log(isChecked);
  };

  const getRecipeById = async () => {
    const ingredientes = Object.keys(recipe)
      .filter((key) => key.includes('strIngredient'));
    const { meals } = await requestFoodRecipeById(id);
    setRecipe(meals[0]);
    setLoading(false);
    dispatch(recipeDispatch(meals[0]));
    addCheckBox(ingredientes);
  };

  const ingredients = Object.keys(recipe)
    .filter((key) => key.includes('strIngredient'));

  const measure = Object.keys(recipe)
    .filter((key) => key.includes('strMeasure'));

  useEffect(() => {
    getRecipeById();
  }, []);

  const handleChange = ({ target: { checked, name } }) => {
    console.log(isChecked);
    console.log(checked);
    console.log(name);
    if (checked) {
      setIsChecked(
        ...isChecked,
        { [name]: true },
      );
    } else {
      setIsChecked({
        ...isChecked,
        [name]: false,
      });
    }
  };

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
                      htmlFor={ index }
                      data-testid={ `${index}-ingredient-step` }
                    >
                      <input
                        type="checkbox"
                        id={ index }
                        value={ `${ingredient} ${measure[index]}` }
                        checked={ isChecked[index] }
                        onChange={ (event) => handleChange(event) }
                        name={ index }
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

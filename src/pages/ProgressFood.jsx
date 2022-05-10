/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import ButtonShare from '../components/ButtonShare';
import FavoriteButton from '../components/FavoriteButton';
import '../css/progress.css';
import { recipeDispatch } from '../redux/actions';
import { requestFoodRecipeById } from '../services/apiRequest';

export default function ProgressFood() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [isChecked, setIsChecked] = useState([]);
  const [done, setDone] = useState(true);

  const getRecipeById = async () => {
    const { meals } = await requestFoodRecipeById(id);
    setRecipe(meals[0]);
    setLoading(false);
    dispatch(recipeDispatch(meals[0]));
  };

  const ingredients = Object.keys(recipe)
    .filter((key) => key.includes('strIngredient'));
  const measure = Object.keys(recipe)
    .filter((key) => key.includes('strMeasure'));

  useEffect(() => {
    getRecipeById();
  }, []);

  useEffect(() => {
    setDone(!done);
  }, [isChecked]);

  const localStoragePrepare = () => {
    const ingredientMap = ingredients
      .filter((ingredient) => recipe[ingredient] !== null
      && recipe[ingredient] !== '');
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const arrayChecks = [...ingredientMap];
    setIsChecked(arrayChecks);
    if (inProgressRecipes === null) {
      const recipeSave = {
        cocktails: {},
        meals: {
          [recipe.idMeal]: ingredientMap,
          [`${recipe.idMeal}checks`]: arrayChecks
            .fill(false, 0, ingredientMap.length),
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(recipeSave));
    } else if (!inProgressRecipes.meals[recipe.idMeal]) {
      inProgressRecipes.meals[recipe.idMeal] = ingredientMap;
      inProgressRecipes.meals[`${recipe.idMeal}checks`] = arrayChecks
        .fill(false, 0, ingredientMap.length);
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    } else {
      setIsChecked(inProgressRecipes.meals[`${recipe.idMeal}checks`]);
    }
  };

  useEffect(() => {
    localStoragePrepare();
  }, [recipe]);

  const handleClick = () => {
    const localRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    delete localRecipe.meals[recipe.idMeal];
    delete localRecipe.meals[`${recipe.idMeal}checks`];
    localStorage.setItem('inProgressRecipes', JSON.stringify(localRecipe));

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const storeRecipe = {
      id,
      type: 'Food',
      nationality: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
      doneDate: '',
      tags: recipe.strTags.split(','),
    };
    if (doneRecipes) {
      doneRecipes.push(storeRecipe);
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    } else {
      const finishedRecipe = [storeRecipe];
      localStorage.setItem('doneRecipes', JSON.stringify(finishedRecipe));
    }
  };

  const handleChange = ({ target: { checked, name } }) => {
    const temp = [...isChecked];
    temp[name] = checked;

    setIsChecked([
      ...temp,
    ]);
    const localRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    localRecipe.meals[`${recipe.idMeal}checks`] = [...temp];
    localStorage.setItem('inProgressRecipes', JSON.stringify(localRecipe));
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
              isChecked && ingredients
                .map((ingredient, index) => (recipe[ingredient] !== ''
                && recipe[ingredient] !== null
                && recipe[measure[index]] !== null
                && (
                  <p key={ `${index}-ingredient-step` }>
                    <label
                      htmlFor={ `${index}-ingredient-step` }
                      data-testid={ `${index}-ingredient-step` }
                    >
                      <input
                        type="checkbox"
                        id={ `${index}-ingredient-step` }
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
            <Link to="/done-recipes">
              <button
                type="button"
                data-testid="finish-recipe-btn"
                disabled={ !isChecked.every((check) => check) }
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

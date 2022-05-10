/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import ButtonShare from '../components/ButtonShare';
import FavoriteButton from '../components/FavoriteButton';
import '../css/progress.css';
import { drinkRecipeDispatch } from '../redux/actions';
import { requestDrinkRecipeById } from '../services/apiRequest';

export default function ProgressDrink() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [drinkRecipe, setDrinkRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [isChecked, setIsChecked] = useState([]);
  const [done, setDone] = useState(true);

  const getRecipeById = async () => {
    const { drinks } = await requestDrinkRecipeById(id);
    setDrinkRecipe(drinks[0]);
    setLoading(false);
    dispatch(drinkRecipeDispatch(drinks[0]));
  };

  const ingredients = Object.keys(drinkRecipe)
    .filter((key) => key.includes('strIngredient'));
  const measure = Object.keys(drinkRecipe)
    .filter((key) => key.includes('strMeasure'));

  useEffect(() => {
    getRecipeById();
  }, []);

  useEffect(() => {
    setDone(!done);
  }, [isChecked]);

  const localStoragePrepare = () => {
    const ingredientMap = ingredients
      .filter((ingredient) => drinkRecipe[ingredient] !== '');
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const arrayChecks = [...ingredientMap];
    setIsChecked(arrayChecks);
    if (inProgressRecipes === null) {
      const recipeSave = {
        cocktails: {
          [drinkRecipe.idDrink]: ingredientMap,
          [`${drinkRecipe.idDrink}checks`]: arrayChecks
            .fill(false, 0, ingredientMap.length),
        },
        meals: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(recipeSave));
    } else if (!inProgressRecipes.cocktails[drinkRecipe.idDrink]) {
      inProgressRecipes.cocktails[drinkRecipe.idDrink] = ingredientMap;
      inProgressRecipes.cocktails[`${drinkRecipe.idDrink}checks`] = arrayChecks
        .fill(false, 0, ingredientMap.length);
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    } else {
      setIsChecked(inProgressRecipes.cocktails[`${drinkRecipe.idDrink}checks`]);
    }
  };

  useEffect(() => {
    localStoragePrepare();
  }, [drinkRecipe]);

  const handleClick = () => {
    console.log('legal fera');
  };

  const handleChange = ({ target: { checked, name } }) => {
    const temp = [...isChecked];
    temp[name] = checked;

    setIsChecked([
      ...temp,
    ]);
    const localRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    localRecipe.cocktails[`${drinkRecipe.idDrink}checks`] = [...temp];
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
              isChecked && ingredients
                .map((ingredient, index) => (drinkRecipe[ingredient] !== ''
                && drinkRecipe[ingredient] !== null
                && drinkRecipe[measure[index]] !== null
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
                      {`${drinkRecipe[ingredient]} - ${drinkRecipe[measure[index]]}`}
                    </label>
                  </p>
                )
                ))
            }
            <h3>Instructions</h3>
            <p data-testid="instructions">{drinkRecipe.strInstructions}</p>
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

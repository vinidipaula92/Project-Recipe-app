import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import ButtonShare from '../components/ButtonShare';
import FavoriteButton from '../components/FavoriteButton';
import { recipeDispatch, saveDataDrink } from '../redux/actions';
import { requestDrinks, requestFoodRecipeById } from '../services/apiRequest';
import { NUMBER_SIX } from '../services/consts';
import '../css/Details.css';

export default function DetailsFood() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [continueRecipe, setContinueRecipe] = useState(false);

  const getRecipeById = async () => {
    const { meals } = await requestFoodRecipeById(id);
    setRecipe(meals[0]);
    setLoading(false);
    dispatch(recipeDispatch(meals[0]));
  };

  async function askApi() {
    const drinksList = await requestDrinks();
    dispatch(saveDataDrink(drinksList));
  }

  const verifyRecipeStatus = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes && inProgressRecipes.meals) {
      setContinueRecipe(Object.keys(inProgressRecipes.meals).includes(id));
    }
  };

  useEffect(() => {
    getRecipeById();
    askApi();
    verifyRecipeStatus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { drinks } = useSelector((state) => state.dataReducer.dataDrink);
  const ingredients = Object.keys(recipe)
    .filter((key) => key.includes('strIngredient'));
  const measure = Object.keys(recipe)
    .filter((key) => key.includes('strMeasure'));

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  return (
    <div>
      {
        loading ? <p>Loading...</p> : (
          <div className="recipe-details">
            <img
              data-testid="recipe-photo"
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
            />
            <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
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
            <div>
              <Slider { ...settings }>
                {
                  drinks && drinks.map((drink, index) => (
                    index < NUMBER_SIX && (
                      <div
                        data-testid={ `${index}-recomendation-card` }
                        key={ drink.idDrink }
                      >
                        <Link to={ `/drinks/${drink.idDrink}` }>
                          <img
                            data-testid={ `${index}-card-img` }
                            src={ drink.strDrinkThumb }
                            alt="recipes cards"
                          />
                          <p
                            data-testid={ `${index}-recomendation-title` }
                          >
                            {drink.strDrink}
                          </p>
                        </Link>
                      </div>
                    )))
                }
              </Slider>
            </div>
            <div className="buttons">
              <ButtonShare recipes={ recipe } />
              <FavoriteButton recipe={ recipe } />
            </div>
            {
              continueRecipe
                ? (
                  <Link to={ `/foods/${recipe.idMeal}/in-progress` }>
                    <button
                      className="footer-fixed"
                      type="button"
                      data-testid="start-recipe-btn"
                    >
                      Continue Recipe
                    </button>
                  </Link>
                )
                : (
                  <Link to={ `/foods/${recipe.idMeal}/in-progress` }>
                    <button
                      className="footer-fixed"
                      type="button"
                      data-testid="start-recipe-btn"
                    >
                      Start
                    </button>
                  </Link>
                )
            }
          </div>
        )
      }
    </div>
  );
}

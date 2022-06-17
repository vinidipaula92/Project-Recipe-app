import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import ButtonShare from '../components/ButtonShare';
import FavoriteButton from '../components/FavoriteButton';
import '../css/Details.css';
import '../css/footer.css';
import { drinkRecipeDispatch, saveDataFood } from '../redux/actions';
import { requestDrinkRecipeById, requestMeal } from '../services/apiRequest';
import { NUMBER_SIX } from '../services/consts';
import Header from '../components/Header';
import Pedrin from '../images/Pedrin.png';

export default function DetailsDrink() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [drinkRecipe, setDrinkRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [continueRecipe, setContinueRecipe] = useState(false);

  const getRecipeById = async () => {
    const { drinks } = await requestDrinkRecipeById(id);
    setDrinkRecipe(drinks[0]);
    setLoading(false);
    dispatch(drinkRecipeDispatch(drinks[0]));
  };

  async function askApi() {
    const mealsList = await requestMeal();
    dispatch(saveDataFood(mealsList));
  }

  const verifyRecipeStatus = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes && inProgressRecipes.cocktails) {
      setContinueRecipe(Object.keys(inProgressRecipes.cocktails).includes(id));
    }
  };

  useEffect(() => {
    getRecipeById();
    askApi();
    verifyRecipeStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { meals } = useSelector((state) => state.dataReducer.dataFood);
  const ingredients = Object.keys(drinkRecipe)
    .filter((key) => key.includes('strIngredient'));
  const measure = Object.keys(drinkRecipe)
    .filter((key) => key.includes('strMeasure'));

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  return (
    <div className="container">
      {
        loading ? <p>Loading...</p> : (
          <div className="recipe-details">
            <div className="explore-header">
              <Header />
              <Link to="/">
                <img src={ Pedrin } alt="logo" width="50px" />
              </Link>
              <span data-testid="page-title">Explore Foods</span>
            </div>
            <img
              className="card-img"
              data-testid="recipe-photo"
              src={ drinkRecipe.strDrinkThumb }
              alt={ drinkRecipe.strDrink }
            />
            <h1
              data-testid="recipe-title"
              className="card-name"
            >
              {drinkRecipe.strDrink}
            </h1>
            <p data-testid="recipe-category">{drinkRecipe.strAlcoholic}</p>
            <div
              className="ingred-container"
            >
              <h3>Ingredients</h3>
              {
                ingredients.map((ingredient, index) => (drinkRecipe[ingredient] !== ''
              && drinkRecipe[ingredient] !== null
              && drinkRecipe[measure[index]] !== null
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
            </div>
            <div
              className="instruc-container"
            >
              <h3>Instructions</h3>
              <p data-testid="instructions">{drinkRecipe.strInstructions}</p>
            </div>
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
            <div>
              <Slider { ...settings }>
                {
                  meals && meals.map((meal, index) => (
                    index < NUMBER_SIX && (
                      <div
                        data-testid={ `${index}-recomendation-card` }
                        key={ meal.idMeal }
                        className="slider-container"
                      >
                        <Link to={ `/foods/${meal.idMeal}` }>
                          <img
                            data-testid={ `${index}-card-img` }
                            src={ meal.strMealThumb }
                            alt="recipes cards"
                            className="slider-img"
                          />
                          <p
                            data-testid={ `${index}-recomendation-title` }
                          >
                            {meal.strMeal}
                          </p>
                        </Link>
                      </div>
                    )))
                }
              </Slider>
            </div>
            <div className="buttons">
              <ButtonShare recipes={ drinkRecipe } />
              <FavoriteButton recipe={ drinkRecipe } />
            </div>
            {
              continueRecipe
                ? (
                  <Link to={ `/drinks/${drinkRecipe.idDrink}/in-progress` }>
                    <button
                      className="footer-fixed button"
                      type="button"
                      data-testid="start-recipe-btn"
                    >
                      Continue Recipe
                    </button>
                  </Link>
                )
                : (
                  <Link to={ `/drinks/${drinkRecipe.idDrink}/in-progress` }>
                    <button
                      className="footer-fixed button"
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

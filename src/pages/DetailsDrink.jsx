import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { saveDataFood, drinkRecipeDispatch } from '../redux/actions';
import { requestDrinkRecipeById, requestMeal } from '../services/apiRequest';
import { NUMBER_SIX } from '../services/consts';
import '../css/footer.css';
import FavoriteButton from '../components/FavoriteButton';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import ButtonShare from '../components/ButtonShare';

export default function DetailsDrink() {
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

  async function askApi() {
    const mealsList = await requestMeal();
    dispatch(saveDataFood(mealsList));
  }

  useEffect(() => {
    getRecipeById();
    askApi();
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
            <p data-testid="recipe-category">{drinkRecipe.strAlcoholic}</p>
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
            <Slider { ...settings }>
              {
                meals && meals.map((meal, index) => (
                  index < NUMBER_SIX && (
                    <div
                      data-testid={ `${index}-recomendation-card` }
                      key={ meal.idMeal }
                    >
                      <Link to={ `/foods/${meal.idMeal}` }>
                        <img
                          data-testid={ `${index}-card-img` }
                          src={ meal.strMealThumb }
                          alt="recipes cards"
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
            <div>
              <ButtonShare />
              <FavoriteButton recipe={ drinkRecipe } />
            </div>
            <p>
              a
              a
              a
            </p>
            <Link to={ `/drinks/${drinkRecipe.idDrink}/in-progress` }>
              <button
                className="footer-fixed"
                type="button"
                data-testid="start-recipe-btn"
              >
                Start
              </button>
            </Link>
          </div>
        )
      }
    </div>
  );
}

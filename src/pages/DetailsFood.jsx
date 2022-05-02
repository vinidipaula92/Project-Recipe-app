import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { useClipboard } from 'use-clipboard-copy';
import { saveDataDrink } from '../redux/actions';
import { requestDrinks, requestFoodRecipeById } from '../services/apiRequest';
import { NUMBER_SIX } from '../services/consts';
import shareIcon from '../images/shareIcon.svg';
import '../css/footer.css';
import FavoriteButton from '../components/FavoriteButton';

export default function DetailsFood() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const clipboard = useClipboard();
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [share, setShare] = useState(true);

  const getRecipeById = async () => {
    const { meals } = await requestFoodRecipeById(id);
    setRecipe(meals[0]);
    setLoading(false);
  };

  async function askApi() {
    const drinksList = await requestDrinks();
    dispatch(saveDataDrink(drinksList));
  }

  useEffect(() => {
    getRecipeById();
    askApi();
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

  const handleCopy = () => {
    clipboard.copy(`http://localhost:3000/foods/${recipe.idMeal}`);
    setShare(false);
  };

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
            <div>
              <button
                type="button"
                data-testid="share-btn"
                onClick={ handleCopy }
              >
                { share ? (
                  <img
                    src={ shareIcon }
                    alt="compartilhar"
                  />
                ) : (
                  <p>Link copied!</p>
                ) }
              </button>
              <FavoriteButton recipe={ recipe } />
            </div>
            <p>
              a
              a
              a
            </p>
            <Link to={ `/foods/${recipe.idMeal}/in-progress` }>
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

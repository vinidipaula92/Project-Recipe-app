import React, { useState } from 'react';
import ButtonShare from '../components/ButtonShare';

export default function ProgressDrink() {
  const [add, setAdd] = useState(false);
  const [count, setCount] = useState(0);
  const handleClick = () => {
    if (count === 0) {
      setAdd(true);
      setCount(1);
    } else {
      setAdd(false);
      setCount(0);
    }
  };
  return (
    <div>
      <h1>Progress Drink</h1>
      <h3 data-testid="recipe-title">Titulo</h3>
      <img
        src="https://www.seriouseats.com/recipes/images/2015/07/20150702-sous-vide-hamburger-anova-primary-1500x1125.jpg"
        alt="hamburger"
      />
      <ButtonShare />
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorite

      </button>
      <p data-testid="recipe-category">Category</p>
      <label
        htmlFor="ingredients"
      >
        Ingredients:
        <input
          type="checkbox"
          id="ingredients"
          data-testid="ingredient-step"
          className={ add ? 'ingredient-step' : null }
          onClick={ handleClick }
        />
      </label>
      <p data-testid="instructions">Intructions</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finish

      </button>
    </div>
  );
}

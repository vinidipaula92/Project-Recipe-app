import React, { useState } from 'react';
import { useClipboard } from 'use-clipboard-copy';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import shareIcon from '../images/shareIcon.svg';

export default function ButtonShare() {
  const recipe = useSelector((state) => state.dataReducer.recipe);
  const drinkRecipe = useSelector((state) => state.dataReducer.drinkRecipe);
  const [share, setShare] = useState(true);
  const clipboard = useClipboard();
  const { pathname } = useLocation();

  const handleCopy = () => {
    if (pathname.includes('foods')) {
      clipboard.copy(`http://localhost:3000/foods/${recipe.idMeal}`);
    }
    if (pathname.includes('drinks')) {
      clipboard.copy(`http://localhost:3000/drinks/${drinkRecipe.idDrink}`);
    }
    setShare(false);
  };

  return (
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
  );
}

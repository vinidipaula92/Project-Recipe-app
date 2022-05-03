/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useClipboard } from 'use-clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

export default function ButtonShare(props) {
  // const recipe = useSelector((state) => state.dataReducer.recipe);
  // const drinkRecipe = useSelector((state) => state.dataReducer.drinkRecipe);
  const [recipe, setRecipe] = useState();
  const [indexEx, setIndexEx] = useState();
  const [drinkRecipe, setDrinkRecipe] = useState();
  const [share, setShare] = useState(true);
  const clipboard = useClipboard();
  const { pathname } = useLocation();

  useEffect(() => {
    const { recipes, index } = props;
    setIndexEx(index);
    setDrinkRecipe(recipes);
    setRecipe(recipes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = () => {
    console.log('aqui');
    if (pathname.includes('drinks')) {
      clipboard.copy(`http://localhost:3000/drinks/${drinkRecipe.idDrink}`);
    }
    if (pathname.includes('foods')) {
      clipboard.copy(`http://localhost:3000/foods/${recipe.idMeal}`);
    }
    if (drinkRecipe.type === 'drink') {
      clipboard.copy(`http://localhost:3000/drinks/${drinkRecipe.id}`);
    }
    if (drinkRecipe.type === 'food') {
      clipboard.copy(`http://localhost:3000/foods/${recipe.id}`);
    }
    setShare(false);
  };

  return (
    <button
      type="button"
      onClick={ handleCopy }
    >
      { share ? (
        <img
          data-testid={ indexEx !== undefined
            ? (`${indexEx}-horizontal-share-btn`) : ('share-btn') }
          src={ shareIcon }
          alt="compartilhar"
        />
      ) : (
        <p>Link copied!</p>
      ) }
    </button>
  );
}

ButtonShare.propTypes = {
  recipe: PropTypes.array,
}.isRequired;

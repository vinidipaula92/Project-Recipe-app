/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import ButtonShare from '../components/ButtonShare';
import FavoriteButton from '../components/FavoriteButton';
import Header from '../components/Header';

export default function Favorite() {
  const [favoriteItems, setFavoriteItems] = useState([]);

  const askFavorite = () => {
    const savedItems = localStorage.getItem('favoriteRecipes');
    const savedItemsArray = JSON.parse(savedItems);
    setFavoriteItems(savedItemsArray);
  };

  useEffect(() => {
    askFavorite();
  }, []);

  return (
    <div>
      <Header />
      <span data-testid="page-title">Favorite Recipes</span>
      <div>
        {
          favoriteItems && favoriteItems.map((element, index) => (
            <div key={ element.id }>
              <p data-testid={ `${index}-horizontal-name` }>{ element.name }</p>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                { element.type === 'food' ? element.nationality : element.alcoholicOrNot }
                {' '}
                -
                {' '}
                { element.category }
              </p>
              <img
                src={ element.image }
                alt={ `foto do alimento com o id ${element.id}` }
                data-testid={ `${index}-horizontal-image` }
              />
              <ButtonShare index={ index } />
              <FavoriteButton index={ index } />
            </div>
          ))
        }
      </div>
    </div>
  );
}

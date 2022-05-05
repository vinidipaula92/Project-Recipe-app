/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import ButtonShare from '../components/ButtonShare';
import FavoriteButton from '../components/FavoriteButton';
import Header from '../components/Header';

export default function Favorite() {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState([]);

  const askFavorite = () => {
    const savedItems = localStorage.getItem('favoriteRecipes');
    const savedItemsArray = JSON.parse(savedItems);
    setFavoriteItems(savedItemsArray);
    setFilteredFavorites(savedItemsArray);
  };

  const handleFavorite = (identification) => {
    const newFavs = favoriteItems.filter((element) => element.id !== identification);
    setFavoriteItems(newFavs);
    setFilteredFavorites(newFavs);
    const saveNewFavs = JSON.stringify(newFavs);
    localStorage.setItem('favoriteRecipes', saveNewFavs);
  };

  const handleFilter = ({ target }) => {
    const { value } = target;
    const newItems = favoriteItems.filter((element) => element.type.includes(value));
    setFilteredFavorites(newItems);
  };

  useEffect(() => {
    askFavorite();
  }, []);

  return (
    <div>
      <Header />
      <span data-testid="page-title">Favorite Recipes</span>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ handleFilter }
        value=""
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ handleFilter }
        value="food"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ handleFilter }
        value="drink"
      >
        Drinks
      </button>
      <div>
        {
          favoriteItems && filteredFavorites.map((element, index) => (
            <div key={ element.id }>
              <p data-testid={ `${index}-horizontal-name` }>{ element.name }</p>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                { element.type === 'food'
                  ? element.nationality : element.alcoholicOrNot }
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
              <ButtonShare index={ index } recipes={ element } />
              <FavoriteButton
                index={ index }
                handleFunction={ handleFavorite }
                identification={ element.id }
              />
            </div>
          ))
        }
      </div>
    </div>
  );
}

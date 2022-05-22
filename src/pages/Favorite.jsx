/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import ButtonShare from '../components/ButtonShare';
import FavoriteButton from '../components/FavoriteButton';
import Header from '../components/Header';
import '../css/Explore.css';
import '../css/Favorite.css';
import Pedrin from '../images/Pedrin.png';

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
    <div className="container">
      <div className="explore-header">
        <Header />
        <Link to="/">
          <img src={ Pedrin } alt="logo" width="50px" />
        </Link>
        <span data-testid="page-title">Favorite Recipes</span>
      </div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ handleFilter }
        value=""
        className="btn-filter-by-all"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ handleFilter }
        value="food"
        className="btn-filter-by-food"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ handleFilter }
        value="drink"
        className="btn-filter-by-drink"
      >
        Drinks
      </button>
      <div>
        {
          favoriteItems && filteredFavorites.map((element, index) => (
            <div key={ element.id }>
              <Link
                to={ `/${element.type}s/${element.id}` }
                className="link-favorite"
              >
                <div className="container-favorite">
                  <p
                    data-testid={ `${index}-horizontal-name` }
                    className="horizontal-name"
                  >
                    { element.name }

                  </p>
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                    className="horizontal-top-text"
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
                    width="300px"
                  />
                </div>
              </Link>
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

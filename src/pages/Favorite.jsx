import React, { useEffect, useState } from 'react';
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
          favoriteItems.map((element) => (
            <div key={ element.id }>
              <p>{ element.name }</p>
              <p>{ element.nationality }</p>
              <p>{ element.category }</p>
              <img
                src={ element.image }
                alt={ `foto do alimento com o id ${element.id}` }
              />
            </div>
          ))
        }
      </div>
    </div>
  );
}

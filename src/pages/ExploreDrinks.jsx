import React, { useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../css/Explore.css';
import drinkImg from '../images/drinkImg.png';
import Pedrin from '../images/Pedrin.png';
import { requestRandomByDrink } from '../services/apiRequest';

export default function ExploreDrinks() {
  const [drinks, setDrinks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const handleRequestFood = async () => {
    const response = await requestRandomByDrink();
    setDrinks(response.drinks);
    setLoading(false);
  };

  useEffect(() => {
    handleRequestFood();
  }, []);
  return (
    <div className="container">
      {
        loading ? (<div>Loading...</div>) : (
          <div>
            <div className="explore-header">
              <Header />
              <Link to="/">
                <img src={ Pedrin } alt="logo" width="50px" />
              </Link>
              <span data-testid="page-title">Explore Drinks</span>
            </div>
            <Link to="/explore/drinks/ingredients">
              <button
                type="button"
                data-testid="explore-by-ingredient"
                className="btn-explore-by-ingredient"
              >
                By Ingredient
              </button>
            </Link>
            {
              drinks.map((drink) => (
                <Link
                  to={ `/drinks/${drink.idDrink}` }
                  key={ drink.idDrink }
                >
                  <button
                    type="button"
                    data-testid="explore-surprise"
                    className="btn-explore-surprise"
                  >
                    Surprise me!
                  </button>
                </Link>
              ))
            }
          </div>
        )
      }
      <img
        src={ drinkImg }
        alt="logo"
        className="explore-img"
      />
      <Footer />
    </div>
  );
}

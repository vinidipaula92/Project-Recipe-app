import React, { useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../css/Explore.css';
import foodImg from '../images/foodImg.png';
import Pedrin from '../images/Pedrin.png';
import { requestRandomByFood } from '../services/apiRequest';

export default function ExploreFood() {
  const [foods, setFoods] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const handleRequestFood = async () => {
    const response = await requestRandomByFood();
    setFoods(response.meals);
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
              <span data-testid="page-title">Explore Foods</span>
            </div>
            <Link to="/explore/foods/ingredients">
              <button
                type="button"
                data-testid="explore-by-ingredient"
                className="btn-explore-by-ingredient"
              >
                By Ingredient

              </button>
            </Link>
            <Link to="/explore/foods/nationalities">
              <button
                type="button"
                data-testid="explore-by-nationality"
                className="btn-explore-by-nationality"
              >
                By Nationality
              </button>
            </Link>
            {
              foods.map((food) => (
                <Link
                  to={ `/foods/${food.idMeal}` }
                  key={ food.idMeal }
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
        src={ foodImg }
        alt="logo"
        className="explore-img"
      />
      <Footer />
    </div>
  );
}

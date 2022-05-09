import React, { useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';
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
      <Header />
      {
        loading ? (<div>Loading...</div>) : (
          <div>
            <span data-testid="page-title">Explore Foods</span>
            <Link to="/explore/foods/ingredients">
              <button
                type="button"
                data-testid="explore-by-ingredient"
              >
                By Ingredient

              </button>
            </Link>
            <Link to="/explore/foods/nationalities">
              <button
                type="button"
                data-testid="explore-by-nationality"
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
                  >
                    Surprise me!

                  </button>
                </Link>
              ))
            }
          </div>
        )
      }
      <Footer />
    </div>
  );
}

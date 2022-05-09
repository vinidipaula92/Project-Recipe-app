import React, { useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';
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
      <Header />
      {
        loading ? (<div>Loading...</div>) : (
          <div>
            <span data-testid="page-title">Explore Drinks</span>
            <Link to="/explore/drinks/ingredients">
              <button
                type="button"
                data-testid="explore-by-ingredient"
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

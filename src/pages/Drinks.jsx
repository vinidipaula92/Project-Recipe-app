import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Searchheader from '../components/SearchHeader';
import { saveDataDrink } from '../redux/actions';
import { requestDrinks } from '../services/apiRequest';
import { NUMBER_ELEVEN } from '../services/consts';

export default function Drinks() {
  const { drinks } = useSelector((state) => state.dataReducer.dataDrink);
  const dispatch = useDispatch();

  async function askApi() {
    const drinksList = await requestDrinks();
    dispatch(saveDataDrink(drinksList));
  }

  useEffect(() => {
    if (drinks === undefined) {
      askApi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <Header />
      <span data-testid="page-title">Drinks</span>
      <Searchheader />
      {
        drinks && drinks.map((drink, index) => (
          index <= NUMBER_ELEVEN && (
            <div data-testid={ `${index}-recipe-card` } key={ drink.idDrink }>
              <Link to={ `/drinks/${drink.idDrink}` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ drink.strDrinkThumb }
                  alt="recipes cards"
                />
                <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
              </Link>
            </div>
          )))
      }
      <Footer />
    </div>
  );
}

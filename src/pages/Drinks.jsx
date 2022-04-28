/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Searchheader from '../components/SearchHeader';
import { NUMBER_ELEVEN } from '../services/consts';
import { requestDrinks } from '../services/apiRequest';
import { saveDataDrink } from '../redux/actions';

export default function Drinks() {
  const { drinks } = useSelector((state) => state.dataReducer.dataDrink);
  const dispatch = useDispatch();

  useEffect(async () => {
    const drinksList = await requestDrinks();
    dispatch(saveDataDrink(drinksList));
  }, []);

  return (
    <div>
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

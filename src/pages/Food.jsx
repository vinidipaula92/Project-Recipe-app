import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Searchheader from '../components/SearchHeader';
import { NUMBER_ELEVEN } from '../services/consts';

export default function Food() {
  const { meals } = useSelector((state) => state.dataReducer.dataFood);

  return (
    <div>
      <Header />
      <span data-testid="page-title">Foods</span>
      <Searchheader />
      {
        meals && meals.map((meal, index) => (
          index <= NUMBER_ELEVEN && (
            <div data-testid={ `${index}-recipe-card` } key={ meal.idMeal }>
              <Link to={ `/foods/${meal.idMeal}` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ meal.strMealThumb }
                  alt="recipes cards"
                />
                <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
              </Link>
            </div>
          )))
      }
      <Footer />
    </div>
  );
}

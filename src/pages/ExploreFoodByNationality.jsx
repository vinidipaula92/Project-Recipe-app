import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Searchheader from '../components/SearchHeader';
import { addCategorieFilter, saveDataFood } from '../redux/actions';
import { requestFoodNationality, requestNationality } from '../services/apiRequest';

export default function ExploreFoodByNationality() {
  const [loading, setLoading] = useState(true);
  const [native, setNative] = useState('');
  const [teste, setTeste] = useState([]);
  const dispatch = useDispatch();
  const { meals } = useSelector((state) => state.dataReducer.categorieFilter);

  async function askApi() {
    const mealsList = await requestNationality();
    const mealsListFood = await requestFoodNationality('All');
    dispatch(addCategorieFilter(mealsListFood));
    dispatch(saveDataFood(mealsList));
    setLoading(false);
    setTeste(mealsListFood);
    console.log(teste);
    console.log(mealsListFood);
  }

  const handleChange = async ({ target }) => {
    const { value } = target;
    setNative(value);
    console.log(native);
  };

  useEffect(() => {
    askApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <span data-testid="page-title">Explore Nationalities</span>
      <Searchheader />
      {
        loading ? <p>Loading...</p> : (
          <select
            data-testid="explore-by-nationality-dropdown"
            onChange={ handleChange }

          >
            <option>All</option>
            {
              meals && meals.map((nacionalidade, index) => (
                <option
                  data-testid={ `${nacionalidade.strArea}-option` }
                  key={ index }
                  value={ nacionalidade.strArea }
                >
                  { nacionalidade.strArea }

                </option>
              ))
            }
          </select>
        )
      }
      <Footer />
    </div>
  );
}

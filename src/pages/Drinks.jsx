import React from 'react';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Searchheader from '../components/SearchHeader';
// import { NUMBER_ZERO } from '../services/consts';

export default function Drinks() {
  const dataDrink = useSelector((state) => state.dataReducer.dataDrink);

  if (dataDrink.drinks !== undefined && dataDrink.drinks.length === NUMBER_ZERO) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }
  console.log(dataDrink);
  return (
    <div>
      <Header />
      <span data-testid="page-title">Drinks</span>
      <Searchheader />
      <Footer />
    </div>
  );
}

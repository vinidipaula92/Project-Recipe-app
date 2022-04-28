import React from 'react';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Searchheader from '../components/SearchHeader';
import { NUMBER_ZERO } from '../services/consts';

export default function Food() {
  const dataFood = useSelector((state) => state.dataReducer.dataFood);

  if (dataFood.meals !== undefined && dataFood.meals.length === NUMBER_ZERO) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }
  // console.log('dataFood', dataFood === {});
  return (
    <div>
      <Header />
      <span data-testid="page-title">Foods</span>
      <Searchheader />
      <Footer />
    </div>
  );
}

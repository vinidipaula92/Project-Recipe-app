import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Searchheader from '../components/SearchHeader';

export default function ExploreDrinkByIngredient() {
  return (
    <div>
      <Header />
      <span data-testid="page-title">Explore Ingredients</span>
      <Searchheader />
      <Footer />
    </div>
  );
}

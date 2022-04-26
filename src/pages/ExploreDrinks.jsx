import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Searchheader from '../components/SearchHeader';

export default function ExploreDrinks() {
  return (
    <div>
      <Header />
      <span data-testid="page-title">Explore Drinks</span>
      <Searchheader />
      <Footer />
    </div>
  );
}

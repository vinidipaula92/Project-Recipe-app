import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExploreFoodByIngredient() {
  return (
    <div>
      <Header />
      <span data-testid="page-title">Explore Ingredients</span>
      <Footer />
    </div>
  );
}

import React from 'react';
import Header from '../components/Header';
import Searchheader from '../components/SearchHeader';

export default function RecipeDone() {
  return (
    <div>
      <Header />
      <span data-testid="page-title">Done Recipes</span>
      <Searchheader />
    </div>
  );
}

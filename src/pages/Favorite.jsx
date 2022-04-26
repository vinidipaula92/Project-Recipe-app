import React from 'react';
import Header from '../components/Header';
import Searchheader from '../components/SearchHeader';

export default function Favorite() {
  return (
    <div>
      <Header />
      <span data-testid="page-title">Favorite Recipes</span>
      <Searchheader />
    </div>
  );
}

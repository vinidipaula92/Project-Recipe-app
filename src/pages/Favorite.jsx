import React from 'react';
import Header from '../components/Header';

export default function Favorite() {
  return (
    <div>
      <Header />
      <span data-testid="page-title">Favorite Recipes</span>
    </div>
  );
}

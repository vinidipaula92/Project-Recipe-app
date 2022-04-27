import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Searchheader from '../components/SearchHeader';

export default function Drinks() {
  return (
    <div>
      <Header />
      <span data-testid="page-title">Drinks</span>
      <Searchheader />
      <Footer />
    </div>
  );
}

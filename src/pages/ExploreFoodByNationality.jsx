import React from 'react';
import Footer from '../components/Footer';
import Searchheader from '../components/SearchHeader';
import Header from '../components/Header';

export default function ExploreFoodByNationality() {
  return (
    <div>
      <Header />
      <span data-testid="page-title">Explore Nationalities</span>
      <Searchheader />
      <Footer />
    </div>
  );
}

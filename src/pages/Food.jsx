import React from 'react';
import ButtonSearch from '../components/ButtonSearch';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Searchheader from '../components/SearchHeader';

export default function Food() {
  return (
    <div>
      <Header />
      <span data-testid="page-title">Foods</span>
      <ButtonSearch />
      <Searchheader />
      <Footer />
    </div>
  );
}

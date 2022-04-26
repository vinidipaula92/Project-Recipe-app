import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Searchheader from '../components/SearchHeader';

export default function Explore() {
  return (
    <div>
      <Header />
      <span data-testid="page-title">Explore</span>
      <Searchheader />
      <Footer />
    </div>
  );
}

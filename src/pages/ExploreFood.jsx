import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExploreFood() {
  return (
    <div>
      <Header />
      <span data-testid="page-title">Explore Foods</span>
      <Footer />
    </div>
  );
}

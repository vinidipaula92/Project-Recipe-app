import React from 'react';

function Footer() {
  return (
    <div>
      <footer data-testid="footer">
        <img
          data-testid="food-bottom-btn"
          src="src/images/mealIcon.svg"
          alt="meal"
        />
        <img
          data-testid="drinks-bottom-btn"
          src="src/images/drinkIcon.svg"
          alt="drink"
        />
        <img
          data-testid="explore-bottom-btn"
          src="src/images/exploreIcon.svg"
          alt="explore"
        />
      </footer>
    </div>
  );
}

export default Footer;

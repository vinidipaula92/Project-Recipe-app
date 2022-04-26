import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Footer() {
  return (
    <div>
      <footer data-testid="footer">
        <Link to="/foods">
          <img
            data-testid="food-bottom-btn"
            src="src/images/mealIcon.svg"
            alt="meal"
          />
        </Link>
        <Link to="/drinks">
          <img
            data-testid="drinks-bottom-btn"
            src="src/images/drinkIcon.svg"
            alt="drink"
          />
        </Link>
        <Link to="/explore">

          <img
            data-testid="explore-bottom-btn"
            src="src/images/exploreIcon.svg"
            alt="explore"
          />
        </Link>
      </footer>
    </div>
  );
}

export default Footer;

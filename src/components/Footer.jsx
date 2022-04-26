import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

function Footer() {
  return (
    <div>
      <footer data-testid="footer">
        <Link to="/foods">
          <img
            data-testid="food-bottom-btn"
            src={ mealIcon }
            alt="meal"
          />
        </Link>
        <Link to="/drinks">
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            alt="drink"
          />
        </Link>
        <Link to="/explore">

          <img
            data-testid="explore-bottom-btn"
            src={ exploreIcon }
            alt="explore"
          />
        </Link>
      </footer>
    </div>
  );
}

export default Footer;

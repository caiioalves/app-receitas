import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

import './footer.css';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/drinks">
        <img alt="drinks" data-testid="drinks-bottom-btn" src={ drinkIcon } />
      </Link>
      <Link to="/foods">
        <img alt="foods" data-testid="food-bottom-btn" src={ mealIcon } />
      </Link>
    </footer>
  );
}

export default Footer;

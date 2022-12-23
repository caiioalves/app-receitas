import PropTypes from 'prop-types';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/Recommendations.css';

function Recomendations({ recipesRecom }) {
  const { pathname } = useLocation();

  return (
    <section className="main-carousel">
      {
        pathname.includes('/drink')
        && recipesRecom.map((recipe, index) => (
          <Link
            key={ `${index}-carousel` }
            className="item-carousel"
            to={ `/foods/${recipe.idMeal}` }
            data-testid={ `${index}-recomendation-card` }
          >
            <img src={ recipe.strMealThumb } alt="" />
            <h3 data-testid={ `${index}-recomendation-title` }>{ recipe.strMeal }</h3>
          </Link>
        ))
      }
      {
        pathname.includes('/food')
        && recipesRecom.map((recipe, index) => (
          <Link
            key={ `${index}-carousel` }
            className="item-carousel"
            to={ `/drinks/${recipe.idDrink}` }
            data-testid={ `${index}-recomendation-card` }
          >
            <img src={ recipe.strDrinkThumb } alt="" />
            <h3 data-testid={ `${index}-recomendation-title` }>{ recipe.strDrink }</h3>
          </Link>
        ))
      }
    </section>
  );
}

Recomendations.propTypes = {
  recipesRecom: PropTypes.shape,
}.isRequired;

export default Recomendations;

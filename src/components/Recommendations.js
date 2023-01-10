import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Recomendations({ recipesRecom }) {
  const { pathname } = useLocation();

  return (
    <ImageList sx={{ display: 'flex', mt: '5%', overflow: 'auto', width: '400px'}} className="main-carousel">
      {
        pathname.includes('/drink')
        &&
         recipesRecom.map((recipe, index) => (
          <ImageListItem sx={{ width:  '200px' }} cols={2}>
          <Link
            key={ `${index}-carousel` }
            className="item-carousel"
            to={ `/foods/${recipe.idMeal}` }
            data-testid={ `${index}-recomendation-card` }
          >
            <img width={200} src={ recipe.strMealThumb } alt="" />
            <ImageListItemBar title={recipe.strMeal}/>
              {/* <Typography data-testid={ `${index}-recomendation-title` }>{ recipe.strMeal }</Typography> */}
            {/* </ImageListItemBar> */}
          </Link>
          </ImageListItem>
        ))
      }
      {
        pathname.includes('/food')
        && recipesRecom.map((recipe, index) => (
          <ImageListItem sx={{ width:  '200px' }} cols={2}> 
          <Link
            key={ `${index}-carousel` }
            className="item-carousel"
            to={ `/drinks/${recipe.idDrink}` }
            data-testid={ `${index}-recomendation-card` }
          >
            <img width={200} src={ recipe.strDrinkThumb } alt="" />
            <ImageListItemBar title={recipe.strDrink}/>
              {/* <Typography data-testid={ `${index}-recomendation-title` }>{ recipe.strDrink }</Typography> */}
            {/* </ImageListItemBar> */}
          </Link>
          </ImageListItem>
        ))
      }
    </ImageList>
  );
}

Recomendations.propTypes = {
  recipesRecom: PropTypes.shape,
}.isRequired;

export default Recomendations;

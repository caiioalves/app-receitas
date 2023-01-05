import { Box, Button, InputBase } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import cardContext from '../context/cardContext';

function SearchBar({ history }) {
  const {
    type,
    typeFilter,
    setTypeFilter,
    searchItem,
    setSearchItem,
    recipe,
    setRecipe,
  } = useContext(cardContext);
  const [textSearch, setTextSearch] = useState('');
  const [filterType, setFilterType] = useState('');

  const handleClick = () => {
    setSearchItem(textSearch);
    setTypeFilter(filterType);
    setTextSearch('');
  };

  useEffect(() => {
    if (type === 'drinks') {
      const fetchItem = async (url) => {
        const data = await fetch(url).then((res) => res.json());
        const mgnum = 12;
        const filtredData = data.drinks !== null && data.drinks.length > mgnum
          ? data.drinks.filter((e) => data.drinks.indexOf(e) < mgnum)
          : data.drinks;
        setRecipe(filtredData);
      };

      if (typeFilter === 'ingredient') {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchItem}`;
        fetchItem(url);
      }
      if (typeFilter === 'name') {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchItem}`;
        fetchItem(url);
      }
      if (typeFilter === 'letter') {
        if (searchItem.length > 1) {
          global.alert('Your search must have only 1 (one) character');
        } else {
          const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchItem}`;
          fetchItem(url);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeFilter, searchItem, type]);

  useEffect(() => {
    if (type === 'foods') {
      const fetchItem = async (url) => {
        const data = await fetch(url).then((res) => res.json());
        const mgnum = 12;
        const filtredData = data.meals !== null && data.meals.length > mgnum
          ? data.meals.filter((e) => data.meals.indexOf(e) < mgnum)
          : data.meals;
        setRecipe(filtredData);
      };
      if (typeFilter === 'ingredient') {
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchItem}`;
        fetchItem(url);
      }
      if (typeFilter === 'name') {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchItem}`;
        fetchItem(url);
      }
      if (typeFilter === 'letter') {
        if (searchItem.length > 1) {
          global.alert('Your search must have only 1 (one) character');
        } else {
          const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchItem}`;
          fetchItem(url);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeFilter, searchItem, type]);

  useEffect(() => {
    if (recipe === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (recipe !== null && type === 'foods' && recipe.length === 1) {
      const item = recipe[0].idMeal;
      history.push(`/${type}/${item}`);
    }
    if (recipe !== null && type === 'drinks' && recipe.length === 1) {
      const item = recipe[0].idDrink;
      history.push(`/${type}/${item}`);
    }
  }, [recipe, type, history]);

  return (
    <Box className="search">
        <Box display="flex" justifyContent="center" className="search-input">
          <InputBase
            placeholder="Pesquisar"

            sx={{ paddingLeft: 1,textAlign: 'center', border: '1px solid black', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
            value={ textSearch }
            onChange={ ({ target }) => setTextSearch(target.value) }
            data-testid="search-input"
          />
          <Button
            sx={{ borderRadius: 0, padding: 0.6, borderTopRightRadius: 10, borderBottomRightRadius: 10 }}
            type="button"
            variant="contained"
            color="black"
            data-testid="exec-search-btn"
            onClick={ handleClick }
          >
            Search
          </Button>
        </Box>
        <Box display="flex" justifyContent="center" mt={1} mb={1} gap={2} className="radio-item">
          <label htmlFor="ingredient">
            <input
              id="ingredient"
              type="radio"
              name="search"
              data-testid="ingredient-search-radio"
              onClick={ () => setFilterType('ingredient') }
            />
            Ingredient
          </label>
          <label htmlFor="name">
            <input
              id="name"
              type="radio"
              name="search"
              data-testid="name-search-radio"
              onClick={ () => setFilterType('name') }
            />
            Name
          </label>
          <label htmlFor="letter">
            <input
              id="letter"
              type="radio"
              name="search"
              data-testid="first-letter-search-radio"
              onClick={ () => setFilterType('letter') }
            />
            Letter
          </label>
        </Box>
    </Box>
  );
}

SearchBar.propTypes = {
  history: PropTypes.shape,
}.isRequired;

export default SearchBar;

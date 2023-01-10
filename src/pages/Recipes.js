import { Box, Button, Card, CardContent, CardMedia, Link, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import cardContext from '../context/cardContext';

function Recipe(props) {
  const {
    type,
    recipe,
    setSearchItem,
    setTypeFilter,
    setRecipe,
  } = useContext(cardContext);
  const [fetched, setFetched] = useState(false);
  const [category, setCategory] = useState([]);
  const [filtredCategory, setFiltredCategory] = useState('');

  useEffect(() => {
    setFetched(true);

    return () => {
      setSearchItem('');
      setTypeFilter('');
      setRecipe([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchData = async (url, itemType) => {
      const mgnum = 12;
      const data = await fetch(url).then((item) => item.json());
      const filtredData = data[itemType] !== null && data[itemType].length > mgnum
        ? data[itemType].filter((e) => data[itemType].indexOf(e) < mgnum)
        : data[itemType];
      setRecipe(filtredData);
    };
    const fechCategory = async (url, itemType) => {
      const data = await fetch(url).then((item) => item.json());
      const mgnum = 5;
      const filtredData = data[itemType] !== null && data[itemType].length > mgnum
        ? data[itemType].filter((e) => data[itemType].indexOf(e) < mgnum)
        : data[itemType];
      setCategory(filtredData);
    };
    if (type === 'foods') {
      const meals = 'meals';
      fetchData('https://www.themealdb.com/api/json/v1/1/search.php?s=', meals);
      fechCategory('https://www.themealdb.com/api/json/v1/1/list.php?c=list', meals);
    }
    if (type === 'drinks') {
      const drinks = 'drinks';
      fetchData('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', drinks);
      fechCategory('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list', drinks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetched]);

  useEffect(() => {
    const fetchData = async (url, itemType) => {
      const data = await fetch(url).then((item) => item.json());
      const mgnum = 12;
      const filtredData = data[itemType] !== null && data[itemType].length > mgnum
        ? data[itemType].filter((e) => data[itemType].indexOf(e) < mgnum)
        : data[itemType];
      setRecipe(filtredData);
    };
    if (type === 'foods') {
      const meals = 'meals';
      fetchData(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${filtredCategory}`, meals);
    }
    if (type === 'drinks') {
      const drinks = 'drinks';
      fetchData(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filtredCategory}`, drinks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },  [filtredCategory]);

  const toggleCategory = ({ target }) => {
    const text = target.innerText;
    if (filtredCategory === text) {
      setFetched((prev) => !prev);
    } else {
      setFiltredCategory(text);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%" className="body-recipes">
      <Header { ...props } />
      <Box width="100%" borderBottom=" 1px solid #D9D9D9" flexWrap="wrap" display="flex" justifyContent="center" gap={1} mt={7} className="header-recipes">
        {/* <Container
          sx={{
            marginTop: 10,
            display: 'flex',
            borderBlockEnd: 'solid',
            justifyContent: 'center',
            gap: 1,
            whiteSpace: 'normal',
            flexWrap: 'wrap',
          // width: '50%'
          }}
        > */}
        {
          category !== null && category.length > 1 && category.map((item) => (
            <Button
             color='black'
              key={ `${item.strCategory}-key` }
              // variant="contained"
              data-testid={ `${item.strCategory}-category-filter` }
              onClick={ toggleCategory }
            >
              { item.strCategory }
            </Button>
          ))
        }
        <Button
          key="all"
          color='black'
          // variant="contained"
          data-testid="All-category-filter"
          onClick={ () => {
            setFetched((prev) => !prev);
          } }
        >
          All
        </Button>
        {/* </Container> */}
      </Box>
      <Box
        padding={1}
        mb={15}
        mt={5}display="flex"
        justifyContent="center"
        // gap={10}
        flexWrap='wrap'
        className="section-recipes"
        sx={{ gap: {xs: 5, sm: 5, md: 15} }}
      >
        {
          recipe !== null && type === 'drinks'
          && recipe.map((rec, index) => (
            <Link
              underline="none"
              href={ `/${type}/${rec.idDrink}` }
              data-testid={ `${index}-recipe-card` }
              key={ `${index}-recipe-card` }
            >
              <Card sx={{ maxWidth: 345, textAlign: 'center', backgroundColor: '#F27457' }} className="card-container">
                <CardMedia
                  // width="200px"
                  height="120"
                  component="img"
                  data-testid={ `${index}-card-img` }
                  image={ rec.strDrinkThumb }
                  title={ rec.strDrink }
                  className="hero"
                />
                 <CardContent>
                  <Typography color="#f5f5f5" variant='h6' fontWeight="bold" data-testid={ `${index}-card-name` }>
                    {rec.strDrink}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))
        }
        {
          recipe !== null && type === 'foods'
          && recipe.map((rec, index) => (
            <Link
              underline="none"
              href={ `/${type}/${rec.idMeal}` }
              data-testid={ `${index}-recipe-card` }
              key={ `${index}-recipe-card` }
            >
              <Card sx={{ maxWidth: 345, textAlign: 'center', backgroundColor: '#F27457' }} className="card-container">
                <CardMedia
                  height="130"
                  component="img"
                  data-testid={ `${index}-card-img` }
                  image={ rec.strMealThumb }
                  title={ rec.strMeal }
                  className="hero"
                />
                <CardContent>
                  <Typography variant='h6' color="#f5f5f5" fontWeight="bold" data-testid={ `${index}-card-name` }>
                    {rec.strMeal}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))
        }
      </Box>
      <Footer />
    </Box>);
}

export default Recipe;

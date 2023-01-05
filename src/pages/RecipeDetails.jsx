import { AppBar, Box, Button, List, ListItem, Paper, styled, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Recomendations from '../components/Recommendations';
import ShareAndFavorite from '../components/ShareAndFavorite';
import cardContext from '../context/cardContext';

const Video = styled('iframe')({
  marginBottom: '5%',
  border: 'none'
});

const Image = styled('img')({

})

function RecipesDetails() {
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();
  const type = location.pathname.includes('drink') ? 'drinks' : 'foods';
  const { setRecipeDetail } = useContext(cardContext);
  const [recipeRecom, setRecipeRecom] = useState([]);
  const [recipe, setRecipe] = useState('');
  const [startContinue, setStartContinue] = useState('Start Recipe');
  const [video, setVideo] = useState('');
  const [ingredients, setIngredients] = useState('');
  const drinkEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const foodEndpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  useEffect(() => {
    const fetchApi = async (url, dataType) => {
      const res = await fetch(url);
      const data = await res.json();
      const recipeData = data[dataType][0];

      setRecipe(recipeData);
      setRecipeDetail(recipeData);
      console.log(recipeData);

      if (dataType === 'meals') {
        console.log(recipeData.strYoutube);
        setVideo(recipeData.strYoutube.replace('watch?v=', 'embed/'));
      }
      const ingredientFilter = Object.entries(recipeData)
        .filter((ingredient) => ingredient[0].includes('strIngredient')
      && ingredient[1] !== null && ingredient[1] !== '');

      const measureFilter = Object.entries(recipeData)
        .filter((measure) => measure[0].includes('strMeasure'));

      console.log(measureFilter);
      console.log(ingredientFilter);
      const ingredientsList = ingredientFilter
        .map((ingredient, index) => (`${ingredient[1]} - ${
          measureFilter[index][1] === null ? '' : measureFilter[index][1]}`));

      setIngredients(ingredientsList);
    };
    if (type === 'foods') {
      fetchApi(foodEndpoint, 'meals');
    }
    if (type === 'drinks') {
      fetchApi(drinkEndpoint, 'drinks');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchRecom = async (url, dataType) => {
      const res = await fetch(url);
      const data = await res.json();
      const mgnum = 6;
      const filtredData = data[dataType].length > mgnum
      && data[dataType].filter((e) => data[dataType].indexOf(e) < mgnum);
      setRecipeRecom(filtredData);
    };
    if (type === 'foods') {
      fetchRecom('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', 'drinks');
    }
    if (type === 'drinks') {
      fetchRecom('https://www.themealdb.com/api/json/v1/1/search.php?s=', 'meals');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (data === null) {
      return localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails: {},
        meals: {} }));
    }
    if (type === 'foods') {
      const mealData = Object.keys(data.meals).includes(id);
      if (mealData) setStartContinue('Continue Recipe');
    } else {
      const drinkData = Object.keys(data.cocktails).includes(id);
      if (drinkData) setStartContinue('Continue Recipe');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleClick = () => {
    history.push(`/${type}/${id}/in-progress`);
    let prevData = JSON.parse(localStorage.getItem('inProgressRecipes'));
    prevData = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (type === 'foods') {
      prevData.meals[id] = [];
    } else {
      prevData.cocktails[id] = [];
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(prevData));
  };

  return (
    <Box className="body-details">
      {location.pathname.includes('drink') ? (
        <Box display="flex" flexDirection="column" alignItems="center" className="details-container">
          <AppBar sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} className="header-details">
            <Typography variant="h4" fontWeight="bold" ml={1} data-testid="recipe-title">{recipe.strDrink}</Typography>
            <ShareAndFavorite />
          </AppBar>
          <Paper  sx={{ width: '60%', mt: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5  }}>
          <Typography fontWeight="bold" color="#F27457" variant="h4" data-testid="recipe-category">
            {' '}
            {recipe.strAlcoholic}
          </Typography>
          <Image
            sx={{
              width: '40%'
            }}
            data-testid="recipe-photo"
            src={ recipe.strDrinkThumb }
            className="img-food"
            alt="imagem da receita"
          />
          <Typography
            width="80%"
            mb={5}
            fontWeight="bold"
            className="instructions"
            data-testid="instructions"
          >
            {recipe.strInstructions}
          </Typography>
          </Paper>
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" className="details-container">
          <AppBar
            sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
            className="header-details">
            <Typography variant="h4" fontWeight="bold" ml={1} data-testid="recipe-title">{recipe.strMeal}</Typography>
            <ShareAndFavorite />
          </AppBar>
          <Paper
          sx={{ 
            width: {xs: '90%', md: '60%'},
            mt: 10, 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 5 
          }}>
          <Typography fontWeight="bold" color="#F27457" variant="h4"  data-testid="recipe-category">
            {' '}
            {recipe.strCategory}
          </Typography>
          <Image
            sx={{
              width:'40%'
            }}
            data-testid="recipe-photo"
            src={ recipe.strMealThumb }
            className="img-food"
            alt="imagem da receita"
          />
          <Typography
            width="80%"
            fontWeight="bold"
            className="instructions"
            data-testid="instructions"
          >
            {recipe.strInstructions}
          </Typography>
          <Video
            data-testid="video"
            src={ video }
            title="recipe video"
            />
          </Paper>
        </Box>
      )}
      <Box display="flex" flexDirection="column" alignItems="center">
      <Paper sx={{width: {xs: '90%', md: '60%'}, mt: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5  }} className="list">
        <Typography color="#F27457" fontWeight="bold" variant='h4' sx={{ mt: 5 }}>
          Ingredients
        </Typography>
        <List sx={{ mb: 3 }}>
          {Array.isArray(ingredients) && ingredients.map((ingredient, index) => (
            (ingredient !== 'null - null' || ingredient !== '-')
          && (
            <ListItem
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 'bold' }}
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {ingredient}
            </ListItem>
          )
          ))}
        </List>
        <Button sx={{mb: 5}} variant='contained'
          className="start"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ handleClick }
        >
          { startContinue }
        </Button>
      </Paper>
      { recipeRecom.length > 1 && <Recomendations recipesRecom={ recipeRecom } />}
      </Box>
      <div className="start-content">
        <button
          className="start"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ handleClick }
        >
          { startContinue }
        </button>
      </div>
    </Box>
  );
}

export default RecipesDetails;

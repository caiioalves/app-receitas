import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import ShareAndFavorite from '../components/ShareAndFavorite';
import cardContext from '../context/cardContext';

function RecipeInProgress() {
  const history = useHistory();
  const { id } = useParams();
  const { pathname } = useLocation();
  const { setRecipeDetail } = useContext(cardContext);
  const type = pathname.includes('drink') ? 'drinks' : 'foods';
  const [recipeDetail, setRecipeDetailLocal] = useState([]);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [local, setLocal] = useState({});
  const [contextListIngredients, setContextListIngredients] = useState([]);
  const drinkEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const foodEndpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  useEffect(() => {
    const newData = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (newData === null) {
      return localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: { [id]: [] },
        meals: { [id]: [] } }));
    }
  }, []);

  useEffect(() => {
    const fetchApi = async (url, dataType) => {
      const res = await fetch(url);
      const data = await res.json();
      const recipeData = data[dataType][0];

      setRecipeDetailLocal(recipeData);
      setRecipeDetail(recipeData);

      const ingredientFilter = Object.entries(recipeData)
        .filter((ingredient) => ingredient[0].includes('strIngredient')
        && ingredient[1] !== null && ingredient[1] !== '');

      const measureFilter = Object.entries(recipeData)
        .filter((measure) => measure[0].includes('strMeasure'));
      const ingredientsList = ingredientFilter
        .map((ingredient, index) => (`${ingredient[1]} ${
          measureFilter[index][1] === null ? '' : measureFilter[index][1]}`));

      if (type === 'drinks') {
        const newData = JSON.parse(localStorage.getItem('inProgressRecipes'));
        setLocal(newData);
        const listIngredients = ingredientsList.map((item) => ({
          ingredient: item,
          check: newData.cocktails[id].includes(item),
        }));
        setContextListIngredients(listIngredients);
      } else {
        const newData = JSON.parse(localStorage.getItem('inProgressRecipes'));
        setLocal(newData);
        const listIngredients = ingredientsList.map((item) => ({
          ingredient: item,
          check: newData.meals[id].includes(item),
        }));

        setContextListIngredients(listIngredients);
      }

      // setContextListIngredients(ingredientsList);
    };
    if (type === 'foods') {
      fetchApi(foodEndpoint, 'meals');
    }
    if (type === 'drinks') {
      fetchApi(drinkEndpoint, 'drinks');
    }
  }, []);

  const enableBtn = () => {
    const newData = JSON.parse(localStorage.getItem('inProgressRecipes'));
    console.log(type === 'drinks'
      && newData.cocktails[id].length === contextListIngredients.length);

    if (type === 'foods'
      && newData.meals[id].length === contextListIngredients.length) {
      return setDisabledBtn(true);
    }

    if (type === 'drinks'
    && newData.cocktails[id].length === contextListIngredients.length) {
      return setDisabledBtn(true);
    }

    setDisabledBtn(false);
  };

  useEffect(() => {
    enableBtn();
  }, [local, contextListIngredients]);

  const handleClick = ({ target }) => {
    if (type === 'drinks') {
      const prevData = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (target.checked) {
        prevData.cocktails[id] = [...prevData.cocktails[id], target.value];
        localStorage.setItem('inProgressRecipes', JSON.stringify(prevData));
        setLocal(prevData);
      } else {
        const newData = prevData.cocktails[id]
          .filter((item) => item !== target.value);
        prevData.cocktails[id] = newData;
        localStorage.setItem('inProgressRecipes', JSON.stringify(prevData));
        setLocal(prevData);
      }
    } else {
      const prevData = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (target.checked) {
        prevData.meals[id] = [...prevData.meals[id], target.value];
        localStorage.setItem('inProgressRecipes', JSON.stringify(prevData));
        setLocal(prevData);
      } else {
        const newData = prevData.meals[id]
          .filter((item) => item !== target.value);
        prevData.meals[id] = newData;
        localStorage.setItem('inProgressRecipes', JSON.stringify(prevData));
        setLocal(prevData);
      }
    }
  };

  return (
    <div>
      <h1 data-testid="recipe-title">
        {type === 'foods' ? recipeDetail.strMeal : recipeDetail.strDrink}
      </h1>
      <ShareAndFavorite />
      <img
        className="hero"
        data-testid="recipe-photo"
        src={ type === 'foods' ? recipeDetail.strMealThumb : recipeDetail.strDrinkThumb }
        alt={ type === 'foods' ? recipeDetail.strMeal : recipeDetail.strDrink }
      />
      <p data-testid="recipe-category" />
      { contextListIngredients.length > 0 && type === 'drinks'
      && contextListIngredients.map((item, index) => (
        <div key={ index }>
          <label htmlFor={ index } data-testid={ `${index}-ingredient-step` }>
            <input
              id={ index }
              type="checkbox"
              value={ item.ingredient }
              onChange={ handleClick }
              checked={
                local.cocktails[id].includes(item.ingredient) ? item.check : false
              }
            />
            {item.ingredient}
          </label>
        </div>
      ))}
      { contextListIngredients.length > 0 && type === 'foods'
      && contextListIngredients.map((item, index) => (
        <div key={ index }>
          <label htmlFor={ index } data-testid={ `${index}-ingredient-step` }>
            <input
              id={ index }
              type="checkbox"
              value={ item.ingredient }
              onChange={ handleClick }
              checked={
                local.meals[id].includes(item.ingredient) ? item.check : false
              }
            />
            {item.ingredient}
          </label>
        </div>
      ))}
      <p data-testid="instructions">
        { recipeDetail.strInstructions }
      </p>
      <div className="start-content">
        <button
          className="start"
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ !disabledBtn }
          onClick={ () => history.push('/done-recipes') }
        >
          Finalizar
        </button>
      </div>
    </div>
  );
}

export default RecipeInProgress;

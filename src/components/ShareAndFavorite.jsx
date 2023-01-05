import clipboardCopy from 'clipboard-copy';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import cardContext from '../context/cardContext';
import favorite from '../images/blackHeartIcon.svg';
import share from '../images/shareIcon.svg';
import notFavorite from '../images/whiteHeartIcon.svg';

function ShareAndFavorite() {
  const { id } = useParams();
  const { recipeDetail } = useContext(cardContext);
  const [copied, setCopied] = useState(false);
  const { pathname } = useLocation();
  const [favorited, setFavorited] = useState(false);
  const type = pathname.includes('drink') ? 'Drink' : 'Food';

  const handleClick = () => {
    const newPathname = pathname.replace('/in-progress', '');
    console.log(newPathname, pathname);
    clipboardCopy(`http://localhost:3000${newPathname}`);
    setCopied(true);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (data === null) {
      return localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const filtredData = data.find((item) => item.id === id);
    if (filtredData !== undefined) {
      setFavorited(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeDetail]);

  const favoriteRecipe = () => {
    let data = {};
    if (type === 'Drink') {
      data = {
        id: recipeDetail.idDrink,
        type: 'drink',
        nationality: '',
        category: recipeDetail.strCategory,
        alcoholicOrNot: recipeDetail.strAlcoholic,
        name: recipeDetail.strDrink,
        image: recipeDetail.strDrinkThumb,
      };
    }
    if (type === 'Food') {
      console.log(recipeDetail.idMeal);
      data = {
        id: recipeDetail.idMeal,
        type: 'food',
        nationality: recipeDetail.strArea,
        category: recipeDetail.strCategory,
        alcoholicOrNot: '',
        name: recipeDetail.strMeal,
        image: recipeDetail.strMealThumb,
      };
    }

    const prevData = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (prevData === null) {
      return localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }

    const newData = [...prevData, data];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newData));
    setFavorited(true);
  };

  const notFavoriteRecipe = () => {
    const prevData = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const data = prevData.filter((item) => item.id !== id);
    console.log(data);
    const newData = [...data];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newData));
    setFavorited(false);
  };

  return (
    <div className="buttons">
      {
        !favorited
          && (
            <button
              className="button-fav"
              src={ notFavorite }
              type="button"
              data-testid="favorite-btn"
              onClick={ favoriteRecipe }
            >
              <img src={ notFavorite } alt="favorite" />
            </button>
          )
      }
      {
        favorited
          && (
            <button
              src={ favorite }
              className="button-fav"
              type="button"
              data-testid="favorite-btn"
              onClick={ notFavoriteRecipe }
            >
              <img src={ favorite } alt="favorite" />
            </button>
          )
      }
      <button
        type="button"
        className="button-fav"
        data-testid="share-btn"
        onClick={ handleClick }
      >
        <img src={ share } alt="share" />
      </button>
      { copied && <span>Link copied!</span>}
    </div>
  );
}

export default ShareAndFavorite;

import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  }, [filtredCategory]);

  const toggleCategory = ({ target }) => {
    const text = target.innerText;
    if (filtredCategory === text) {
      setFetched((prev) => !prev);
    } else {
      setFiltredCategory(text);
    }
  };

  return (
    <div className="body-recipes">
      <Header { ...props } />
      <header className="header-recipes">
        {
          category !== null && category.length > 1 && category.map((item) => (
            <button
              key={ `${item.strCategory}-key` }
              type="button"
              data-testid={ `${item.strCategory}-category-filter` }
              onClick={ toggleCategory }
            >
              { item.strCategory }
            </button>
          ))
        }
        <button
          key="all"
          type="button"
          data-testid="All-category-filter"
          onClick={ () => {
            setFetched((prev) => !prev);
          } }
        >
          All
        </button>
      </header>
      <section className="section-recipes">
        {
          recipe !== null && type === 'drinks'
          && recipe.map((rec, index) => (
            <Link
              to={ `/${type}/${rec.idDrink}` }
              data-testid={ `${index}-recipe-card` }
              key={ `${index}-recipe-card` }
            >
              <div className="card-container">
                <img
                  data-testid={ `${index}-card-img` }
                  src={ rec.strDrinkThumb }
                  alt={ rec.strDrink }
                  className="hero"
                />
                <h3 data-testid={ `${index}-card-name` }>
                  {rec.strDrink}
                </h3>
              </div>
            </Link>
          ))
        }
        {
          recipe !== null && type === 'foods'
          && recipe.map((rec, index) => (
            <Link
              to={ `/${type}/${rec.idMeal}` }
              data-testid={ `${index}-recipe-card` }
              key={ `${index}-recipe-card` }
            >
              <div className="card-container">
                <img
                  data-testid={ `${index}-card-img` }
                  src={ rec.strMealThumb }
                  alt={ rec.strMeal }
                  className="hero"
                />
                <h3 data-testid={ `${index}-card-name` }>
                  {rec.strMeal}
                </h3>
              </div>
            </Link>
          ))
        }
      </section>
      <Footer />
    </div>);
}

export default Recipe;

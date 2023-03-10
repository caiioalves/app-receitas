import { ThemeProvider } from '@mui/material';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Tema } from './components/Tema';
import CardProvider from './context/CardProvider';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import Profile from './pages/Profile';
import RecipesDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import Recipe from './pages/Recipes';

function App() {
  return (
    <ThemeProvider theme={Tema}>
    <Switch>
      <Route exact path="/" component={ Login } />
      <CardProvider>
        <Route exact path="/foods" component={ Recipe } />
        <Route exact path="/drinks" component={ Recipe } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/foods/:id" component={ RecipesDetails } />
        <Route exact path="/drinks/:id" component={ RecipesDetails } />
        <Route exact path="/foods/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </CardProvider>
    </Switch>
    </ThemeProvider>
  );
}

export default App;

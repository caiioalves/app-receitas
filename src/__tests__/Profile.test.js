import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/utils';

test('se o Botao e Titulo Profile estão na tela', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/profile');
  const profile = screen.getByTestId('btn-profile');
  const profileTitle = screen.getByTestId('page-title');

  expect(profile).toBeInTheDocument();
  expect(profileTitle).toBeInTheDocument();
});

test('se o botao Done Recipes existe e direciona para a página Done Recipes', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/profile');
  const doneRecipesButton = screen.getByTestId('profile-done-btn');
  expect(doneRecipesButton).toBeInTheDocument();
  userEvent.click(doneRecipesButton);
  expect(history.location.pathname).toBe('/done-recipes');
});

test('se o botao favorite recipes existe e direciona para a página Favorite Recipes',
  () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const favoriteRecipesButton = screen.getByTestId('profile-favorite-btn');
    expect(favoriteRecipesButton).toBeInTheDocument();
    userEvent.click(favoriteRecipesButton);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

test('se o botao Logout existe e direciona para a Home', async () => {
  const { history } = renderWithRouter(<App />);
  history.push('/profile');
  const logoutButton = screen.getByTestId('profile-logout-btn');
  expect(logoutButton).toBeInTheDocument();
  userEvent.click(logoutButton);
  expect(history.location.pathname).toBe('/');
});

test('se footer é renderizado na tela profile', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/profile');
  const drinks = screen.getByTestId('drinks-bottom-btn');
  const foods = screen.getByTestId('food-bottom-btn');
  expect(drinks).toBeInTheDocument();
  expect(foods).toBeInTheDocument();
});

test('se email é renderizado na tela', () => {
  const { history } = renderWithRouter(<App />);
  const inputEmail = screen.getByTestId('email-input');
  const inputPassword = screen.getByTestId('password-input');
  const enterButton = screen.getByTestId('login-submit-btn');
  userEvent.type(inputEmail, '123@123.com');
  userEvent.type(inputPassword, '123456789');
  userEvent.click(enterButton);
  history.push('/profile');
  const email = screen.getByTestId('profile-email');
  expect(email).toBeInTheDocument();
});

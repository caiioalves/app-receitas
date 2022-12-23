import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/utils';
import { mockedDrinks } from './mock/drinks';
import { mockedMeals } from './mock/meals';

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
      ...mockedMeals,
      ...mockedDrinks,
    }),
  }));

  global.alert = jest.fn(() => '');
});

afterEach(() => {
  jest.clearAllMocks();
  localStorage.removeItem('inProgressRecipes');
});

describe('foods', () => {
  it('testando se o botão tem o text continue recipe', async () => {
    const inProgressRecipes = {
      meals: {
        52771: [],
      },
      cocktails: {
        178319: [],
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52771');

    const tsec = 1000;
    await new Promise((time) => setTimeout(time, tsec));

    expect(screen.getByTestId(/start-recipe-btn/)).toHaveTextContent(/Continue Recipe/);
  });
  it('testando se o botão tem o text start recipe', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52771');

    const tsec = 1000;
    await new Promise((time) => setTimeout(time, tsec));

    expect(screen.getByTestId(/start-recipe-btn/)).toHaveTextContent(/Start Recipe/);
  });
});
describe('drinks', () => {
  it('testando se o botão tem o text continue recipe', async () => {
    const inProgressRecipes = {
      cocktails: {
        178319: [],
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/178319');

    const tsec = 1000;
    await new Promise((time) => setTimeout(time, tsec));

    expect(screen.getByTestId(/start-recipe-btn/)).toHaveTextContent(/Continue Recipe/);
  });
  it('testando se o botão tem o text start recipe', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/178319');

    const tsec = 1000;
    await new Promise((time) => setTimeout(time, tsec));

    expect(screen.getByTestId(/start-recipe-btn/)).toHaveTextContent(/Start Recipe/);
  });
});

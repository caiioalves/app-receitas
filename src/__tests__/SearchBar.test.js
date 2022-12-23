import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import App from '../App';
import { meal } from './mock/meals';

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
      meals: [meal], drinks: [{ idDrink: '11113' }],
    }),
  }));

  global.alert = jest.fn(() => '');
});

afterEach(() => {
  jest.clearAllMocks();
});

const btnSearch = 'btn-search';
const searchInput = 'search-input';
const nameSearchRadio = 'name-search-radio';
const ingredientSearchRadio = 'ingredient-search-radio';
const firstLetterSearchRadio = 'first-letter-search-radio';
const execSearchBtn = 'exec-search-btn';

describe('test searchBar component in /foods path', () => {
  it('search bar in /foods', () => {
    const history = createMemoryHistory();
    history.push('/foods');
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    userEvent.click(screen.getByTestId(btnSearch));
    const input = screen.getByTestId(searchInput);
    expect(input).toBeDefined();
    const ingredient = screen.getByTestId(ingredientSearchRadio);
    const name = screen.getByTestId(nameSearchRadio);
    const letter = screen.getByTestId(firstLetterSearchRadio);
    const btn = screen.getByTestId(execSearchBtn);
    expect(ingredient).toBeDefined();
    expect(name).toBeDefined();
    expect(letter).toBeDefined();

    userEvent.click(ingredient);
    userEvent.click(btn);

    const mgNum1 = 3;
    expect(fetch).toBeCalledTimes(mgNum1);

    userEvent.click(name);
    userEvent.click(btn);

    const mgNum2 = 4;
    expect(fetch).toBeCalledTimes(mgNum2);

    userEvent.click(letter);
    userEvent.click(btn);

    const mgNum3 = 5;
    expect(fetch).toBeCalledTimes(mgNum3);

    userEvent.click(letter);
    userEvent.type(input, 'aa');
    userEvent.click(btn);

    expect(global.alert)
      .toBeCalledWith('Your search must have only 1 (one) character');
  });
  it('search bar redirect /food/52829', async () => {
    const history = createMemoryHistory();
    history.push('/foods');
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    userEvent.click(screen.getByTestId(btnSearch));
    const input = screen.getByTestId(searchInput);
    expect(input).toBeDefined();
    const name = screen.getByTestId(nameSearchRadio);
    const btn = screen.getByTestId(execSearchBtn);

    userEvent.click(name);
    userEvent.type(input, 'Grilled Mac and Cheese');
    userEvent.click(btn);

    const tsec = 3000;
    await new Promise((time) => setTimeout(time, tsec));

    expect(history.location.pathname).toBe('/foods/52977');
  });
});

describe('test searchBar component in /drinks path', () => {
  it('search bar redirect /drinks/52977', async () => {
    const history = createMemoryHistory();
    history.push('/drinks');
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    userEvent.click(screen.getByTestId(btnSearch));
    const input = screen.getByTestId(searchInput);
    expect(input).toBeDefined();
    const name = screen.getByTestId(nameSearchRadio);
    const btn = screen.getByTestId(execSearchBtn);

    userEvent.click(name);
    userEvent.type(input, 'Bloody mary');
    userEvent.click(btn);

    const tsec = 3000;
    await new Promise((time) => setTimeout(time, tsec));

    expect(history.location.pathname).toBe('/drinks/11113');
  });

  it('search bar in /drinks', () => {
    const history = createMemoryHistory();
    history.push('/drinks');
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    userEvent.click(screen.getByTestId(btnSearch));
    const input = screen.getByTestId(searchInput);
    expect(input).toBeDefined();
    const ingredient = screen.getByTestId(ingredientSearchRadio);
    const name = screen.getByTestId(nameSearchRadio);
    const letter = screen.getByTestId(firstLetterSearchRadio);
    const btn = screen.getByTestId(execSearchBtn);
    expect(ingredient).toBeDefined();
    expect(name).toBeDefined();
    expect(letter).toBeDefined();

    userEvent.click(ingredient);
    userEvent.type(input, 'lemon');
    userEvent.click(btn);

    const mgNum1 = 3;
    expect(fetch).toBeCalledTimes(mgNum1);

    userEvent.click(name);
    userEvent.click(btn);

    const mgNum2 = 4;
    expect(fetch).toBeCalledTimes(mgNum2);

    userEvent.click(letter);
    userEvent.click(btn);

    const mgNum3 = 5;
    expect(fetch).toBeCalledTimes(mgNum3);

    userEvent.click(letter);
    userEvent.type(input, 'aa');
    userEvent.click(btn);

    expect(global.alert).toBeCalled();
    expect(global.alert)
      .toBeCalledWith('Your search must have only 1 (one) character');
  });
});

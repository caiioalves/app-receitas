import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import App from '../App';
import { mockedDrinks } from './mock/drinks';
import { mockedMeals } from './mock/meals';

const mgnumdoze = 12;

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
});

const btnSearch = 'btn-search';
const searchInput = 'search-input';
const firstLetterSearchRadio = 'first-letter-search-radio';
const execSearchBtn = 'exec-search-btn';

describe('test searchBar component in /foods path', () => {
  it('searchbar cards /foods', async () => {
    const history = createMemoryHistory();
    history.push('/foods');
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    userEvent.click(screen.getByTestId(btnSearch));

    const input = screen.getByTestId(searchInput);
    const letter = screen.getByTestId(firstLetterSearchRadio);
    const btn = screen.getByTestId(execSearchBtn);

    userEvent.click(letter);
    userEvent.type(input, 'k');
    userEvent.click(btn);

    const tsec = 3000;
    await new Promise((time) => setTimeout(time, tsec));

    expect(screen.getAllByTestId(/recipe-card/)).toHaveLength(mgnumdoze);
  });
  it('searchbar cards /foods', async () => {
    const history = createMemoryHistory();
    history.push('/foods');
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const btn = screen.getByTestId(/category-filter/);
    userEvent.click(btn);

    const tsec = 3000;
    await new Promise((time) => setTimeout(time, tsec));

    expect(screen.getAllByTestId(/recipe-card/)).toHaveLength(mgnumdoze);
  });
});

describe('test searchBar component in /drinks path', () => {
  it('searchbar cards /drinks', async () => {
    const history = createMemoryHistory();
    history.push('/drinks');
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    userEvent.click(screen.getByTestId(btnSearch));

    const input = screen.getByTestId(searchInput);
    const letter = screen.getByTestId(firstLetterSearchRadio);
    const btn = screen.getByTestId(execSearchBtn);

    userEvent.click(letter);
    userEvent.type(input, 'k');
    userEvent.click(btn);

    const tsec = 3000;
    await new Promise((time) => setTimeout(time, tsec));

    expect(screen.getAllByTestId(/recipe-card/)).toHaveLength(mgnumdoze);
  });
});

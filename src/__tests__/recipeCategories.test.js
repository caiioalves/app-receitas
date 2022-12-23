import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import App from '../App';
import { mockedCategoryDrinks, mockedCategoryMeals } from './mock/category';

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
      ...mockedCategoryMeals,
      ...mockedCategoryDrinks,
    }),
  }));
});

afterEach(() => {
  jest.clearAllMocks();
});

const three = 3;
const five = 5;
const categories = 6;

describe('test searchBar component in /foods path', () => {
  it('filter buttons /foods', async () => {
    const history = createMemoryHistory();
    history.push('/foods');
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const tsec = 2000;
    await new Promise((time) => setTimeout(time, tsec));

    const btn = screen.getByTestId(/Beef-category-filter/);
    userEvent.click(btn);

    expect(global.fetch).toBeCalledTimes(three);
    expect(screen.getAllByTestId(/category-filter/)).toHaveLength(categories);

    userEvent.click(screen.getByTestId(/Beef-category-filter/));
    expect(global.fetch).toBeCalledTimes(five);
  });
});

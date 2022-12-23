import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import App from '../App';
import { mockedDrinks } from './mock/drinks';
import { meal } from './mock/meals';

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
      meals: [meal],
      ...mockedDrinks,
    }),
  }));

  global.alert = jest.fn(() => '');
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('test recomendations', () => {
  it('recomendations drink aparear 6', async () => {
    const history = createMemoryHistory();
    history.push('/foods/52977');
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const tsec = 1000;
    await new Promise((time) => setTimeout(time, tsec));

    expect(history.location.pathname).toEqual('/foods/52977');

    const btn = screen.getByTestId('start-recipe-btn');
    userEvent.click(btn);

    expect(history.location.pathname).toEqual('/foods/52977/in-progress');
  });
});

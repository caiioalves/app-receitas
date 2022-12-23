import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import App from '../App';
import { drink } from './mock/drinks';
import { mockedMeals } from './mock/meals';

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
      drinks: [drink],
      ...mockedMeals,
    }),
  }));
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('test recomendations', () => {
  it('recomendations drink aparear 6', async () => {
    const history = createMemoryHistory();
    history.push('/drinks/11113');
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const mgNum = 6;
    const tsec = 1000;
    await new Promise((time) => setTimeout(time, tsec));

    expect(history.location.pathname).toEqual('/drinks/11113');

    const card = screen.getAllByTestId(/recomendation-card/);

    expect(card).toHaveLength(mgNum);

    userEvent.click(card[0]);

    expect(history.location.pathname).toEqual('/foods/52829');
  });
});

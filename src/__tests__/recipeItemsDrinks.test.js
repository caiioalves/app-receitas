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

  global.alert = jest.fn(() => '');
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('test recomendations', () => {
  it('recomendations drink aparear 6', async () => {
    const history = createMemoryHistory();
    history.push('/drinks/11113/in-progress');
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const tsec = 1000;
    await new Promise((time) => setTimeout(time, tsec));

    const mgnum = 6;

    const inputs = screen.getAllByTestId(/ingredient-step/);
    const btn = screen.getByTestId('finish-recipe-btn');

    expect(inputs).toHaveLength(mgnum);
    expect(btn).toBeDefined();
    expect(btn).toBeDisabled();

    for (let i = 0; i < inputs.length; i += 1) {
      userEvent.click(inputs[i]);
    }

    expect(btn).toBeEnabled();

    userEvent.click(screen.getByTestId('finish-recipe-btn'));

    expect(history.location.pathname).toEqual('/done-recipes');
  });
  it('recomendations drink aparear 6', async () => {
    const history = createMemoryHistory();
    history.push('/drinks/11113/in-progress');
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const tsec = 1000;
    await new Promise((time) => setTimeout(time, tsec));

    const inputs = screen.getAllByTestId(/ingredient-step/);

    userEvent.click(inputs[0]);

    expect(screen.getAllByTestId(/ingredient-step/)[1].children[0]).toBeChecked();
  });
});

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/utils';
// import mockedDrinks from './mock/drinks';
// import { mockedMeals } from './mock/meals';

// beforeEach(() => {
//   global.fetch = jest.fn(() => Promise.resolve({
//     json: () => Promise.resolve({
//       ...mockedMeals,
//       ...mockedDrinks,
//     }),
//   }));

//   global.alert = jest.fn(() => '');
// });

// afterEach(() => {
//   jest.clearAllMocks();
// });

describe('test recomendations', () => {
  test('se recomendations drink aparece em 6', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52977');
    const gg = await screen.findByTestId('0-recomendation-title');
    expect(gg).toBeInTheDocument();
    userEvent.click(gg);
    expect(history.location.pathname).toBe('/drinks/15997');
  });
  test('se se recomendations food aparece em 6 ');
});

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/utils';

test('', () => {
  const { history } = renderWithRouter(<App />);
  const inputEmail = screen.getByTestId('email-input');
  userEvent.type(inputEmail, '123@123.com');
  expect(inputEmail).toBeInTheDocument();

  const inputPassword = screen.getByTestId('password-input');
  userEvent.type(inputPassword, '123456789');
  expect(inputPassword).toBeInTheDocument();

  const enterButton = screen.getByTestId('login-submit-btn');
  userEvent.click(enterButton);
  expect(history.location.pathname).toBe('/foods');
});

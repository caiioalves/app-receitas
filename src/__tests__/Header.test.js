import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import App from '../App';

const page = 'page-title';

describe('test header component', () => {
  it('header component contain correct info in path food', () => {
    render(
      <MemoryRouter initialEntries={ ['/foods'] }>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('profile-top-btn').src)
      .toContain('http://localhost/profileIcon.svg');
    expect(screen.getByTestId('search-top-btn').src)
      .toContain('http://localhost/searchIcon.svg');
    expect(screen.getByTestId(page)).toHaveTextContent(/Foods/);
  });
  it('header component buttons work', () => {
    const history = createMemoryHistory();
    history.push('/foods');
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    expect(screen.getByTestId(page)).toHaveTextContent(/Foods/);

    userEvent.click(screen.getByTestId('btn-search'));
    expect(screen.getByTestId('search-input')).toBeDefined();
    userEvent.click(screen.getByTestId('btn-profile'));

    expect(history.location.pathname).toEqual('/profile');
    expect(screen.getByTestId(page)).toHaveTextContent(/Profile/);
  });
});

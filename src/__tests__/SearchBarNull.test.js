import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import App from '../App';

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
      meals: null, drinks: null,
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
    const letter = screen.getByTestId(firstLetterSearchRadio);
    const btn = screen.getByTestId(execSearchBtn);

    userEvent.click(letter);
    userEvent.type(input, 'a');
    userEvent.click(btn);

    const tsec = 3000;
    await new Promise((time) => setTimeout(time, tsec));

    expect(global.alert).toBeCalled();
    expect(global.alert)
      .toBeCalledWith('Sorry, we haven\'t found any recipes for these filters.');
  });
});

describe('test searchBar component in /drinks path', () => {
  it('search bar in /drinks', async () => {
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
    userEvent.type(input, 'a');
    userEvent.click(btn);

    const tsec = 3000;
    await new Promise((time) => setTimeout(time, tsec));

    expect(global.alert).toBeCalled();
    expect(global.alert)
      .toBeCalledWith('Sorry, we haven\'t found any recipes for these filters.');
  });
});

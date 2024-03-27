
import '@testing-library/jest-dom';
import { TextEncoder } from 'node:util';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import App, { API_URL } from '../App';
import { sampleResult } from './testUtils';
global.TextEncoder = TextEncoder;

const server = setupServer(
  // @ts-ignore unused params
  http.get(`${API_URL}/pikachu`, () => {
    return HttpResponse.json(sampleResult);
  })
)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


/**
 * Utility methods
 */
function getSearchButton(): HTMLButtonElement {
  return screen.getByTestId('search-button');
};
function getSearchInput(): HTMLInputElement {
  return screen.getByTestId('search-input');
};


describe('Testing <App/>', () => {

  beforeEach(() => {
    render(<App />);
  })

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test.only('search input and search button are rendered on load', () => {

    const searchInput = getSearchInput();
    expect(searchInput).toBeTruthy();

    const searchButton = getSearchButton();
    expect(searchButton).toBeTruthy();

    expect(searchInput.placeholder.length).toBeGreaterThan(0);
  });

  // WIP
  test('it should test the fetchCalled and Loading States', async () => {

    const searchButton = getSearchButton();
    const searchInput = getSearchInput();

    searchInput.value = 'Pikachu';
    act(() => fireEvent.click(searchButton));

    const out = await waitFor(() => screen.getByTestId("pokemon-name"));

    expect(out).toHaveTextContent(/pikachu/i);

  });
});

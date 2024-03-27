
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


// jest.mock('react', () => ({
//   ...jest.requireActual('react'),
//   useState: jest.fn(),
// }));



describe('Testing <App/>', () => {

  // @ts-ignore no-unused-vars 
  // let setFetchCalled = jest.fn((v: boolean) => { });
  // let setLoading = jest.fn((v: boolean) => { });
  // let setPokemonList = jest.fn((v: any[]) => { });
  // let setError = jest.fn((v: string) => { });
  // let setNoResults = jest.fn((v: boolean) => { });

  // let wrapper = null;

  beforeEach(() => {

    // jest.spyOn(React, 'useState').mockImplementationOnce(
    //   (fetchCalled: boolean) => { return [fetchCalled, setFetchCalled]; }
    // );
    // jest.spyOn(React, 'useState').mockImplementationOnce(
    //   (loading: boolean) => { return [loading, setLoading]; }
    // );

    // jest.spyOn(React, 'useState')
    //   .mockImplementationOnce((fetchCalled: boolean) => [fetchCalled, setFetchCalled]);
    // // @ts-ignore no-unused-vars 
    // .mockImplementationOnce(v => [v, setLoading])
    // // @ts-ignore no-unused-vars 
    // .mockImplementationOnce(v => [v, setError])
    // // @ts-ignore no-unused-vars 
    // .mockImplementationOnce(v => [v, setNoResults])
    // // @ts-ignore no-unused-vars 
    // .mockImplementationOnce(v => [v, setPokemonList]);

    // useStateMock.mockImplementation(init => [init, setState]);
    render(<App />);
    // render(<App />);
  })

  function getSearchButton(): HTMLButtonElement {
    return screen.getByTestId('search-button');
  };
  function getSearchInput(): HTMLInputElement {
    return screen.getByTestId('search-input');
  };

  test('search input and search button are rendered on load', () => {

    const searchInput = getSearchInput();
    expect(searchInput).toBeTruthy();

    const searchButton = getSearchButton();
    expect(searchButton).toBeTruthy();

    expect(searchInput.placeholder.length).toBeGreaterThan(0);
  });

  test('it should test the fetchCalled and Loading States', async () => {


    // (useStateMock as jest.Mock).mockImplementation((fetchCalled: boolean) => [fetchCalled, setFetchCalled]);

    const searchButton = getSearchButton();
    const searchInput = getSearchInput();

    searchInput.value = 'Pikachu';
    act(() => fireEvent.click(searchButton));

    const out = await waitFor(() => screen.getByTestId("pokemon-name"));


    expect(out).toHaveTextContent(/pikachu/i);

  });
});

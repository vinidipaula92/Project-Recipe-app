import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import fetchMock from '../../cypress/mocks/fetch';
import App from '../App';
import customRender from './__RenderWithRouterAndRedux';

describe('Testa a Tela principal de receitas de comidas: /foods;', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => fetchMock(url));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Testes do Header', async () => {
    customRender(<App />, '/foods');
    // Testes do Header
    const profilePage = screen.getByRole('img', { name: /login/i });
    const searchIcon = screen.getByRole('button', { name: /search/i });
    const allBtn = await screen.findByTestId('All-category-filter');
    const beefBTN = await screen.findByTestId('Beef-category-filter');
    const breakfastBtn = await screen.findByTestId('Breakfast-category-filter');
    const chickenBtn = await screen.findByTestId('Chicken-category-filter');
    const dessertBtn = await screen.findByTestId('Dessert-category-filter');
    const goatBtn = await screen.findByTestId('Goat-category-filter');

    expect(profilePage).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    expect(beefBTN).toBeInTheDocument();
    expect(breakfastBtn).toBeInTheDocument();
    expect(chickenBtn).toBeInTheDocument();
    expect(dessertBtn).toBeInTheDocument();
    expect(goatBtn).toBeInTheDocument();

    userEvent.click(allBtn);
    userEvent.click(beefBTN);
    userEvent.click(breakfastBtn);
    userEvent.click(chickenBtn);
    userEvent.click(dessertBtn);
    userEvent.click(goatBtn);
    userEvent.click(searchIcon);
  });

  it('Testes do seachHeader', async () => {
    customRender(<App />, '/foods');
    // Testes do Header

    const searchIcon = screen.getByRole('button', { name: /search/i });
    userEvent.click(searchIcon);
    const inputTextHeader = await screen.findByTestId(/search-input/i);
    const ingredientRadio = await screen.findByText(/ingredient/i);
    const nameRadio = await screen.findByText(/name/i);
    const firstLetterRadio = await screen.findByText(/first letter/i);
    expect(inputTextHeader).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();

    const searchBtn = await screen.findByTestId('exec-search-btn');
    userEvent.type(inputTextHeader, 'chicken');
    userEvent.click(ingredientRadio);
    userEvent.click(searchBtn);

    userEvent.type(inputTextHeader, 'soup');
    userEvent.click(nameRadio);
    userEvent.click(searchBtn);

    userEvent.type(inputTextHeader, 'a');
    userEvent.click(firstLetterRadio);
    userEvent.click(searchBtn);

    userEvent.type(inputTextHeader, 'Arrabiata');
    userEvent.click(nameRadio);
    userEvent.click(searchBtn);

    userEvent.type(inputTextHeader, 'xablau');
    userEvent.click(nameRadio);
    userEvent.click(searchBtn);
  });

  it('Testes do Footer', () => {
    customRender(<App />, '/foods');
    // Testes do Header
    const mealFooterBtn = screen.getByRole('img', { name: /meal/i });
    const drinkFooterBtn = screen.getByRole('img', { name: /drink/i });
    const exploreFooterBtn = screen.getByRole('img', { name: /explore/i });

    expect(mealFooterBtn).toBeInTheDocument();
    expect(drinkFooterBtn).toBeInTheDocument();
    expect(exploreFooterBtn).toBeInTheDocument();
  });
  // Testes do Footer
  it('Testes do Cards', async () => {
    customRender(<App />, '/foods');
    const img = await screen.findByText(/corba/i);

    expect(img).toBeInTheDocument();
  });
});

// import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import React from 'react';
import fetchMock from '../../cypress/mocks/fetch';
import Food from '../pages/Food';
import customRender from './__RenderWithRouterAndRedux';

describe('Testa a Tela principal de receitas de comidas: /foods;', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => fetchMock(url));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Testes do Header', async () => {
    customRender(<Food />, { initialEntries: ['/foods'] });
    // Testes do Header
    const profilePage = screen.getByRole('img', { name: /login/i });
    const searchIcon = screen.getByRole('img', { name: /search/i });
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

    /*     userEvent.click(searchIcon);

    const inputTextHeader = screen.getByRole('textbox');
    const ingredientRadio = screen.getByText(/ingredient/i);
    const nameRadio = screen.getByText(/name/i);
    const firstLetterRadio = screen.getByText(/first letter/i);
    expect(inputTextHeader).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument(); */
  });

  it('Testes do Footer', () => {
    customRender(<Food />);
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
    customRender(<Food />);
    const img = await screen.findByText(/corba/i);

    expect(img).toBeInTheDocument();
  });
});

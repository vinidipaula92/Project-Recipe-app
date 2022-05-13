import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import fetchMock from '../../cypress/mocks/fetch';
import App from '../App';
import customRender from './__RenderWithRouterAndRedux';

describe('Testa a Tela principal de receitas de comidas: /drinks;', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => fetchMock(url));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Testes do Header', async () => {
    customRender(<App />, '/drinks');
    // Testes do Header
    const profilePage = screen.getByRole('img', { name: /login/i });
    const searchIcon = screen.getByRole('img', { name: /search/i });
    const allBtn = await screen.findByTestId('All-category-filter');
    const ordinaryBtn = await screen.getByRole('button', { name: /ordinary drink/i });
    const cocktailBtn = await screen.getByRole('button', { name: /cocktail/i });
    const shakeBtn = await screen.getByRole('button', { name: /shake/i });
    const otherBtn = await screen.getByRole('button', { name: /other\/unknown/i });
    const cocoaBtn = await screen.getByRole('button', { name: /cocoa/i });

    expect(profilePage).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    expect(ordinaryBtn).toBeInTheDocument();
    expect(cocktailBtn).toBeInTheDocument();
    expect(shakeBtn).toBeInTheDocument();
    expect(otherBtn).toBeInTheDocument();
    expect(cocoaBtn).toBeInTheDocument();

    userEvent.click(allBtn);
    userEvent.click(ordinaryBtn);
    userEvent.click(cocktailBtn);
    userEvent.click(shakeBtn);
    userEvent.click(otherBtn);
    userEvent.click(cocoaBtn);
    userEvent.click(searchIcon);

    const inputTextHeader = screen.getByRole('textbox');
    const ingredientRadio = screen.getByText(/ingredient/i);
    const nameRadio = screen.getByText(/name/i);
    const firstLetterRadio = screen.getByText(/first letter/i);
    expect(inputTextHeader).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
  });

  it('Testes do Footer', () => {
    customRender(<App />, '/drinks');
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
    customRender(<App />, '/drinks');
    const img = await screen.findByText(/GG/i);

    expect(img).toBeInTheDocument();
  });
});

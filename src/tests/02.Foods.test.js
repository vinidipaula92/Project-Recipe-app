/* import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Food from '../pages/Login';
import { buttonId, emailForTests, emailId, passwordId } from '../services/consts';
import renderWithRouter from './__RenderWithRouter';

describe('Testa a Tela principal de receitas de comidas: /foods;', () => {
  it('Testes do Header', () => {
    renderWithRouter(<Food />);
    // Testes do Header
    const profilePage = screen.getByRole('img', { name: /login/i });
    const searchIcon = screen.getByRole('img', { name: /search/i });
    const inputTextHeader = screen.getByRole('textbox');
    const searchBtn = screen.getByTestId('exec-search-btn');

    expect(profilePage).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(inputTextHeader).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  it('Testes do Footer', () => {
    renderWithRouter(<Food />);
    // Testes do Header
    const mealFooterBtn = screen.getByRole('img', { name: /meal/i });
    const drinkFooterBtn = screen.getByRole('img', { name: /drink/i });
    const exploreFooterBtn = screen.getByRole('img', { name: /explore/i });

    expect(mealFooterBtn).toBeInTheDocument();
    expect(drinkFooterBtn).toBeInTheDocument();
    expect(exploreFooterBtn).toBeInTheDocument();

    // Testes do Footer
  });
});
 */

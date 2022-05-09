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

  it('Testes do Header', () => {
    customRender(<Food />, '/foods');
    // Testes do Header
    const profilePage = screen.getByRole('img', { name: /login/i });
    const searchIcon = screen.getByRole('img', { name: /search/i });
    // const inputTextHeader = screen.getByRole('textbox');
    // const searchBtn = screen.getByTestId('exec-search-btn');

    expect(profilePage).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    // expect(inputTextHeader).toBeInTheDocument();
    // expect(searchBtn).toBeInTheDocument();
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

    // Testes do Footer
  });
  it('Testes do Header', async () => {
    customRender(<Food />);
    const img = await screen.findByText(/corba/i);

    expect(img).toBeInTheDocument();
  });
});

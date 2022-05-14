import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import fetchMock from '../../cypress/mocks/fetch';
import App from '../App';
import { favoriteRecipes } from '../services/consts';
import customRender from './__RenderWithRouterAndRedux';

describe(
  'Testa a Tela de /favorite-recipes',
  () => {
    beforeEach(() => {
      global.fetch = jest.fn((url) => fetchMock(url));
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
    it('Testa a Tela de /favorite-recipes', async () => {
      customRender(<App />,
        '/favorite-recipes');
      const image = await screen.findByTestId('0-horizontal-image');
      const food = await screen.findByRole('button', { name: /food/i });
      const drink = await screen.findByRole('button', { name: /drinks/i });
      const share = await screen.findByRole('img', { name: /compartilhar/i });
      const favorite = await screen.getByRole('img', { name: /favoritar/i });

      const favoritesBtn1 = await screen.findByTestId('0-horizontal-favorite-btn');
      const favoritesBtn2 = await screen.findByTestId('1-horizontal-favorite-btn');

      expect(image).toBeInTheDocument();
      expect(food).toBeInTheDocument();
      expect(drink).toBeInTheDocument();
      expect(share).toBeInTheDocument();
      expect(favorite).toBeInTheDocument();

      userEvent.click(food);
      userEvent.click(drink);
      userEvent.click(share);
      userEvent.click(favorite);
      userEvent.click(favoritesBtn1);
      userEvent.click(favoritesBtn2);
    });
  },
);

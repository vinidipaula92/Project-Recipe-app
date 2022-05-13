import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import fetchMock from '../../cypress/mocks/fetch';
import App from '../App';
import customRender from './__RenderWithRouterAndRedux';

describe(
  'Testa a Tela de /profile',
  () => {
    beforeEach(() => {
      global.fetch = jest.fn((url) => fetchMock(url));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
    it('Testa a Tela de /profile', async () => {
      customRender(<App />,
        '/profile');
      const doneReciipe = await screen.getByRole('button', { name: /done recipes/i });
      const favoriteRecipe = await screen
        .getByRole('button', { name: /favorite recipes/i });
      const logout = await screen.getByRole('button', { name: /logout/i });

      expect(doneReciipe).toBeInTheDocument();
      expect(favoriteRecipe).toBeInTheDocument();
      expect(logout).toBeInTheDocument();

      userEvent.click(logout);
    });
  },
);

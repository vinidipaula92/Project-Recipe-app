import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import React from 'react';
import fetchMock from '../../cypress/mocks/fetch';
import App from '../App';
import customRender from './__RenderWithRouterAndRedux';

describe(
  'Testa a Tela de explorar bebidas: /explore/drinks;',
  () => {
    beforeEach(() => {
      global.fetch = jest.fn((url) => fetchMock(url));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
    it('Testa a Tela de explorar bebidas: /explore/drinks;', async () => {
      customRender(<App />,
        '/explore/drinks');
      const exploreByIngredient = await screen
        .findByRole('button', { name: /by ingredient/i });
      const exploreSurpriseMe = await screen
        .findByRole('button', { name: /surprise me!/i });

      expect(exploreByIngredient).toBeInTheDocument();
      expect(exploreSurpriseMe).toBeInTheDocument();
    });
  },
);

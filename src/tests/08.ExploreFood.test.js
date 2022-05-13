import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import React from 'react';
import fetchMock from '../../cypress/mocks/fetch';
import App from '../App';
import customRender from './__RenderWithRouterAndRedux';

describe(
  'Testa a Tela de explorar comidas: /explore/foods;',
  () => {
    beforeEach(() => {
      global.fetch = jest.fn((url) => fetchMock(url));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
    it('Testa a Tela de explorar comidas: /explore/foods;', async () => {
      customRender(<App />,
        '/explore/foods');
      const exploreByIngredient = await screen
        .findByRole('button', { name: /by ingredient/i });
      const exploreByNationality = await screen
        .findByRole('button', { name: /by nationality/i });
      const exploreSurpriseMe = await screen
        .findByRole('button', { name: /surprise me!/i });

      expect(exploreByIngredient).toBeInTheDocument();
      expect(exploreByNationality).toBeInTheDocument();
      expect(exploreSurpriseMe).toBeInTheDocument();
    });
  },
);

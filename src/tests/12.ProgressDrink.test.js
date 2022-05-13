import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import fetchMock from '../../cypress/mocks/fetch';
import App from '../App';
import { NUMBER_TREE } from '../services/consts';
import customRender from './__RenderWithRouterAndRedux';

describe(
  'Testa a Tela de explorar comidas: /not found',
  () => {
    beforeEach(() => {
      global.fetch = jest.fn((url) => fetchMock(url));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
    it('Testa a Tela in progress food:  /drinks/178319/in-progress', async () => {
      customRender(<App />,
        '/drinks/178319/in-progress');
      const aquamarine = await screen.findByRole('img', { name: /aquamarine/i });
      const share = await screen.findByRole('img', { name: /compartilhar/i });
      const favorite = await screen.findByRole('img', { name: /favoritar/i });
      const ingredients = await screen.findByRole('heading', { name: /ingredients/i });
      const instructions = await screen.findByRole('heading', { name: /instructions/i });
      const finishBtn = await screen.findByRole('button', { name: /finish/i });
      const alcoholic = await screen.getByText(/alcoholic/i);

      const allIngredients = await screen.findAllByTestId(/ingredient-step/i);
      expect(allIngredients.length).toBe(NUMBER_TREE);
      expect(aquamarine).toBeInTheDocument();
      expect(share).toBeInTheDocument();
      expect(favorite).toBeInTheDocument();
      expect(ingredients).toBeInTheDocument();
      expect(instructions).toBeInTheDocument();
      expect(finishBtn).toBeInTheDocument();
      expect(alcoholic).toBeInTheDocument();

      userEvent.click(share);
      userEvent.click(favorite);
      userEvent.click(favorite);

      expect(finishBtn).toBeDisabled();
      allIngredients.forEach((ingredientCheck) => {
        userEvent.click(ingredientCheck);
      });
      expect(finishBtn).toBeEnabled();

      userEvent.click(finishBtn);
    });
  },
);

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import fetchMock from '../../cypress/mocks/fetch';
import App from '../App';
import { NUMBER_EITH } from '../services/consts';
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
    it('Testa a Tela in progress food:  /foods/52977/in-progress', async () => {
      customRender(<App />,
        '/foods/52771/in-progress');
      const spicy = await screen.findByRole('img', { name: /Spicy Arrabiata Penne/i });
      const share = await screen.findByRole('img', { name: /compartilhar/i });
      const favorite = await screen.findByRole('img', { name: /favoritar/i });
      const ingredients = await screen.findByRole('heading', { name: /ingredients/i });
      const instructions = await screen.findByRole('heading', { name: /instructions/i });
      const finishBtn = await screen.findByRole('button', { name: /finish/i });
      const vegetarian = await screen.getByText(/vegetarian/i);

      const allIngredients = await screen.findAllByTestId(/ingredient-step/i);
      expect(allIngredients.length).toBe(NUMBER_EITH);
      expect(spicy).toBeInTheDocument();
      expect(share).toBeInTheDocument();
      expect(favorite).toBeInTheDocument();
      expect(ingredients).toBeInTheDocument();
      expect(instructions).toBeInTheDocument();
      expect(finishBtn).toBeInTheDocument();
      expect(vegetarian).toBeInTheDocument();

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

import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import React from 'react';
import fetchMock from '../../cypress/mocks/fetch';
import App from '../App';
import customRender from './__RenderWithRouterAndRedux';

describe(
  'Testa a Tela de detalhes de uma receita de comida: /foods/{id-da-receita};',
  () => {
    beforeEach(() => {
      global.fetch = jest.fn((url) => fetchMock(url));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
    it('Testa detalhes da receita de food', async () => {
      customRender(<App />,
        '/foods/52977');

      const imgRecipe1 = await screen
        .findByRole('img', { name: /spicy arrabiata penne/i });
      const nameRecipe1 = await screen
        .findByRole('heading', { name: /spicy arrabiata penne/i });

      expect(imgRecipe1).toBeInTheDocument();
      expect(nameRecipe1).toBeInTheDocument();
    });
  },
);

import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import React from 'react';
import fetchMock from '../../cypress/mocks/fetch';
import App from '../App';
import customRender from './__RenderWithRouterAndRedux';

describe(
  'Testa a Tela de detalhes de uma receita de bebida: /drinks/{id-da-receita};',
  () => {
    beforeEach(() => {
      global.fetch = jest.fn((url) => fetchMock(url));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
    it('Testa detalhes da receita de drink', async () => {
      customRender(<App />,
        '/drinks/15997');

      const imgRecipe1 = await screen.findByRole('img', { name: /gg/i });
      const nameRecipe1 = await screen.findByRole('heading', { name: /gg/i });

      expect(imgRecipe1).toBeInTheDocument();
      expect(nameRecipe1).toBeInTheDocument();
    });
  },
);

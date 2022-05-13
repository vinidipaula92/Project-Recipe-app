import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import fetchMock from '../../cypress/mocks/fetch';
import App from '../App';
import { doneRecipes } from '../services/consts';
import customRender from './__RenderWithRouterAndRedux';

describe(
  'Testa a Tela de  /done-recipes',
  () => {
    beforeEach(() => {
      global.fetch = jest.fn((url) => fetchMock(url));

      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
    it('Testa a Tela de /done-recipes', async () => {
      customRender(<App />, '/done-recipes');

      const foodBtn = await screen.findByRole('button', { name: /food/i });
      const drinksBtn = await screen.findByRole('button', { name: /drinks/i });
      const allBtn = await screen.findByRole('button', { name: /all/i });

      const aquamarine = await screen.findByRole('heading', { name: /aquamarine/i });
      const aquamarineImg = await screen.findByRole('img', { name: /aquamarine/i });
      const burek = await screen.findByRole('heading', { name: /burek/i });
      const burekImg = await screen.findByRole('img', { name: /burek/i });

      expect(foodBtn).toBeInTheDocument();
      expect(drinksBtn).toBeInTheDocument();
      expect(allBtn).toBeInTheDocument();
      expect(aquamarine).toBeInTheDocument();
      expect(aquamarineImg).toBeInTheDocument();
      expect(burek).toBeInTheDocument();
      expect(burekImg).toBeInTheDocument();

      userEvent.click(foodBtn);
      userEvent.click(allBtn);
      userEvent.click(drinksBtn);
    });
  },
);

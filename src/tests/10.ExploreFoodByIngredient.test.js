import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
        '/explore/foods/ingredients');
      const chicken = await screen.findByRole('button', { name: /chicken/i });
      const salmon = await screen.findByRole('button', { name: /salmon/i });
      const beef = await screen.findByRole('button', { name: /beef/i });

      expect(chicken).toBeInTheDocument();
      expect(salmon).toBeInTheDocument();
      expect(beef).toBeInTheDocument();
      userEvent.click(chicken);
    });
  },
);

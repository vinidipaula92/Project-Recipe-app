import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import React from 'react';
import fetchMock from '../../cypress/mocks/fetch';
import App from '../App';
import customRender from './__RenderWithRouterAndRedux';

describe(
  'Testa a Tela de explorar: /explore;',
  () => {
    beforeEach(() => {
      global.fetch = jest.fn((url) => fetchMock(url));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
    it('Testa a Tela de explorar: /explore;', async () => {
      customRender(<App />,
        '/explore');
      const exploreFood = screen.getByRole('button', { name: /explore foods/i });
      const exploreDrink = screen.getByRole('button', { name: /explore drinks/i });

      expect(exploreFood).toBeInTheDocument();
      expect(exploreDrink).toBeInTheDocument();
    });
  },
);

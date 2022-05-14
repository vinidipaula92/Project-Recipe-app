import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import fetchMock from '../../cypress/mocks/fetch';
import App from '../App';
import customRender from './__RenderWithRouterAndRedux';

describe(
  'Testa a Tela de explorar comidas: /explore/drinks;',
  () => {
    beforeEach(() => {
      global.fetch = jest.fn((url) => fetchMock(url));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
    it('Testa a Tela de explorar bebidas: /explore/drinks;', async () => {
      customRender(<App />,
        '/explore/drinks/ingredients');
      const lightRum = await screen
        .findByRole('button', { name: /Light rum/i });
      const applejack = await screen
        .findByRole('button', { name: /Applejack/i });
      const gin = await screen
        .findByRole('button', { name: /Gin/i });

      expect(lightRum).toBeInTheDocument();
      expect(applejack).toBeInTheDocument();
      expect(gin).toBeInTheDocument();
      userEvent.click(lightRum);
    });
  },
);

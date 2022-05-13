import { screen } from '@testing-library/react';
import React from 'react';
import fetchMock from '../../cypress/mocks/fetch';
import App from '../App';
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
    it('Testa a Tela de explorar comidas:  /not found', async () => {
      customRender(<App />,
        '/explore/drinks/nationalities');
      const notFound = await screen.getByRole('heading', { name: /not found/i });

      expect(notFound).toBeInTheDocument();
    });
  },
);

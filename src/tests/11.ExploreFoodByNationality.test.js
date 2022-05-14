import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import fetchMock from '../../cypress/mocks/fetch';
import App from '../App';
import customRender from './__RenderWithRouterAndRedux';

describe(
  'Testa a Tela de explorar comidas: /explore/foods/nationalities;',
  () => {
    beforeEach(() => {
      global.fetch = jest.fn((url) => fetchMock(url));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
    it('Testa a Tela de explorar comidas: /explore/foods/nationalities;', async () => {
      customRender(<App />,
        '/explore/foods/nationalities');
      const exploreByNationality = await screen
        .findByText(/explore nationalities/i);
      const recipeCard = await screen.findByTestId('0-card-img');
      const corba = await screen
        .findByText(/corba/i);

      expect(exploreByNationality).toBeInTheDocument();
      expect(recipeCard).toBeInTheDocument();
      expect(corba).toBeInTheDocument();

      const combobox = await screen.findByTestId('explore-by-nationality-dropdown');
      userEvent.selectOptions(combobox, 'Japanese');
      userEvent.type(combobox, 'Japanese');
      userEvent.type(combobox, 'All');
      userEvent.type(combobox, 'Indian');
      userEvent.click(recipeCard);
    });
  },
);

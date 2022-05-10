import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createStore } from 'redux';
import reducer from '../redux/reducers';

/* function customRender(
  ui,
  route = '/',
) {
  const store = createStore(reducer);
  const history = createMemoryHistory({ initialEntries: [route] });
  return {
    ...render(
      <Provider store={ store }>
        <Router history={ history }>{ui}</Router>
      </Provider>,
    ),
    store,
    history,
  };
} */

const customRender = (
  component, // componente a ser renderizado
  {
    // estado inicial para o nosso reducer
    initialState = {},

    // caso você passe uma store por parâmetro ela será utilizada
    // caso contrário vai chamar a função createStore e criar uma nova
    store = createStore(reducer, initialState),

    // rota inicial da nossa aplicação
    initialEntries = ['/foods'],

    // caso você passe um history por parâmetro ele será utilizado
    // caso contrário vai chamar a função createMemotryHistory e criar um novo
    history = createMemoryHistory({ initialEntries }),
  } = {},
) => ({ // arrow function que retorna um objeto

  // spread do retorno do render { getByTestId, getByRole, etc }
  ...render(
    <Router history={ history }>
      <Provider store={ store }>
        {component}
      </Provider>
    </Router>,
  ),

  // history usado acima
  history,

  // store usada acima
  store,
});

export default customRender;

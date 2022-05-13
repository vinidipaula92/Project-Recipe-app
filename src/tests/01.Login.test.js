import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Login from '../pages/Login';
import { buttonId, emailForTests, emailId, passwordId } from '../services/consts';
import renderWithRouter from './__RenderWithRouter';

describe('Test in login screen if', () => {
  it('there is an email and password field and a button', () => {
    renderWithRouter(<Login />);

    const emailField = screen.getByTestId(emailId);
    const passwordField = screen.getByTestId(passwordId);
    const enterButton = screen.getByTestId(buttonId);

    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(enterButton).toBeInTheDocument();
  });

  it('is Possible to type on email field', () => {
    renderWithRouter(<Login />);

    const emailField = screen.getByTestId(emailId);

    userEvent.type(emailField, emailForTests);

    expect(emailField.value).toBe(emailForTests);
  });

  it('is possible to type os password field', () => {
    renderWithRouter(<Login />);

    const passwordField = screen.getByTestId(passwordId);

    userEvent.type(passwordField, '1234567');

    expect(passwordField.value).toBe('1234567');
  });

  it('have the button disabled if email or password is not valid', () => {
    renderWithRouter(<Login />);

    const emailField = screen.getByTestId(emailId);
    const passwordField = screen.getByTestId(passwordId);
    const enterButton = screen.getByTestId(buttonId);

    userEvent.type(emailField, 'email@email');
    userEvent.type(passwordField, '1234567');

    expect(enterButton.disabled).toBe(true);

    emailField.value = '';
    passwordField.value = '';

    userEvent.type(emailField, emailForTests);
    userEvent.type(passwordField, '123456');

    expect(enterButton.disabled).toBe(true);

    emailField.value = '';
    passwordField.value = '';

    userEvent.type(emailField, emailForTests);
    userEvent.type(passwordField, '1234567');
    userEvent.click(enterButton);
    expect(enterButton.disabled).toBe(false);
  });

  // Não está funcionando a troca de rota clicando no botão por que faz a requisição e precisa das variaveis para fazer que não existem aqui, provavelmente vai precisar fazer um mock

  // it('redirect to /foods', () => {
  //   const { history } = renderWithRouter(<Login />);

  //   const emailField = screen.getByTestId(emailId);
  //   const passwordField = screen.getByTestId(passwordId);
  //   const enterButton = screen.getByTestId(buttonId);

  //   userEvent.type(emailField, emailForTests);
  //   userEvent.type(passwordField, '1234567');
  //   // userEvent.click(enterButton);

  //   // const { pathname } = history.entries[0];
  //   // expect(pathname).toBe('/foods');
  // });
});

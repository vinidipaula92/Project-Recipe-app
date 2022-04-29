import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './__RenderWithRouter';
import App from '../App';
import { emailId, passwordId, buttonId, emailForTests } from '../services/consts';

describe('Test in login screen if', () => {
  it('there is an email and password field and a button', () => {
    renderWithRouter(<App />);

    const emailField = screen.getByTestId(emailId);
    const passwordField = screen.getByTestId(passwordId);
    const enterButton = screen.getByTestId(buttonId);

    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(enterButton).toBeInTheDocument();
  });

  it('is Possible to type on email field', () => {
    renderWithRouter(<App />);

    const emailField = screen.getByTestId(emailId);

    userEvent.type(emailField, emailForTests);

    expect(emailField.value).toBe(emailForTests);
  });

  it('is possible to type os password field', () => {
    renderWithRouter(<App />);

    const passwordField = screen.getByTestId(passwordId);

    userEvent.type(passwordField, '1234567');

    expect(passwordField.value).toBe('1234567');
  });

  it('have the button disabled if email or password is not valid', () => {
    renderWithRouter(<App />);

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

    expect(enterButton.disabled).toBe(false);
  });

  // Não está funcionando a troca de rota clicando no botão por que faz a requisição e precisa das variaveis para fazer que não existem aqui, provavelmente vai precisar fazer um mock

  // it('redirect to /foods', () => {
  //   const { history } = renderWithRouter(<App />);

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

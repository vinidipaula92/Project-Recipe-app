import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../css/Login.css';

export default function Login() {
  const history = useHistory();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const EMAIL_REGEX = /\w+@\w+\.\S+/g;
  const numberSix = 6;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser({ ...user, [name]: value });
  };

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    history.push('/foods');
  };

  const emailTest = !EMAIL_REGEX.test(user.email);
  const passwordTest = user.password.length <= numberSix;

  return (
    <div className="login-page">
      <div className="login-page-body">
        <p className="login-page-title">Login</p>
        {/* <div className="login-page-form"> */}
        <form>
          <input
            className="email-input"
            type="text"
            name="email"
            value={ user.email }
            data-testid="email-input"
            onChange={ handleChange }
          />
          <input
            className="password-input"
            type="password"
            name="password"
            value={ user.password }
            data-testid="password-input"
            onChange={ handleChange }
          />
          <button
            data-testid="login-submit-btn"
            type="button"
            disabled={ emailTest || passwordTest }
            onClick={ handleClick }
            className="login-submit-btn"
          >
            Entrar
          </button>
        </form>
        {/* </div> */}
      </div>
    </div>
  );
}

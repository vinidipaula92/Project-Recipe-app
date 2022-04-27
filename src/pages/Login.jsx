import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const history = useHistory();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  // const [disabled, setDisabled] = useState(true);

  const handleDisable = () => {
    const validEmail = /\w+@\w+\.\S+/g;
    return !(user.password.length && validEmail.test(email));
  };

  // const handleChange = ({ target }) => {
  //   const { name, value } = target;
  //   setUser({ ...user, [name]: value });
  // };

  const handleClick = () => {
    localStorage.setItem(user, { email: value });
    history.push('/foods');
  };

  return (
    <div>
      <p>Login</p>
      <form>
        <input
          className="emailInput"
          type="text"
          name="email"
          value={ user.email }
          data-testid="email-input"
          onChange={ (e) => setUser(e.target.value) }
        />
        <input
          className="passwordInput"
          type="password"
          name="password"
          value={ user.password }
          data-testid="password-input"
          onChange={ (e) => setUser(e.target.value) }
        />
        <button
          data-testid="login-submit-btn"
          type="button"
          onClick={ handleClick }
          disabled={ handleDisable }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

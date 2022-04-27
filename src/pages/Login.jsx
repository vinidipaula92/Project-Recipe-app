import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const history = useHistory();
  const [user, setUser] = userState({
    email: '',
    password: '',
  });

  const [disabled, setDisabled] = userState(true);

  const enterButtonValidation = () => {
    const emailRegex = /\S +@\S+\.\S+/;
    const numberSix = 6;
    if (emailRegex.test(user.email) && (user.password.length > numberSix)) {
      setDisabled(false);
    } else { setDisabled(true); }
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser({ ...user, [name]: value });
    enterButtonValidation();
  };

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
          data-testid="email-input"
          onChange={ handleChange }
        />
        <input
          className="passwordInput"
          type="password"
          name="password"
          data-testid="password-input"
          onChange={ handleChange }
        />
        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={ disabled }
          onClick={ handleClick }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

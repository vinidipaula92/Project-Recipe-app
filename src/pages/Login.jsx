import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Login() {
  return (
    <div>
      <p>Login</p>
      <Link to="foods">
        Va para foods.
      </Link>
    </div>
  );
}

export default Login;

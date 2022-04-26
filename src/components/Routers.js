import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Food from '../pages/Food';
import Login from '../pages/Login';

function Routers() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Food } />
      <Route exact path="/" component={ Login } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default Routers;

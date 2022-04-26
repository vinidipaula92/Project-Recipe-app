import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Drinks from '../pages/Drinks';
import Explore from '../pages/Explore';
import ExploreDrinkByIngredient from '../pages/ExploreDrinkByIngredient';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreFood from '../pages/ExploreFood';
import ExploreFoodByIngredient from '../pages/ExploreFoodByIngredient';
import ExploreFoodByNationality from '../pages/ExploreFoodByNationality';
import Favorite from '../pages/Favorite';
import Food from '../pages/Food';
import HomeDrink from '../pages/HomeDrink';
import HomeFood from '../pages/HomeFood';
import Login from '../pages/Login';
import Profile from '../pages/Profile';

function Routers() {
  return (
    <Switch>
      <Route path="/homedrink" component={ HomeDrink } />
      <Route path="/homefood" component={ HomeFood } />
      <Route path="/explore" component={ Explore } />
      <Route path="/exploredrink" component={ ExploreDrinks } />
      <Route path="/explorefood" component={ ExploreFood } />
      <Route path="/profile" component={ Profile } />
      <Route path="/drinks" component={ Drinks } />
      <Route path="/exploredrinkbyingredient" component={ ExploreDrinkByIngredient } />
      <Route path="/explorefoodbyingredient" component={ ExploreFoodByIngredient } />
      <Route path="/explorefoodbynationality" component={ ExploreFoodByNationality } />
      <Route path="/favorite" component={ Favorite } />
      <Route path="/food" component={ Food } />
      <Route exact path="/foods" component={ Food } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default Routers;

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DetailsDrink from '../pages/DetailsDrink';
import DetailsFood from '../pages/DetailsFood';
import Drinks from '../pages/Drinks';
import Explore from '../pages/Explore';
import ExploreDrinkByIngredient from '../pages/ExploreDrinkByIngredient';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreFood from '../pages/ExploreFood';
import ExploreFoodByIngredient from '../pages/ExploreFoodByIngredient';
import ExploreFoodByNationality from '../pages/ExploreFoodByNationality';
import Favorite from '../pages/Favorite';
import Food from '../pages/Food';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import ProgressDrink from '../pages/ProgressDrink';
import ProgressFood from '../pages/ProgressFood';
import RecipeDone from '../pages/RecipeDone';

function Routers() {
  return (
    <Switch>
      <Route path="/explore/drinks/ingredients" component={ ExploreDrinkByIngredient } />
      <Route path="/explore/drinks/nationalities" component={ NotFound } />
      <Route path="/explore/foods/ingredients" component={ ExploreFoodByIngredient } />
      <Route path="/explore/foods/nationalities" component={ ExploreFoodByNationality } />
      <Route path="/foods/:id/in-progress" component={ ProgressFood } />
      <Route path="/drinks/:id/in-progress" component={ ProgressDrink } />
      <Route path="/explore/drinks" component={ ExploreDrinks } />
      <Route path="/explore/foods" component={ ExploreFood } />
      <Route path="/favorite-recipes" component={ Favorite } />
      <Route path="/foods/:id" component={ DetailsFood } />
      <Route path="/drinks/:id" component={ DetailsDrink } />
      <Route path="/done-recipes" component={ RecipeDone } />
      <Route path="/explore" component={ Explore } />
      <Route path="/profile" component={ Profile } />
      <Route path="/drinks" component={ Drinks } />
      <Route exact path="/foods" component={ Food } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default Routers;

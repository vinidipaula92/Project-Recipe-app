import {
  ADD_CATEGORIE_FILTER,
  DRINK_RECIPE_DISPATCH,
  RECIPE_DISPATCH, SAVE_DATA_DRINK,
  SAVE_DATA_FOOD } from '../../services/consts';

const INITIAL_STATE = {
  dataFood: {},
  dataDrink: {},
  categorieFilter: '',
};

const dataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_DATA_FOOD:
    return { ...state,
      dataFood: action.data,
    };
  case SAVE_DATA_DRINK:
    return { ...state,
      dataDrink: action.data,
    };
  case ADD_CATEGORIE_FILTER:
    return {
      ...state,
      categorieFilter: action.data,
    };
  case RECIPE_DISPATCH:
    return {
      ...state,
      recipe: action.recipe,
    };
  case DRINK_RECIPE_DISPATCH:
    return {
      ...state,
      drinkRecipe: action.drinkRecipe,
    };
  default:
    return state;
  }
};

export default dataReducer;

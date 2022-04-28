import { SAVE_DATA_DRINK,
  SAVE_DATA_FOOD, ADD_CATEGORIE_FILTER } from '../../services/consts';

export const saveDataFood = (data) => ({
  type: SAVE_DATA_FOOD,
  data,
});

export const saveDataDrink = (data) => ({
  type: SAVE_DATA_DRINK,
  data,
});

export const addCategorieFilter = (data) => ({
  type: ADD_CATEGORIE_FILTER,
  data,
});

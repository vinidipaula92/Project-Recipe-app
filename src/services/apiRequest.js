import { NUMBER_ONE } from './consts';

export async function request(URL) {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

export async function resquestByMeal(searchMethod, searchValue) {
  let URL = '';
  if (searchMethod === 'name') {
    URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
  }
  if (searchMethod === 'ingredient') {
    URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchValue}`;
  }
  if (searchMethod === 'firstLetter') {
    const alert = 'Your search must have only 1 (one) character';
    if (searchValue.length > NUMBER_ONE) {
      global.alert(alert);
    } else {
      URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchValue}`;
    }
  }
  const data = await request(URL);
  return data;
}

export async function resquestByDrink(searchMethod, searchValue) {
  let URL = '';
  if (searchMethod === 'name') {
    URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`;
  }
  if (searchMethod === 'ingredient') {
    URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchValue}`;
  }
  if (searchMethod === 'firstLetter') {
    const alert = 'Your search must have only 1 (one) character';
    if (searchValue.length > NUMBER_ONE) {
      global.alert(alert);
    } else {
      URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchValue}`;
    }
  }
  const data = await request(URL);
  return data;
}

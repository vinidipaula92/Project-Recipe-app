export function handleCHangeFavoriteDrink(recipe, favorite) {
  const savedItems = localStorage.getItem('favoriteRecipes');
  const savedItemsArray = JSON.parse(savedItems);
  if (favorite) {
    if (savedItems === null) {
      const favRecipe = {
        id: recipe.idDrink,
        type: 'drink',
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
      };

      const arrayToSave = [favRecipe];

      const itemsToSave = JSON.stringify(arrayToSave);
      localStorage.setItem('favoriteRecipes', itemsToSave);
    } else {
      const favRecipeItems = {
        id: recipe.idDrink,
        type: 'drink',
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
      };
      savedItemsArray.push(favRecipeItems);
      const itemsToSave = JSON.stringify(savedItemsArray);
      localStorage.setItem('favoriteRecipes', itemsToSave);
    }
  } else {
    const removingItem = savedItemsArray
      .filter((element) => element.id === recipe.idDrinks);
    console.log(removingItem);
    const savingRemovedItem = JSON.stringify(removingItem);
    localStorage.setItem('favoriteRecipes', savingRemovedItem);
  }
}

export const handleChangeFavoriteMeals = (recipe, favorite) => {
  const savedItems = localStorage.getItem('favoriteRecipes');
  const savedItemsArray = JSON.parse(savedItems);

  if (favorite) {
    if (savedItems === null) {
      const favRecipe = {
        id: recipe.idMeal,
        type: 'food',
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: recipe.alcoholicOrNot,
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      };

      const arrayToSave = [favRecipe];

      const itemsToSave = JSON.stringify(arrayToSave);
      localStorage.setItem('favoriteRecipes', itemsToSave);
    } else {
      const favRecipeItems = {
        id: recipe.idMeal,
        type: 'food',
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: recipe.alcoholicOrNot,
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      };
      savedItemsArray.push(favRecipeItems);
      const itemsToSave = JSON.stringify(savedItemsArray);
      localStorage.setItem('favoriteRecipes', itemsToSave);
    }
  } else {
    const removingItem = savedItemsArray
      .filter((element) => element.id === recipe.idMeals);
    console.log(removingItem);
    const savingRemovedItem = JSON.stringify(removingItem);
    localStorage.setItem('favoriteRecipes', savingRemovedItem);
  }
};

export const checkFavoriteMeals = (recipe) => {
  const savedItems = localStorage.getItem('favoriteRecipes');
  const savedItemsArray = JSON.parse(savedItems);

  return savedItemsArray.some((element) => element.id === recipe.idMeal);
};

export const checkFavoriteDrinks = (recipe) => {
  const savedItems = localStorage.getItem('favoriteRecipes');
  const savedItemsArray = JSON.parse(savedItems);

  return savedItemsArray.some((element) => element.id === recipe.idDrink);
};

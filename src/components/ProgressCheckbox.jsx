/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

export default function ProgressCheckbox(props) {
  const [isChecked, setIsChecked] = useState([]);
  const { ingredient, measure, index, recipe } = props;

  useEffect(() => {
    const localRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const checks = localRecipe.meals[`${recipe.idMeal}checks`];
    setIsChecked(
      checks,
    );
    console.log('aqui');
  }, []);

  return (
    <p>
      <label
        key={ `${index}` }
        htmlFor={ index }
        data-testid={ `${index}-ingredient-step` }
      >
        <input
          type="checkbox"
          id={ index }
          value={ `${ingredient} ${measure[index]}` }
          checked={ isChecked[index] }
          onChange={ (event) => handleChange(event) }
          name={ index }
        />
        {`${recipe[ingredient]} - ${recipe[measure[index]]}`}
      </label>
    </p>
  );
}

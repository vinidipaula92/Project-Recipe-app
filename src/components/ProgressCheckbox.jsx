/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
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
  }, []);

  const handleChange = ({ target: { checked, name } }) => {
    const sla = [...isChecked];
    sla[name] = checked;
    setIsChecked([
      ...sla,
    ]);
    console.log(isChecked);
    // const localRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    // localRecipe.meals[`${recipe.idMeal}checks`] = [
    //   ...isChecked,
    //   isChecked[name] = !checked,
    // ];
    // localStorage.setItem('inProgressRecipes', JSON.stringify(localRecipe));
  };

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

ProgressCheckbox.propTypes = {
  ingredient: PropTypes.string.isRequired,
  measure: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  recipe: PropTypes.objectOf.isRequired,
};

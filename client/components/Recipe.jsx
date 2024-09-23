import React from 'react';

const Recipe = ({ recipe }) => {
  const { recipe_name, recipe_description, ingredients } = recipe;

  //Can a DELETE request be made by a button? Or maybe just a post with a Method of Delete?

  return (
    <div>
      <div>
        {recipe_name}: {recipe_description}
      </div>
      <div>Ingredients List: {ingredients.join(', ')}</div>
      <form>
        <button type='button'>DELETE</button>
      </form>
    </div>
  );
};

export default Recipe;

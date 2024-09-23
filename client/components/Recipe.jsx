import React from 'react';

const Recipe = ({ recipe }) => {
  const { recipe_name, recipe_description, ingredients } = recipe;

  //Can a DELETE request be made by a button? Or maybe just a post with a Method of Delete?

  //What data does DELETE req need to function?
  const deleteRecipe = (recipe) => {
    const url = 'server/api/deleteItem'
    // fetch(url, {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(recipe)
    // })
  }

  return (
    <div>
      <div>
        {recipe_name}: {recipe_description}
      </div>
      <div>Ingredients List: {ingredients.join(', ')}</div>
      <form>
        <button type='button' onClick={deleteRecipe(recipe_name)}>DELETE</button>
      </form>
    </div>
  );
};

export default Recipe;

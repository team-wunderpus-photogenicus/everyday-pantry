import React from 'react';

const Recipe = ({ recipe }) => {
  const { recipe_name, recipe_description, ingredients } = recipe;

  //Can a DELETE request be made by a button? Or maybe just a post with a Method of Delete?

  //What data does DELETE req need to function?
  const deleteRecipe = () => {
    // const url = 'server/api/deleteItem'
    console.log("Trying to send Deletion with ", {recipe_name})
    fetch( 'recipes', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({recipeName: recipe_name})
    })
  }

  return (
    <div>
      <div>
        {recipe_name}: {recipe_description}
      </div>
      <div>Ingredients List: {ingredients.join(', ')}</div>
      <form>
        <button type='submit' onClick={deleteRecipe}>DELETE</button>
      </form>
    </div>
  );
};

export default Recipe;

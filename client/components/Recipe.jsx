import React from 'react';

const Recipe = ({ recipe }) => {
  const { recipe_name, recipe_description, ingredients } = recipe;

  const deleteRecipe = () => {
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
        <p className='recipeName'>{recipe_name}</p>
      </div>
      <div>{recipe_description}</div>
      <div>Ingredients List: {ingredients.join(', ')}</div>
      <form>
        <button type='submit' onClick={deleteRecipe}>DELETE</button>
      </form>
    </div>
  );
};

export default Recipe;

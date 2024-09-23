import React, { useEffect, useState } from 'react';
//TODO: Ingredients.split()

const RecipeCreator = () => {
  const [newRecipeState, setNewRecipe] = useState({
    recipeName: '',
    recipeDescription: '',
    ingredients: [],
  });

  const updateName = (e) => {
    e.preventDefault();
    setNewRecipe(Object.create(newRecipeState, { recipeName: e.target.value }));
  };

  const updateDescription = (e) => {
    e.preventDefault();
    setNewRecipe(
      Object.create(newRecipeState, { recipeDescription: e.target.value })
    );
  };

  const updateIngredients = (e) => {
    e.preventDefault();
    setNewRecipe(
      Object.create(newRecipeState, { ingredients: e.target.value })
    );
  };

  const createRecipe = () => {
    const url = 'server/api/createRecipe';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRecipeState),
    });
    setNewRecipe({
      recipeName: '',
      recipeDescription: '',
      ingredients: [],
    });
  };

  return (
    <div>
      <form action='/api/newRecipe' method='post'>
        <input
          type='text'
          onChange={updateName()}
          value={newRecipeState.recipeName}
        >
          Recipe_Name
        </input>
        <input
          type='text'
          onChange={updateDescription()}
          value={newRecipeState.recipeDescription}
        >
          Recipe_Description
        </input>
        <input
          type='text'
          onChange={updateIngredients()}
          value={newRecipeState.ingredients}
        >
          Ingredients
        </input>
        <input type='submit'>
          SUBMIT RECIPE
        </input>
      </form>
    </div>
  );
};

export default RecipeCreator;

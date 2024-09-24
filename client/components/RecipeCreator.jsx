import React, { useEffect, useState } from 'react';
//TODO: Ingredients.split()

const RecipeCreator = () => {
  const [newRecipeState, setNewRecipe] = useState({
    recipeName: '',
    recipeDescription: '',
    ingredients: [],
  });

  const updateName = (e) => {
    // e.preventDefault();
    setNewRecipe(
      Object.assign({ ...newRecipeState }, { recipeName: e.target.value })
    );
    console.log('Name updated ' + newRecipeState);
  };

  const updateDescription = (e) => {
    // e.preventDefault();
    setNewRecipe(
      Object.assign(
        { ...newRecipeState },
        { recipeDescription: e.target.value }
      )
    );
    console.log('Description updated', newRecipeState);
  };

  const updateIngredients = (e) => {
    // e.preventDefault();
    setNewRecipe(
      Object.assign({ ...newRecipeState }, { ingredients: e.target.value })
    );
    console.log('Ingredients updated', newRecipeState);
  };

  const createRecipe = (e) => {
    const ingredientsArr = newRecipeState.ingredients.split(', ') //GUIDE: This designates the specific syntax that user needs to input ingredients in: "Banana, Wheat, Sugar, Potatoes, etc"
    let passedObj = Object.assign({...newRecipeState}, {ingredients: ingredientsArr})
    console.log('fixed ingredients data format! ', passedObj)
    fetch('recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passedObj),
    });
    setNewRecipe({
      recipeName: '',
      recipeDescription: '',
      ingredients: [],
    });
  };

  return (
    <div>
      <form>
        <input
          type='text'
          onChange={(e) => updateName(e)}
          value={newRecipeState.recipeName}
          placeholder='enter recipe name'
        />
        <input
          type='text'
          onChange={(e) => updateDescription(e)}
          value={newRecipeState.recipeDescription}
          placeholder='enter recipe description'
        ></input>
        <input
          type='text'
          onChange={(e) => updateIngredients(e)}
          value={newRecipeState.ingredients}
          placeholder='Ingredient: add "," between each'
        ></input>
        <input type='submit' onClick={createRecipe}></input>
      </form>
    </div>
  );
};

export default RecipeCreator;

import React, { useEffect, useState } from 'react';
import Recipe from './Recipe.jsx';

const RecipeList = () => {
  const [recipeState, setRecipeState] = useState([
    {
      recipe_name: 'Chicken Dish',
      recipe_description: 'Not raw!',
      ingredients: ['chicken', 'fire'],
    },
    {
      recipe_name: 'Fish Dish',
      recipe_description: 'Maybe raw!',
      ingredients: ['chicken', 'rice'],
    },
    {
      recipe_name: 'Fish Dish2',
      recipe_description: 'Maybe raw!',
      ingredients: ['chicken', 'rice'],
    },
    {
      recipe_name: 'Fish Dish23',
      recipe_description: 'Maybe raw!',
      ingredients: ['chicken', 'rice'],
    }
  ]);

  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       const response = await fetch('/api/recipes'); // GET REQUEST
  //       const data = await response.json();
  //       console.log("Found some recipes for the RecipeList State:", data)
  //       setRecipeState(data);
  //     } catch (error) {
  //       console.log('Prob in RecipeList', error);
  //     }
  //   }
  //   getData()
  // }, []);
// //Is there a way to set up useEffect's dependency as the Database? Or should we just assume calls to DB (delete, add) will trigger rerender?

  console.log('Recipes?', recipeState);
  if (!recipeState) {
    console.log('Nothing Here!', recipeState)
    return <div>You have no recipes!</div>;
  }

  const recipes = recipeState.map((recipeEl, i) => {
    console.log('Ding Dong!', recipeEl);
    return <Recipe key={i} recipe={recipeEl} />;
  });

  // console.log('Elem though?', recipeElems);
  return <div>{recipes}</div>;
};

export default RecipeList;

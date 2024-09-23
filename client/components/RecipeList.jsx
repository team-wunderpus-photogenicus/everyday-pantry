import React, { useEffect, useState } from 'react';
import Recipe from './Recipe.jsx';

const RecipeList = () => {
  const [recipeState, setRecipeState] = useState([]);

  
  //NOTE: This will not update unless you refresh the page
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch('recipes');
        const data = await response.json();
        console.log('Found some recipes for the RecipeList State:', data);
        setRecipeState([...data]);
      } catch (error) {
        console.log('Prob in RecipeList', error);
      }
    }
    getData();
  }, []);
  
  console.log('Recipes?', recipeState);
  if (!recipeState[0]) {
    //TODO: Is this working?
    console.log('Nothing Here!', recipeState);
    return <div>You have no recipes!</div>;
  }

  const recipes = recipeState.map((recipeEl, i) => {
    // console.log('Ding Dong!', recipeEl);
    return <Recipe key={i} recipe={recipeEl} />;
  });

  // console.log('Elem though?', recipeElems);
  return <div>{recipes}</div>;
};

export default RecipeList;

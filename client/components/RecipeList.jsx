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
        setRecipeState([...data]);
      } catch (error) {
        console.log('Prob in RecipeList', error);
      }
    }
    getData();
  }, []);
  
  if (!recipeState[0]) {
    return <div>You have no recipes!</div>;
  }

  const recipes = recipeState.map((recipeEl, i) => {
    return <Recipe key={i} recipe={recipeEl} />;
  });

  return <div className='list'>{recipes}</div>;
};

export default RecipeList;

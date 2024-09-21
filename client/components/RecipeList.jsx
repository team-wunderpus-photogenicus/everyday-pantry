import React, { useEffect, useState } from 'react';
import Recipe from './Recipe.jsx';

const RecipeList = () => {
  const [recipeList, setRecipes] = useState([{recipe_name: "Chicken", recipe_description:"Not raw!", ingredients: ["chicken", "fire"]}]);

    // useEffect(() => {
    //   async function getData() {
    //     try {
    //       const response = await fetch('/api/recipes'); // GET REQUEST
    //       const data = await response.json();
    //       console.log("Found some recipes for the RecipeList State:", data)
    //       setRecipes(data);
    //     } catch (error) {
    //       console.log('Prob in RecipeList', error);
    //     }
    //   }
    //   getData()
    // }, []);

  console.log("Recipes?", recipeList)
  if (recipeList) return <div>You have no recipes: {recipeList}</div>;

    const recipeElems = recipeList.map((recipes, i) => {
        console.log("Ding Dong!", recipes)
      return <Recipe key={i} recipe={recipes} />
    })
  return <div>{recipeElems}</div>;
};

export default RecipeList;

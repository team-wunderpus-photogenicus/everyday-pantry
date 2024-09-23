import React, { useEffect, useState } from 'react';
import RecipeList from './components/RecipeList.jsx';
// import IngredientList from './components/IngredientList.jsx';
import RecipeCreator from './components/RecipeCreator.jsx'

const App = () => {
  // const [recipes, setRecipes] = useState([]);

  // useEffect(() => {
  //   const fetchRecipes = async () => {
  //     try {
  //       const response = await fetch('localhost:3000/recipes');
  //       const data = await response.json();
  //       setRecipes(data);
  //     } catch (error) {
  //       console.error('failed to fetch recipes:', error);
  //     }
  //   };
  //   fetchRecipes();
  // }, []); // execute when Mount to update

  return (
    <div>
      <h1>Hello, App Component Here!</h1>
      <RecipeCreator />
      <RecipeList />
      {/* <IngredientList recipes = {recipes}/> */}
    </div>
  );
};

export default App;

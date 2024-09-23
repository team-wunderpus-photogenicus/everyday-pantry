import React, { useEffect, useState } from 'react';
import RecipeList from './components/RecipeList.jsx';
import IngredientList from './components/IngredientList.jsx';
import RecipeCreator from './components/RecipeCreator.jsx'
import './styles.scss';

const App = () => {
  //hook to update recipes state that are obtained from backend.
  const [recipes, setRecipes] = useState([]);

  //hook to condition the fetch Recipes request everytime when the page mount.
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/recipes', {
          mode: 'no-cors'
        });
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('failed to fetch recipes:', error);
      }
    };
    fetchRecipes();
  }, []); // execute when mount to update

  return (
    <div>
      <h1 className='app-title'>Hello, App Component Here!</h1>
      <RecipeCreator />
      <RecipeList />
      {/* passing recipes as a props */}
      <IngredientList recipes={recipes} />
    </div>
  );
};

export default App;

import React, { useEffect, useState } from 'react';
//import RecipeList from './components/RecipeList.jsx';
import IngredientList from './components/IngredientList.jsx';
// import RecipeCreator from './components/RecipeCreator.jsx'
import './styles/styles.css';

const App = () => {
  //hook to update recipes state that are obtained from backend.
  const [recipes, setRecipes] = useState([]);

  //hook to condition the fetch Recipes request everytime when the page mount.
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('localhost:3000/recipes');
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('failed to fetch recipes:', error);
      }
    };
    fetchRecipes();
  }, []); // execute when mount to update

  return (
    <div>
      <h1 className='app-title'>Hello, App Component Here!</h1>
      {/* <RecipeCreator /> */}
      {/* <RecipeList /> */}
      {/* passing recipes as a props */}
      <IngredientList recipes={recipes} />
      <RecipeList />
      {/* <IngredientList recipes = {recipes}/> */}
    </div>
  );
};

export default App;

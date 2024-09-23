import React, { useEffect, useState } from 'react';
import RecipeList from './components/RecipeList.jsx';
import IngredientList from './components/IngredientList.jsx';
import RecipeCreator from './components/RecipeCreator.jsx'
import './styles.scss';

const App = () => {
  //hook to update recipes state that are obtained from backend.
  const [recipes, setRecipes] = useState([]);

  console.log('ArbitraryComponent', arbitraryCounter)

  //hook to condition the fetch Recipes request everytime when the page mount.
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('recipes', {
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
      <h1 className='app-title'>Every Day Pantry</h1>
      <RecipeCreator />
      <RecipeList  />
      {/* passing recipes as a props */}
      <IngredientList recipes={recipes} />
    </div>
  );
};

export default App;

import React from 'react';

// const [ingredients, setIngredients] = useState([]);

// // //function to add a new ingredient to the list
// const addIngredient = (ingredient) => {
//   ///update ingredients via state, add ingredient at the end of the array
//   setIngredients([...ingredients, ingredient])
// };

// //function to delete a ingredient from the list
// const deleteIngredient = (ingredient) => {
// //below line should be revised
//   setIngredients(ingredients.filter((ingredient) => ingredients !== ingredient));
// }

const RecipeCreator = () => {
  return (
    <div>
      <form action='/api/newRecipe' method='post'>
        <input type='text'>Recipe_Name</input>
        <input type='text'>Recipe_Description</input>
        <input type='text'>Ingredients</input>
        <input type='submit'>SUBMIT RECIPE</input>
      </form>
    </div>
  );
};

export default RecipeCreator;

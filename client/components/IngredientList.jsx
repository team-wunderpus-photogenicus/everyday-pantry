import React from 'react';
import { v4 as uuidv4 } from 'uuid';

/* recipes =  
[
    {
        "recipeName1": {
          "ingredients": ["ingredient1", "ingredient2"],
          "instructions": "some instructions"
        },
        "recipeName2": {
          "ingredients": ["ingredient1", "ingredient3"],
          "instructions": "some instructions"
        }
      }
    ]
*/
const IngredientList = ({ recipes }) => {
  console.log(recipes)
  //cache to count the frequency of one ingredient shows up in total recipes
  //cache sample = {'apple': 1, 'pear': 3, 'onion': 3}
  const cache = {};

  //for each recipe inside of the recipes,
  //loop over each recipe[recipeName] as element
  // element refers to { "ingredients": ["ingredient1", "ingredient2"],"instructions": "some instructions"}
  //if the ingredient has shown in cache, +1
  //if not, add it in the cache
  recipes.forEach((element) => {
    //['ingredient1, ingredient 2']
    element['ingredients'].forEach((ingredient) => {
      if (!cache[ingredient]) {
        cache[ingredient] = 1;
      } else {
        cache[ingredient] += 1;
      }
    });
  }); //cache = {"ingredient1": 10, "ingredient2": 20}

  //print out cache[key] by decensing order, only get 10
  //step1: sort the object cache[key]
  let sortable = [];
  for (let key in cache) {
    sortable.push([key, cache[key]]); //[['apple',5], ['onion',3], ['banana', 1]]
  }

  sortable.sort(function (a, b) {
    return b[1] - a[1];
  }); //[['ingredient1',100],['ingredient2',99]]

  const topIngredients = sortable.slice(0, 10); // top 10 items format [["apple", 4000], ["onion", 100], ["garlic", 28]]
  const topIngredientsList = topIngredients.map((element) => element[0]); //item -> get the first item in the element

  return (
    <div>
      <h2> Top 10 Ingredients </h2>
      <ul>
        {/* use .map to iterate both ingrdient and index, each element needs a unique key so that React can efficiently re-render.  */}
        {/* use index as key is not the best practice but will work. the best practice is to use uuid. */}
        {topIngredientsList.map((ingredient) => (
          //    key is a special attribute in React and must be placed inside the tag itself, not inside the content.
          <li key={uuidv4()}> {ingredient}</li>
        ))}
      </ul>
    </div>
  );
};

// {
//   /* rendering result
// <ul>
//   <li>apple</li>
//   <li>onion</li>
//   <li>garlic</li>
//   <li>tomato</li>
//   <li>basil</li>
// </ul> */
// }
export default IngredientList
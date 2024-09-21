// NEED TO IMPORT RECIPE SCHEMA

const db = require('');

function stringIngredients(arr) {
  return arr.every((el) => typeof el === 'string');
}

const RecipeController = {};

(recipeController.createRecipe = async (req, res, next) => {
  try {
    const recipeName = Object.keys(req.body[0]);
    const ingredients = req.body.ingredients;
    const instructions = req.body.instructions;
    // Checking for correct data types of request body
    //// recipeName and instructions must be strings
    //// ingredients must be an array containing only strings
    if (
      typeof recipeName !== string ||
      typeof instructions !== string ||
      !Array.isArray(ingredients) ||
      !stringIngredients(ingredients)
    ) {
      return next({
        log: `RecipeController.createRecipe create request failed due to incorrect request data type (recipeName: ${recipeName}, instructions: ${instructions}, recipeName: ${ingredients})`,
        status: 400,
        message: {
          err: 'Error occurred due to incorrect recipe submission format. Please retry recipe submission.',
        },
      });
    }
    await db.query(
      `INSERT INTO recipes (Recipe_Name, Recipe_Description) VALUES (${recipeName}, ${instructions})`
    );
    // query id of newly created recipe in order to use it to create junction table in RecipeController.createJunctionTable
    const recipeId = await db.query(
      `SELECT _id FROM Recipes WHERE Recipe_Name = ${recipeName} ORDER BY _id DESC LIMIT 1`
    );
    res.locals.recipeId = recipeId;
    return next();
  } catch (err) {
    return next(err);
  }
}),
  (RecipeController.createIngredients = async (req, res, next) => {
    try {
      const ingredientIds = [];
      const ingredients = res.body.ingredients;

      // I DON'T THINK THIS IS A REMOTELY OPTIMAL WAY TO DO THIS
      let querySubstr = '';

      function updateSubstr(arr) {
        arr.forEach((el) => {
          querySubstr = querySubstr.concat(`(${el}), `);
        });
      }

      querySubstr = updateSubstr(ingredients);

      const queryStr = `INSERT INTO ingredients (Ingredient_Name) ${querySubstr.substring(
        0,
        querySubstr.length - 2
      )};`;
      // THROUGH HERE

      await db.query(queryStr);

      // query ids of newly created ingredients and save them in array in order to use them
      // to create junction table in RecipeController.createJunctionTable
      for (const ingredient in ingredients) {
        await ingredientIds.push(
          db.query(
            `SELECT _id FROM Ingredients WHERE Ingredient_Name = ${ingredient} ORDER BY _id DESC LIMIT 1`
          )
        );
      }
      res.locals.ingredientIds = ingredientIds;
      return next();
    } catch (err) {
      return next(err);
    }
  });
RecipeController.createJunctionTable = async (req, res, next) => {
  try {
    const recipeId = res.locals.recipeId;
    const ingredientIds = res.locals.ingredientIds;

    // I DON'T THINK THIS IS A REMOTELY OPTIMAL WAY TO DO THIS
    let querySubstr = '';

    function updateSubstr(arr) {
      arr.forEach((el) => {
        querySubstr = querySubstr.concat(`(${recipeId}, ${el}), `);
      });
    }

    querySubstr = updateSubstr(ingredientIds);

    const queryStr = `INSERT INTO ingredients (Ingredient_NAME) ${querySubstr.substring(
      0,
      querySubstr.length - 2
    )};`;
    // THROUGH HERE
    await db.query(queryStr);
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = RecipeController;

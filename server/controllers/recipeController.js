const db = require('../models/everdayPantryModels');

// helper function to check if every element in in ingredients array is a string. used for data validation.
function stringIngredients(arr) {
  return arr.every((el) => typeof el === 'string');
}

const RecipeController = {};

RecipeController.getRecipes = async (req, res, next) => {
  console.log('Retrieving all recipes');
  try {
    res.locals.recipes = await db.query('SELECT * FROM recipes');
    console.log('recipes', res.locals.recipes.rows);

    for (let i = 0; i < res.locals.recipes.rows.length; i++) {
      await db
        .query(
          `SELECT i.ingredient_name FROM recipe_ingredients ri INNER JOIN ingredients i on ri.ingredient_id=i._id WHERE ri.recipe_id = '${res.locals.recipes.rows[i]._id}'`
        )
        .then((result) => {
          res.locals.recipes.rows[i].ingredients = Object.values(result.rows);
        });
    }

    await Promise.all(res.locals.recipes.rows);

    console.log('recipes plus ingredients', res.locals.recipes.rows);
    return next();
  } catch (e) {
    console.log(e);
    return next({ error: e });
  }
};

RecipeController.getIngredients = async (req, res, next) => {
  console.log('Retrieving ingredients');
  try {
    const result = await db.query(
      'SELECT COUNT(*) as count, ingredient_name as ingredient FROM ingredients GROUP BY ingredient_name'
    );
    res.locals.ingredients = result.rows;
    console.log(res.locals.ingredients);
    return next();
  } catch (e) {
    return next({ error: e });
  }
};

(RecipeController.createRecipe = async (req, res, next) => {
  try {
    const recipeName = req.body.recipeName;
    console.log(recipeName);
    res.locals.recipeName = recipeName;
    const ingredients = req.body.ingredients;
    console.log(ingredients);
    res.locals.recipeName = ingredients;
    const instructions = req.body.recipeDescription;
    console.log(instructions);
    res.locals.recipeName = instructions;
    // Checking for correct data types of request body
    //// recipeName and instructions must be strings
    //// ingredients must be an array containing only strings
    if (
      typeof recipeName !== 'string' ||
      typeof instructions !== 'string' ||
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
    console.log(
      `INSERT INTO recipes (recipe_name, recipe_description) VALUES ('${recipeName}', '${instructions}');`
    );

    const queryReturn = await db.query(
      `INSERT INTO recipes (recipe_name, recipe_description) VALUES ('${recipeName}', '${instructions}');`
    );
    // console.log('completed query')
    // console.log(queryReturn)
    // query id of newly created recipe in order to use it to create junction table in RecipeController.createJunctionTable
    const recipeId = await db.query(
      `SELECT _id FROM recipes WHERE recipe_name = '${recipeName}' ORDER BY _id DESC LIMIT 1`
    );
    res.locals.recipeId = recipeId.rows[0]._id;
    return next();
  } catch (err) {
    return next(err);
  }
}),
  (RecipeController.createIngredients = async (req, res, next) => {
    try {
      // console.log('got to create ingredients, recipe id = ', res.locals.recipeId)
      const ingredientIds = [];
      const ingredients = req.body.ingredients;

      // helper function to create string of ingredients in parenthesis  from array to use in "INSERT" query
      function createStr(arr) {
        let returnStr = '';
        for (let i = 0; i < arr.length; i++) {
          if (i === arr.length - 1) {
            returnStr = `${returnStr}('${arr[i]}')`;
          } else {
            returnStr = `${returnStr}('${arr[i]}'), `;
          }
        }
        return returnStr;
      }
      let queryStr = createStr(ingredients);
      await db.query(
        `INSERT INTO ingredients (ingredient_name) VALUES ${queryStr};`
      );

      // query ids of newly created ingredients and save them in array in order to use them
      // to create junction table in RecipeController.createJunctionTable
      for (const ingredient of ingredients) {
        const result = await db.query(
          `SELECT _id FROM ingredients WHERE ingredient_name = '${ingredient}' ORDER BY _id DESC LIMIT 1`
        );
        console.log(
          `ingredient: ${ingredient} ingredientId: ${result.rows[0]._id}`
        );
        ingredientIds.push(result.rows[0]._id);
      }
      console.log(ingredientIds);
      res.locals.ingredientIds = ingredientIds;
      return next();
    } catch (err) {
      return next(err);
    }
  });
RecipeController.createJunctionTable = async (req, res, next) => {
  try {
    console.log('got to create junction table');
    const recipeId = res.locals.recipeId;
    const ingredientIds = res.locals.ingredientIds;

    function createStr(arr) {
      let returnStr = '';
      for (let i = 0; i < arr.length; i++) {
        if (i === arr.length - 1) {
          returnStr = `${returnStr}(${recipeId}, ${arr[i]})`;
        } else {
          returnStr = `${returnStr}(${recipeId}, ${arr[i]}), `;
        }
      }
      return returnStr;
    }

    let queryStr = createStr(ingredientIds);

    await db.query(
      `INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES ${queryStr};`
    );
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = RecipeController;

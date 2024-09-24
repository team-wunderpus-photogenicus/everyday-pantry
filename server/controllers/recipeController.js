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
          const ingredientsArray = [];
          for (let i = 0; i < result.rows.length; i++) {
            ingredientsArray.push(Object.values(result.rows[i]))
          }
          res.locals.recipes.rows[i].ingredients = ingredientsArray;
        });
    }

    await Promise.all(res.locals.recipes.rows);

    // console.log('recipes plus ingredients', res.locals.recipes.rows);
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
    res.locals.recipeName = recipeName;
    const ingredients = req.body.ingredients;
    res.locals.ingredients = ingredients;
    const instructions = req.body.recipeDescription;
    res.locals.instructions = instructions;
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
    // inserting new row to recipes table based on input data
    //// THIS AND THE FOLLOWING QUERY COULD BE combined into one QUERY, ADDING "RETURNING" IN INSERT SCRIPT
    const queryReturn = await db.query(
      `INSERT INTO recipes (recipe_name, recipe_description) VALUES ('${recipeName}', '${instructions}');`
    );
    // query id of newly created recipe in order to use it to create junction table in RecipeController.createJunctionTable
    //// COULD BE REMOVED IF PRIOR QUERY RETURNS RECIPE _ID
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
      const ingredientIds = [];
      const ingredients = req.body.ingredients;

      // helper function to create string of ingredients in parenthesis from array to use in "INSERT" query, think this should just be replaced with ingredients.join(', ');
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
        ingredientIds.push(result.rows[0]._id);
      }
      res.locals.ingredientIds = ingredientIds;
      return next();
    } catch (err) {
      return next(err);
    }
  });
RecipeController.createJunctionTableRows = async (req, res, next) => {
  try {
    const recipeId = res.locals.recipeId;
    const ingredientIds = res.locals.ingredientIds;

    // helper function that accepts array of ingredientIds and outputs a string with each Id in parenthesis with the recipeId (recipeId, ingredientId). To be used in "INSERT" query.
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
RecipeController.deleteJunctionTableRows = async (req, res, next) => {
  try {
    let ingredientIds = '';
    const recipeName = req.body.recipeName;
    // querying recipeId based on recipeName in order to remove entries from junction table 
    const recipeIdQuery = await db.query(
      `SELECT _id FROM recipes WHERE recipe_name = '${recipeName}'`
    );
    const recipeId = recipeIdQuery.rows[0]._id;
    res.locals.recipeId = recipeId;
    const queryDeleteJunctionRows = await db.query(
      `DELETE FROM recipe_ingredients WHERE recipe_id = '${recipeId}' RETURNING ingredient_id`
    );
    const junctionArr = queryDeleteJunctionRows.rows;
    // should refactor as join method
    for (let i = 0; i < junctionArr.length; i++) {
      if (i === junctionArr.length - 1) {
        ingredientIds = `${ingredientIds}${junctionArr[i].ingredient_id}`;
      } else {
        ingredientIds = `${ingredientIds}${junctionArr[i].ingredient_id}, `;
      }
    }
    res.locals.ingredientIds = ingredientIds;
    return next();
  } catch (err) {
    console.log("Error deleting junction tables")
    next(err);
  }
};

RecipeController.deleteRecipe = async (req, res, next) => {
  try {
    console.log('DeletingRecipe')
    recipeId = res.locals.recipeId;
    await db.query(`DELETE FROM recipes WHERE _id = ${recipeId}`);
    return next();
  } catch (err) {
    next(err);
  }
};

RecipeController.deleteIngredients = async (req, res, next) => {
  try {
    console.log('Deleting Ingredients')
    const ingredientIds = res.locals.ingredientIds;
    await db.query(
      `DELETE FROM ingredients WHERE _id IN (${ingredientIds})`
    );
    return next();
  } catch (err) {
    next(err);
  }
};

module.exports = RecipeController;

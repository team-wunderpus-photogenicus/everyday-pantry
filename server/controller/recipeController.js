const db = require('../models/everdayPantryModels');

const RecipeController = {};

RecipeController.getRecipes = async (req, res, next) => {
  console.log('Retrieving all recipes');
  try {
    res.locals.recipes = await db.query('SELECT * FROM recipes');
    console.log('recipes', res.locals.recipes.rows);

    for (let i = 0; i < res.locals.recipes.rows.length; i++) {
      await db
        .query(
          `SELECT ri.recipe_id, i.ingredient_name FROM recipe_ingredients ri INNER JOIN ingredients i on ri.ingredient_id=i._id WHERE ri.recipe_id = '${res.locals.recipes.rows[i]._id}'`
        )
        .then(
          (result) => (res.locals.recipes.rows[i].ingredients = result.rows)
        );
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

module.exports = RecipeController;

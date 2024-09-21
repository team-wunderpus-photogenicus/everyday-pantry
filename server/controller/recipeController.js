const pg = require('pg');
const { Pool } = pg;

const pool = new Pool();

const RecipeController = {};

RecipeController.getRecipes = async (req, res, next) => {
  console.log('Retrieving all recipes');
  try {
    const client = await pool.connect();
    res.locals.recipes = await client.query('SELECT * FROM recipes'); // Join w/ingredients
  } catch (e) {
    return next({ error: e });
  }

  return next();
};

RecipeController.getIngredients = async (req, res, next) => {
  console.log('Retrieving ingredients');
  try {
    const client = await pool.connect();
    res.locals.recipes = await client.query('SELECT * FROM ingredients');
  } catch (e) {
    return next({ error: e });
  }
  return next();
};

module.exports = RecipeController;

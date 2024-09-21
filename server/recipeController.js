// NEED TO IMPORT RECIPE SCHEMA

const db = require('')


function stringIngredients(arr) {
  return arr.every(el => typeof el === 'string')
}

const RecipeController = {};

recipeController.createRecipe = async (req, res, next) => {
  try{
    const recipeName = Object.keys(req.body[0]);
    const ingredients = req.body.ingredients;
    const instructions = req.body.instructions;
    // Checking for correct data types of request body
      // recipeName and instructions must be strings
      // ingredients must be an array containing only strings
    if(typeof recipeName !== string || typeof instructions !== string || !Array.isArray(ingredients) || !stringIngredients(ingredients)){
      return next({
        log: `RecipeController.createRecipe create request failed due to incorrect request data type (recipeName: ${recipeName}, instructions: ${instructions}, recipeName: ${ingredients})`,
        status: 400,
        message:{
          err: 'Error occurred due to incorrect recipe submission format. Please retry recipe submission.'
        }
      })
    }
    await db.query(`INSERT INTO recipes (Recipe_Name, Recipe_Description) VALUES (${recipeName}, ${instructions})`);
    // HOW DO I GET THE RECIPE ID FROM RECIPE TABLE TO FEED TO INGREDIENTS? JUST A GET REQUEST?
    const recipeId = await db.query(`SELECT _id FROM recipes WHERE Recipe_Name = ${recipeName} ORDER BY _id DESC LIMIT 1`);
    res.locals.recipeId = recipeId;
    return next();
    }
    catch(err){
      return next(err);
  }
},
RecipeController.createIngredients = async (req,res,next) => {
  try {
    const ingredientIds = [];
    const ingredients = res.body.ingredients;
    
    const queryStr = `INSERT INTO ingredients (Ingredient_NAME) `


  }
  catch(err) {
    return next(err);
  }
}
RecipeController.createJunctionTable = async (req,res,next) => {
  try {

  }
  catch(err) {
    return next(err);
  }
}

module.exports = RecipeController;
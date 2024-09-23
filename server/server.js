const express = require('express');
const app = express();
const path = require('path');
const RecipeController = require('./controllers/recipeController');

app.use(express.json());

// app.use(express.static(path.resolve(__dirname, '/build')));

app.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.get('/recipes', RecipeController.getRecipes, (req, res) => {
  res.status(200);
  return res.send(res.locals.recipes.rows);
});

app.get('/ingredients', RecipeController.getIngredients, (req, res) => {
  res.status(200);
  return res.send(res.locals.ingredients);
});

// router for creating new
app.post(
  '/recipes',
  RecipeController.createRecipe,
  RecipeController.createIngredients,
  RecipeController.createJunctionTableRows,
  (req, res) => {
    return res.status(201).json(res.locals);
  }
);

app.delete('/recipes',RecipeController.deleteJunctionTableRows, RecipeController.deleteRecipe, RecipeController.deleteIngredients, (req, res) => {
  return res.sendStatus(200);
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error: something went wrong');
});

app.listen(3000, () => console.log('Listening on port 3000.'));

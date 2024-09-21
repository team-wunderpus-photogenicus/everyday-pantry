const express = require('express');
const app = express();
const path = require('path');
const RecipeController = require('./controller/recipeController');

// app.use(express.static(path.resolve(__dirname, '/build')));

app.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.get('/recipes', RecipeController.getRecipes, (req, res) => {
  return res.sendStatus(200);
});

app.get('/ingredients', RecipeController.getIngredients, (req, res) => {
  return res.sendStatus(200);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error: something went wrong');
});

app.listen(3000, () => console.log('Listening on port 3000.'));

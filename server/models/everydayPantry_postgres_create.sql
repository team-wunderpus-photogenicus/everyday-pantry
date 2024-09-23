-- drops exsiting tables because old tables had typos and to make sure the tables will always start with the info only in the file if you run the command 
-- psql -d <the PG URI with your password> -f server/models/everydayPantry_postgres_create.sql
-- creates and populates tables with info
DROP TABLE IF EXISTS recipe_ingredients;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS recipes;

CREATE TABLE recipes (
  _id serial PRIMARY KEY,
  recipe_name varchar NOT NULL,
  recipe_description varchar NOT NULL

);

CREATE TABLE ingredients (
  _id serial PRIMARY KEY,
  ingredient_name varchar NOT NULL
);



CREATE TABLE recipe_ingredients (
  recipe_id integer REFERENCES recipes(_id),
  ingredient_id integer REFERENCES ingredients(_id),
  PRIMARY KEY (recipe_id, ingredient_id)
);

INSERT INTO recipes (recipe_name, recipe_description) VALUES ('French Toast Casserole', 
'Preheat oven to 425 degrees. 
Butter a 13x9 inch baking pan and set aside. 
In a small sauce pan, melt butter over medium heat. 
Once butter has melted, stir in brown sugar until dissolved and mixture is smooth. 
Pour mixture into the bottom of a 9x13 pan and spread evenly. 
Add bread cubes to the pan, spreading over the top of the brown sugar/butter mixture. 
In a medium sized bowl, whisk together the eggs, milk, vanilla, and 1 tsp of cinnamon. 
Pour egg mixture over the top of bread cubes, insuring that all pieces of bread are saturated. 
Sprinkle with remaining 1 teaspoon of cinnamon and 1 tablespoon of brown sugar. 
Bake in preheated oven for 25-30 minutes until top is golden brown. 
Remove from oven and sprinkle with powdered sugar if desired. Enjoy!');

INSERT INTO ingredients (ingredient_name) VALUES ('french bread');
INSERT INTO ingredients (ingredient_name) VALUES ('butter');
INSERT INTO ingredients (ingredient_name) VALUES ('brown sugar');
INSERT INTO ingredients (ingredient_name) VALUES ('eggs');
INSERT INTO ingredients (ingredient_name) VALUES ('milk');
INSERT INTO ingredients (ingredient_name) VALUES ('vanilla extract');
INSERT INTO ingredients (ingredient_name) VALUES ('cinnamon');
INSERT INTO ingredients (ingredient_name) VALUES ('powdered sugar');

INSERT INTO recipe_ingredients VALUES (1, 1);
INSERT INTO recipe_ingredients VALUES (1, 2);
INSERT INTO recipe_ingredients VALUES (1, 3);
INSERT INTO recipe_ingredients VALUES (1, 4);
INSERT INTO recipe_ingredients VALUES (1, 5);
INSERT INTO recipe_ingredients VALUES (1, 6);
INSERT INTO recipe_ingredients VALUES (1, 7);
INSERT INTO recipe_ingredients VALUES (1, 8);
DROP TABLE IF EXISTS "Recipe_Ingredients";
DROP TABLE IF EXISTS "Ingredients";
DROP TABLE IF EXISTS "Recipes";

CREATE TABLE "Recipes" (
  "_id" serial PRIMARY KEY,
  "Recipe_Name" varchar NOT NULL,
  "Recipe_Description" varchar NOT NULL

);

CREATE TABLE "Ingredients" (
  "_id" serial PRIMARY KEY,
  "Ingredient_Name" varchar NOT NULL
);



CREATE TABLE "Recipe_Ingredients" (
  "Recipe_id" integer REFERENCES "Recipes"("_id"),
  "Ingredient_id" integer REFERENCES "Ingredients"("_id"),
  PRIMARY KEY ("Recipe_id", "Ingredient_id")
);

INSERT INTO "Recipes" ("Recipe_Name", "Recipe_Description") VALUES ('French Toast Casserole', 
'Preheat oven to 425 degrees. Butter a 13x9 inch baking pan and set aside. 
In a small sauce pan, melt butter over medium heat. 
Once butter has melted, stir in brown sugar until dissolved and mixture is smooth. 
Pour mixture into the bottom of a 9x13 pan and spread evenly. 
Add bread cubes to the pan, spreading over the top of the brown sugar/butter mixture. 
In a medium sized bowl, whisk together the eggs, milk, vanilla, and 1 tsp of cinnamon. 
Pour egg mixture over the top of bread cubes, insuring that all pieces of bread are saturated. 
Sprinkle with remaining 1 teaspoon of cinnamon and 1 tablespoon of brown sugar. 
Bake in preheated oven for 25-30 minutes until top is golden brown. 
Remove from oven and sprinkle with powdered sugar if desired. Enjoy!');

INSERT INTO "Ingredients" ("Ingredient_Name") VALUES ('french bread');
INSERT INTO "Ingredients" ("Ingredient_Name") VALUES ('butter');
INSERT INTO "Ingredients" ("Ingredient_Name") VALUES ('brown sugar');
INSERT INTO "Ingredients" ("Ingredient_Name") VALUES ('eggs');
INSERT INTO "Ingredients" ("Ingredient_Name") VALUES ('milk');
INSERT INTO "Ingredients" ("Ingredient_Name") VALUES ('vanilla extract');
INSERT INTO "Ingredients" ("Ingredient_Name") VALUES ('cinnamon');
INSERT INTO "Ingredients" ("Ingredient_Name") VALUES ('powdered sugar');

INSERT INTO "Recipe_Ingredients" VALUES (1, 1);
INSERT INTO "Recipe_Ingredients" VALUES (1, 2);
INSERT INTO "Recipe_Ingredients" VALUES (1, 3);
INSERT INTO "Recipe_Ingredients" VALUES (1, 4);
INSERT INTO "Recipe_Ingredients" VALUES (1, 5);
INSERT INTO "Recipe_Ingredients" VALUES (1, 6);
INSERT INTO "Recipe_Ingredients" VALUES (1, 7);
INSERT INTO "Recipe_Ingredients" VALUES (1, 8);
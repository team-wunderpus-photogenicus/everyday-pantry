

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
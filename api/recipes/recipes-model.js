const db = require("../../data/db-config");

const findRecipesByUser = async (username) => {
  return db("recipes_ingredients")
    .select(
      "recipe_id",
      "recipes.title",
      "users.username",
      "recipes.source",
      "recipes.pic_url",
      "recipes.category",
      db.raw("array_agg(ingredients.ingredient) as ingredients")
    )
    .join("recipes", "recipes_ingredients.recipe_id", "recipes.id")
    .join("ingredients", "recipes_ingredients.ingredient_id", "ingredients.id")
    .join("users", "recipes.user_id", "users.id")
    .groupBy([
      "recipe_id",
      "recipes.title",
      "recipes.user_id",
      "users.username",
      "recipes.source",
      "recipes.pic_url",
      "recipes.category",
    ])
    .where({ username });
};

const createRecipe = async (rest, ingredientsArr) => {
  return db("recipes").insert(rest);
};

module.exports = {
  findRecipesByUser,
  createRecipe,
};

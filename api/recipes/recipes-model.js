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
  //  Insert into recipes table
  const [recipeID] = await db("recipes").returning("id").insert(rest);

  //  Insert into ingredients table
  ingredientsArr.forEach(async (ing) => {
    const [ingredientID] = await db("ingredients")
      .returning("id")
      .insert({ ingredient: ing });

    //  Insert into recipes_ingredients table
    const recipesIngredientsInsert = await db("recipes_ingredients").insert({
      recipe_id: recipeID.id,
      ingredient_id: ingredientID.id,
    });
  });
};

const updateRecipe = async (id, rest, ingredientsArr) => {
  // Edits recipe record
  await db("recipes").update(rest).where({ id });

  // Returns ingredients to be updated
  const prevIngredients = await db("recipes_ingredients")
    .select([
      "recipes_ingredients.recipe_id",
      "ingredients.id",
      "ingredients.ingredient",
    ])
    .join("ingredients", "recipes_ingredients.ingredient_id", "ingredients.id")
    .where({ recipe_id: id });

  // Goes through previous ingredients and replaces them with new ingredients
  let x = -1;

  prevIngredients.forEach(async (obj) => {
    x++;
    await db("ingredients")
      .where({ id: obj.id })
      .update({ ingredient: ingredientsArr[x] });
  });
};

const deleteRecipe = async (id) => {
  return await db("recipes").where({ id }).del();
};

module.exports = {
  findRecipesByUser,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};

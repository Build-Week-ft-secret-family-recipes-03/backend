exports.seed = function (knex) {
  return knex("recipes").insert([
    {
      recipe_1: 1,
      recipe_name: "Meatballs",
      instructions: "take ground meat and add pasta sauce",
      ingredients: "ground beef and pasta sauce",
      category: "Meat lovers",
    },
  ]);
};

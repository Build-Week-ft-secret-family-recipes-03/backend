const db = require("../../data/db-config");

db("users")
  .select(["users.user_id", "users.username", "roles.role_name"])
  .from("users")
  .innerJoin("roles", "users.role_id", "roles.role_id");

const findRecipesByUser = (username) => {
  return db("recipes")
    .select([
      "recipes.title",
      "recipes.source",
      "recipes.pic_url",
      "recipes.category",
      "users.first_name",
      "users.last_name",
      "users.username",
    ])
    .from("recipes")
    .innerJoin("users", "recipes.user_id", "users.id")
    .where({ username });
};

function get(id) {
  let query = db("recipes");

  if (id) {
    return query.where("project_id", id).first();
  } else {
    return query;
  }
}

module.exports = {
  get,
  findRecipesByUser,
};

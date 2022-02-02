const db = require("../../data/db-config");

const findRecipesBy = () => {
  return db("recipes");
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
  findRecipesBy,
};

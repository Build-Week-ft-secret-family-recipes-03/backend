const db = require("../../data/db-config");

const findRecipesBy = () => {
  return db("recipes");
};

module.exports = {
  findRecipesBy,
};

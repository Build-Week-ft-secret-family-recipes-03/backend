const db = require("../../data/db-config");

module.exports = {
  get,
};

function get(id) {
  let query = db("recipes");

  if (id) {
    return query.where("project_id", id).first();
  } else {
    return query;
  }
}

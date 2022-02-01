const db = require("../../data/db-config");

const findAllUsers = () => {
  return db("users");
};

const findUserByID = (id) => {
  return db("users").where({ id });
};

const insertUser = async (credentials) => {
  const [resp] = await db("users").returning("id").insert(credentials);

  return findUserByID(resp.id);
};

const findBy = (filter) => {
  return db("users").where(filter);
};

module.exports = {
  findAllUsers,
  findUserByID,
  insertUser,
  findBy,
};

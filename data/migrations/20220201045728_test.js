const tokenBuilder = require("../../api/auth/auth-token-builder");

exports.up = (knex) =>
  knex.schema
    .createTable("recipes", (tbl) => {
      tbl.increments("recipe_id");
      tbl.string("recipe_name", 128).unique();
      tbl.string("instructions").notNullable();
      tbl.text("ingredients").notNullable();
      tbl.text("category");
    })
    .createTable("users", (users) => {
      users.increments("user_id");
      users.string("username", 128).unique().notNullable();
      users.string("first_name").notNullable();
      users.string("last_name").notNullable().unique();
      users.string("password", 255).notNullable();
    });

exports.down = (knex) => knex.schema.dropTableIfExists("users");

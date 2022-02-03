exports.up = (knex) => {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("first_name", 128).notNullable();
      tbl.string("last_name", 128);
      tbl.string("username").unique().notNullable();
      tbl.string("password").notNullable();
    })
    .createTable("recipes", (tbl) => {
      tbl.increments();
      tbl.string("title", 128).notNullable();
      tbl.string("source", 128);
      tbl.string("pic_url", 200);
      tbl.string("category", 128);
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users");
    })
    .createTable("instructions", (tbl) => {
      tbl.increments();
      tbl.integer("instruction_number").notNullable();
      tbl.text("instruction").notNullable();
    })
    .createTable("ingredients", (tbl) => {
      tbl.increments();
      tbl.string("ingredient").notNullable();
    })
    .createTable("recipes_instructions", (tbl) => {
      tbl
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("recipes");
      tbl
        .integer("instruction_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("instructions");

      tbl.primary(["recipe_id", "instruction_id"]);
    })
    .createTable("recipes_ingredients", (tbl) => {
      tbl
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("recipes");
      tbl
        .integer("ingredient_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("ingredients");

      tbl.primary(["recipe_id", "ingredient_id"]);
    });
};
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("recipes_ingredients")
    .dropTableIfExists("recipes_instructions")
    .dropTableIfExists("ingredients")
    .dropTableIfExists("instructions")
    .dropTableIfExists("recipes")
    .dropTableIfExists("users");
};

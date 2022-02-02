exports.up = (knex) =>
  knex.schema
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
      /*
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
        */
    })
    .createTable("instructions", (tbl) => {
      tbl.increments();
      tbl.integer("instruction_number").notNullable();
      tbl.text("instruction").notNullable();
      tbl
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("recipes");
      /*
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
        */
    })
    .createTable("ingredients", (tbl) => {
      tbl.increments();
      tbl.string("ingredient").notNullable();
    })
    .createTable("instructions_ingredients", (tbl) => {
      tbl
        .integer("instruction_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("instructions");
      /*
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
        */
      tbl
        .integer("ingredient_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("ingredients");
      /*
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
        */

      tbl.primary(["instruction_id", "ingredient_id"]);
    });

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("instructions_ingredients")
    .dropTableIfExists("ingredients")
    .dropTableIfExists("instructions")
    .dropTableIfExists("recipes")
    .dropTableIfExists("users");
};

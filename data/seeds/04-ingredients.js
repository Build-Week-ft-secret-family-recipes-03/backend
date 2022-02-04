/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  //knex.raw('TRUNCATE TABLE your_table_name CASCADE')
  return knex("ingredients")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("ingredients").insert([
        { ingredient: "bread" },
        { ingredient: "cheese" },
        { ingredient: "butter" },
        { ingredient: "tortilla" },
        { ingredient: "ramen" },
        { ingredient: "cheese" },
      ]);
    });
};

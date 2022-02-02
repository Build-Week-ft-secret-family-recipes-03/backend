/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("instructions_ingredients")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("instructions_ingredients").insert([
        { instruction_id: 2, ingredient_id: 1 },
        { instruction_id: 2, ingredient_id: 3 },
        { instruction_id: 3, ingredient_id: 2 },
        { instruction_id: 4, ingredient_id: 2 },
        { instruction_id: 4, ingredient_id: 4 },
        { instruction_id: 6, ingredient_id: 5 },
      ]);
    });
};

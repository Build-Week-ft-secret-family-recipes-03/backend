/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("recipes_instructions")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("recipes_instructions").insert([
        { recipe_id: 1, instruction_id: 1 },
        { recipe_id: 1, instruction_id: 2 },
        { recipe_id: 1, instruction_id: 3 },
        { recipe_id: 2, instruction_id: 4 },
        { recipe_id: 2, instruction_id: 5 },
        { recipe_id: 3, instruction_id: 6 },
        { recipe_id: 3, instruction_id: 7 },
      ]);
    });
};

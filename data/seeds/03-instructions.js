/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("instructions")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("instructions").insert([
        { instruction_number: 1, instruction: "heat pan", recipe_id: 1 },
        { instruction_number: 2, instruction: "butter bread", recipe_id: 1 },
        {
          instruction_number: 3,
          instruction: "add cheese & finish",
          recipe_id: 1,
        },
        {
          instruction_number: 1,
          instruction: "top tortilla with cheese",
          recipe_id: 2,
        },
        {
          instruction_number: 2,
          instruction: "microwave for 30 seconds",
          recipe_id: 2,
        },
        { instruction_number: 1, instruction: "boil ramen", recipe_id: 3 },
        { instruction_number: 2, instruction: "eat it", recipe_id: 3 },
      ]);
    });
};

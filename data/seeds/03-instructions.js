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
        { instruction_number: 1, instruction: "heat pan" },
        { instruction_number: 2, instruction: "butter bread" },
        {
          instruction_number: 3,
          instruction: "add cheese & finish",
        },
        {
          instruction_number: 1,
          instruction: "top tortilla with cheese",
        },
        {
          instruction_number: 2,
          instruction: "microwave for 30 seconds",
        },
        { instruction_number: 1, instruction: "boil ramen" },
        { instruction_number: 2, instruction: "eat it" },
      ]);
    });
};

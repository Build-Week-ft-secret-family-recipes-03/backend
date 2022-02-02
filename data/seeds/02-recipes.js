/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("recipes")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("recipes").insert([
        {
          title: "grilled cheese",
          source: "family recipe",
          pic_url: "",
          category: "snack",
          user_id: 1,
        },
        {
          title: "quesadilla",
          source: "online",
          pic_url: "",
          category: "lunch",
          user_id: 1,
        },
        {
          title: "ramen",
          source: "online",
          pic_url: "",
          category: "lunch",
          user_id: 2,
        },
      ]);
    });
};

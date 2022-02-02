exports.seed = function (knex) {
  return knex("projects").insert([
    {
      project_id: 1,
      project_name: "bar",
      project_description: null,
      project_completed: false,
    },
  ]);
};

exports.up = function(knex, Promise) {
  return knex.schema.createTable("tasks", table => {
    table.increments().primary();
    table
      .integer("project_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("projects")
      .onDelete("CASCADE");
    table
      .string("task_title")
      .notNullable()
      .defaultTo("");
    table
      .text("task_description")
      .notNullable()
      .defaultTo("");
    table
      .string("task_status")
      .notNullable()
      .defaultTo("");
    table.date("task_date");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("tasks");
};

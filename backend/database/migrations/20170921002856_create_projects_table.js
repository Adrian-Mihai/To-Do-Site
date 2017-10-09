exports.up = function(knex, Promise) {
  return knex.schema.createTable("projects", table => {
    table.increments().primary();
    table
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .string("project_title")
      .notNullable()
      .defaultTo("");
    table
      .text("project_description")
      .notNullable()
      .defaultTo("");
    table
      .string("project_status")
      .notNullable()
      .defaultTo("");
    table
      .integer("project_point")
      .notNullable()
      .defaultTo(0);
    table
      .string("project_user_vote")
      .notNullable()
      .defaultTo("");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("projects");
};

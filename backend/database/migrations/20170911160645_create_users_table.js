exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", table => {
    table.increments().primary();
    table
      .string("user_name")
      .notNullable()
      .defaultTo("");
    table
      .string("user_email")
      .notNullable()
      .defaultTo("");
    table
      .string("user_password")
      .notNullable()
      .defaultTo("");
    table
      .string("user_visibility")
      .notNullable()
      .defaultTo("");
    table
      .text("user_description")
      .notNullable()
      .defaultTo("");
    table
      .integer("user_point")
      .notNullable()
      .defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};

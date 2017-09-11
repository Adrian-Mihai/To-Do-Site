exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('user_name');
    table.string('user_email');
    table.string('user_password');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};

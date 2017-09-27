exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('user_name');
    table.string('user_email');
    table.string('user_password');
    table.string('user_visibility');
    table.text('user_description');
    table.integer('user_point');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};

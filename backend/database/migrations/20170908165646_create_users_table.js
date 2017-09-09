exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', table => {
    table.increments();
    table.string('userName');
    table.string('userUserName');
    table.string('userEmail');
    table.string('userPassword');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('todos');
};

exports.up = function(knex, Promise) {
  return knex.schema.createTable('todos', table => {
    table.increments();
    table.integer('userId');
    table.string('title');
    table.string('description');
    table.date('date');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('todos');
};

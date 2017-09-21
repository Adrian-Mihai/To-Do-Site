
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tasks', table =>{
      table.increments();
      table.integer('project_id');
      table.string('task_title');
      table.text('task_description');
      table.string('task_status');
      table.date('task_date');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tasks');
};

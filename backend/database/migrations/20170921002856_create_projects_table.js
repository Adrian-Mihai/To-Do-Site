
exports.up = function(knex, Promise) {
  return knex.schema.createTable('projects', table =>{
      table.increments();
      table.integer('user_id');
      table.string('project_title');
      table.text('project_description');
      table.string('project_status');
      table.integer('project_point');
      table.string('project_user_vote');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('projects');
};

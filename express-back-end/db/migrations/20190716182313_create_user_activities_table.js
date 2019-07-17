
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('user_activities', table => {
      table.increments('id');
      table.integer('activity_id');
      table.integer('user_agenda_id')
      table.date('date');
      table.boolean('is_complete');
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('user_activities')
  ])
};

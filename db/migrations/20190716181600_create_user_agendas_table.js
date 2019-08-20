
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('user_agendas', table => {
      table.increments('id');
      table.integer('user_id');
      table.date('start_date')
      table.date('end_date');
      table.integer('hours_per_day');
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('user_agendas')
  ])
};

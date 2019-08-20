
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('activities', table => {
      table.increments('id');
      table.integer('category_id');
      table.text('content')
      table.string('name');
      table.integer('duration');
      table.integer('before_activity_id');
      table.integer('after_activity_id');
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('activities')
  ])
};

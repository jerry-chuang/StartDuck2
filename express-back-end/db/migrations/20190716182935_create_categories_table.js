
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('categories', table => {
      table.increments('id');
      table.string('name');
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('categories')
  ])
};

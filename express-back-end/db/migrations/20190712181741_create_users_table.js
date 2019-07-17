
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('users', table => {
      table.increments('id');
      table.string('first_name');
      table.string('last_name')
      table.string('email');
      table.string('password');
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('users')
  ])
};

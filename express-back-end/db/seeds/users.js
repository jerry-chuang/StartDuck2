
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, first_name: 'bob', last_name: 'Dee', email: 'bob@Dee.com', password: '123'},
      ]);
    });
};

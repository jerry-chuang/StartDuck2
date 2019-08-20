
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_agendas').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_agendas').insert([
        {id: 1, 
         user_id: 1,
         start_date: '2019-07-25',
         end_date: '2019-07-25',
         hours_per_day: 3,
        },
      ]);
    });
};

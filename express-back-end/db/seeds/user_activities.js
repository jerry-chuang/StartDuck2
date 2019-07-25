
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_activities').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_activities').insert([
        {id: 1, 
         activity_id: 1,
         user_agenda_id: 1,
         date: '2019-07-25',
         is_complete: false,
        },
        {id: 2, 
          activity_id: 2,
          user_agenda_id: 1,
          date: '2019-07-25',
          is_complete: false,
         },
         {id: 3, 
          activity_id: 3,
          user_agenda_id: 1,
          date: '2019-07-25',
          is_complete: false,
         },
      ]);
    });
};


// activity = agenda.user_activities.create!({
//   activity: activity1,
//   date: DateTime.new(2019, 6, 22),
//   completeness: false,
// })

// activity = agenda.user_activities.create!({
//   activity: activity2,
//   date: DateTime.new(2019, 6, 22),
//   completeness: true,
// })

// activity = agenda.user_activities.create!({
//   activity: activity3,
//   date: DateTime.new(2019, 6, 22),
//   completeness: false,
// })

// activity = agenda.user_activities.create!({
//   activity: activity4,
//   date: DateTime.new(2019, 6, 22),
//   completeness: false,
// })

// activity = agenda.user_activities.create!({
//   activity: activity5,
//   date: DateTime.new(2019, 6, 22),
//   completeness: false,
// })

// activity = agenda.user_activities.create!({
//   activity: activity6,
//   date: DateTime.new(2019, 6, 22),
//   completeness: false,
// })
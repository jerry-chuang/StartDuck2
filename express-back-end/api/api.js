"use strict";
const Moment = require('moment');

const express = require('express');
const router  = express.Router();


module.exports = (knex) => {
 
//converting the categories controller from StartDuck
//categories#index
// router.get('/categories', (req, res) => {
//   knex
//     .select()
//     .table("categories")
//     .then(results => {
//         res.json({
//           categories: results,
//         });
//     });
// });

// //converting the user_activities_controller from StartDuck
// //user_activities#index
// router.get('/user_activities', (req, res) => {
//   const {email, date} = req.query
//   knex //find user by email
//   .select()
//   .table("users")
//   .where('email', email)
//   .then(results => {
//     const userID = results[0].id
//     knex //find most recent user_agenda
//       .select()
//       .table("user_agendas")
//       .where('user_id', userID)
//       .orderBy('id', 'DESC')
//       .limit('1')
//       .then(results => {
//         const {id, start_date, end_date} = results[0];
//         const agendaID = id;
//         let agendaDates = [];
//         let dt = new Date(start_date)
//         while (dt<= end_date){ // make array of dates that's part of the agenda
//           agendaDates.push(new Date(dt));
//           dt.setDate(dt.getDate() + 1);
//         } 
//         knex //find user_activities that's part of the agenda
//           .select('*', 'activities.name AS name', 'categories.name AS categories', 'user_activities.id AS user_activitiy_id')
//           .table("user_activities")
//           .where('user_agenda_id', agendaID)
//           .where('date', date)
//           .join('activities', 'user_activities.activity_id', 'activities.id')
//           .join('categories', 'activities.category_id', 'categories.id')
//           .orderBy('user_activities.id', 'DESC')
//           .then(results => {
          
//              const categories = Array.from (new Set (results.map(item =>item.categories))) // get unique list of categoreis
//               .map( category => {
//                 return {
//                   id: results.find(item => item.categories  === category).id,
//                   name: category
//                 }
//               }); 
        
//             res.json({
//               activities: results,
//               categories: categories,
//               agenda: agendaDates,
//             });        
//           });
//       });
//   });
  
// });

// //user_activities#show
// router.get('/user_activities/:id', (req, res) => {
//   const {user_activity_id} = req.query;
//   knex
//     .select()
//     .table('user_activities')
//     .where('user_activities.id', user_activity_id)
//     .join('activities','user_activities.activity_id', 'activities.id' )
//     .then(results =>{
//       res.json({
//         activity: results[0]
//       })
//     })
// });
// //user_activities#update
// //TODO: Implement validations so user_activities and activities can be 1 to 1
// //currently directly converting old logic
// router.patch('/user_activities/:id', (req, res) => {
//   const {email, is_complete} = req.body;
//   const {id} = req.params;
//   const activityID = id;
//   knex //find user by email
//   .select()
//   .table('users')
//   .where('email', email)
//     .then(results => {
//       const userID = results[0].id
//       knex //find most recent user_agenda
//       .select()
//       .table('user_agendas')
//       .where('user_id', userID)
//       .orderBy('id', 'DESC')
//       .limit('1')
//       .then(results => {
//         const {id} = results[0];
//         const agendaID = id;
//         knex('user_activities')
//         .where('user_agenda_id', agendaID)
//         .where('activity_id', activityID)
//         .update({'is_complete': is_complete})
//         .then(res.status(200).send())
//       })
//     })
// });


// //user_activities#destroy
// router.delete('/user_activities/:id', (req, res) => {
//   const {id} = req.params;
//   knex
//     .select()
//     .table("user_activities")
//     .where('id', id)
//     .del()
//     .then(res.status(200).send());
// });

//converting the user_agendas_controller
//user_agendas#create
// router.post('/user_agendas', (req, res) => {
//   const {email, categories, hours_per_day} = req.body;
//   let agendaDates = [];
//   let dt = new Date(req.body.start_date)
//   const start_date = new Date(req.body.start_date)
//   const end_date = new Date(req.body.end_date)
//   while (dt<= end_date){// make array of dates that's part of the agenda
//     agendaDates.push(new Date(dt));
//     dt.setDate(dt.getDate() + 1);
//   } 
//   knex //find user by email
//   .select()
//   .table('users')
//   .where('email', email)
//   .then(results => {
//     const userID = results[0].id
//     knex('user_agendas') //create new user agenda
//     .returning('id')
//     .insert({
//       user_id: userID,
//       start_date: Moment(start_date).utc().format('YYYY-MM-DD'),
//       end_date: Moment(end_date).utc().format('YYYY-MM-DD'),
//       hours_per_day: hours_per_day,
//     })
//     .then( results => {
//       const user_agenda_id = results[0]; 
//       knex('activities')
//       .select('*', 'activities.id AS activity_id')
//       .whereIn('category_id', categories)
//       .leftOuterJoin('user_activities', 'activities.id', 'user_activities.activity_id')
//       .then( results=>{
//         let old_activities = results.filter(activity => !activity.is_complete) // filter for activities that were not completed before
//         // need to filter for user_activities with identical activity_id since currently we're always creating new user_activities
//         const activities = [];
//         const map = new Map();
//         for (let item of old_activities) {
//           if(!map.has(item.activity_id)){
//               map.set(item.activity_id, true);    // set any value to Map
//               activities.push(item);
//           }
//         }
//         let recommended_activities = [];
//         let remove_index = [];
//         //looping through list of dates in agenda
//         for (let date of agendaDates){
//           let day_duration = hours_per_day * 60;
//           while (remove_index.length){
//             activities.splice(remove_index.pop(), 1)
//           }//remove activities that have been chosen already

//           //looping through list of available activities
//           for (let activity of activities){
//             if(activity.duration <= day_duration){
//               recommended_activities.push({
//                 activity_id: activity.activity_id,
//                 date: Moment(date).utc(),
//                 user_agenda_id: user_agenda_id,
//                 is_complete: false
//               })

//               remove_index.push(activities.indexOf(activity))
//               day_duration -= activity.duration
//             }
//             if(day_duration <= 0)
//               break
//           }
//         }
//         knex('user_activities')
//         .insert(recommended_activities)
//         .then(res.status(200).send())
//         .catch(error => console.log(error));           
//       })      
//     })  
//   })
// });

// //converting users controller
// //users#create
//  router.post("/users", (req, res) => {

//     knex('users')
//       .select('email')
//       .where('email', req.body.email)
//       .then(res.status(200).send())
//       .catch(
//         error => {
//           knex('users')
//           .insert({email: req.body.email})
//           .then(res.status(200).send())
//           .catch(
//             function(error) {
//               console.error(error);
//             }
//           )
//         }
        
//       )
//   });
// //users#show
// router.get('/users/:id', (req, res) => {
//   const {email} = req.query
//   knex //find user by email
//   .select()
//   .table('users')
//   .where('email', email)
//   .then(results => {
//     const userID = results[0].id
//     knex
//     .select()
//     .table('user_agendas')
//     .join('user_activities', 'user_agendas.id', 'user_activities.user_agenda_id')
//     .join('activities','user_activities.activity_id', 'activities.id' )
//     .where('user_agendas.user_id', userID)
//     .where('is_complete', true)
//     .then(results => {

//       const categories = Array.from (new Set (results.map(item =>item.categories))) // get unique list of categoreis
//             .map( category => {
//               return {
//                 id: results.find(item => item.categories  === category).id,
//                 name: category
//               }
//             });
      
//         res.json({
//           activities: results,
//           categories: categories
//         });
//     });
//   })
// });

// //converting admin/activities controller
// // admin/activities#index
// router.get('/admin/activities', (req, res) => {
//   knex
//       .select()
//       .table("activities")
//       .then(results => {
//           res.json({
//             activities: results,
//           });
//       });
// });
// // admin/activities#show
// router.get('/admin/activities/:id', (req, res) => {
//   knex('activities')
//       .select('*')
//       .where('id', req.params.id)
//       .then(results => {
//           res.json({
//             activity: results[0],
//           });
//       });
// });
// // admin/activities#destroy
// router.delete('/admin/activities/:id', (req, res) => {
//   const {id} = req.params;
//   knex
//     .select()
//     .table("activities")
//     .where('id', id)
//     .del()
//     .then(res.status(200).send());
// });
// // admin/activities#create
// router.post('/admin/activities', (req, res) => {
//   const {name, content, duration, category} = req.body;
//   knex('activities')
//     .insert({
//       category_id: category,
//       content: content,
//       name: name,
//       duration: duration,
//     })
//     .then(res.status(200).send())
//     .catch(error => console.log(error))
// });

// // admin/activities#update
// router.patch('/admin/activities/:id', (req, res) => {
//   const {name, content, duration, category} = req.body;
//   const {id} = req.params;
//   knex
//   .select()
//   .table('activities')
//   .where('id', id)
//   .update({
//     'name': name,
//     'content': content,
//     'duration': duration,
//     'category_id': category,
//   })
//   .then(res.status(200).send())
// });


//converting admin/categories controller
// admin/categories#index
router.get('/admin/categories', (req, res) => {
  knex
      .select()
      .table("categories")
      .then(results => {
          res.json({
            categories: results,
          });
      });
});
// admin/categories#destroy
router.delete('/admin/categories/:id', (req, res) => {
  const {id} = req.params;
  knex
    .select()
    .table("categories")
    .where('id', id)
    .del()
    .then(res.status(200).send());
});
// admin/categories#create
router.post("/admin/categories", (req, res) => {
   knex('categories')
     .insert({name: req.body.name})
     .then(res.status(200).send())
     .catch(
       function(error) {
         console.error(error);
       }
     );
});
  return router;
}

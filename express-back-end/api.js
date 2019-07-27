"use strict";

const express = require('express');
const router  = express.Router();


module.exports = (knex) => {
 
//converting the categories controller from StartDuck
//categories#index
router.get('/categories', (req, res) => {
  knex
      .select()
      .table("categories")
      .then(results => {
          res.json({
            categories: results,
          });
      });
});

//converting the user_activities_controller from StartDuck
//user_activities#index
router.get('/user_activities', (req, res) => {
  const {email, date} = req.query
  knex //find user by email
  .select()
  .table("users")
  .where('email', email)
  .then(results => {
    const userID = results[0].id
    knex //find most recent user_agenda
      .select()
      .table("user_agendas")
      .where('user_id', userID)
      .orderBy('id', 'DESC')
      .limit('1')
      .then(results => {
        const {id, start_date, end_date} = results[0];
        const agendaID = id;
        let agendaDates = [];
        let dt = new Date(start_date)
        while (dt<= end_date){ // make array of dates that's part of the agenda
          agendaDates.push(new Date(dt));
          dt.setDate(dt.getDate() + 1);
        } 
        knex //find user_activities that's part of the agenda
          .select('*', 'activities.name AS name', 'categories.name AS categories')
          .table("user_activities")
          .where('user_agenda_id', agendaID)
          .where('date', date)
          .join('activities', 'user_activities.activity_id', 'activities.id')
          .join('categories', 'activities.category_id', 'categories.id')
          .orderBy('user_activities.id', 'DESC')
          .then(results => {
             const categories = Array.from (new Set (results.map(item =>item.categories))) // get unique list of categoreis
              .map( category => {
                return {
                  id: results.find(item => item.categories  === category).id,
                  name: category
                }
              }); 
        
            res.json({
              activities: results,
              categories: categories,
              agenda: agendaDates,
            });        
          });
      });
  });
  
});

//user_activities#show
router.get('/user_activities/:id', (req, res) => {
  const {activityID} = req.query
  knex
    .select()
    .table('activities')
    .where('id', activityID)
    .then(results =>{
      res.json({
        activity: results[0]
      })
    })
});
//user_activities#update
router.put('/user_activities/:id', (req, res) => {
  knex
      .select()
      .table("user_activities")
      .then(results => {
        console.log(results)
          res.json({
            results: results,
          });
      });
});
//user_activities#destroy
router.delete('/user_activities/:id', (req, res) => {
  knex
      .select()
      .table("user_activities")
      .then(results => {
        console.log(results)
          res.json({
            results: results,
          });
      });
});

//converting the user_agendas_controller
//user_agendas#create
router.post('/user_agendas', (req, res) => {
  console.log(req)
  //  knex('user_agendas')
  //     .insert({username: req.body.username})
  //     .then(res.status(200).send())
  //     .catch(
  //       function(error) {
  //         console.error(error);
  //       }
  //     );
});

//converting users controller
//users#create
 router.post("/users", (req, res) => {
   console.log("req for users#create", req)
    knex('users')
      .insert({email: req.body.email})
      .then(res.status(200).send())
      .catch(
        function(error) {
          console.error(error);
        }
      );
  });
//users#show
router.get('/users/:id', (req, res) => {
  knex
      .select()
      .table("users")
      .then(results => {
        console.log(results)
          res.json({
            results: results,
          });
      });
});

//converting admin/activities controller
// admin/activities#index
router.get('/admin/activities', (req, res) => {
  knex
      .select()
      .table("activities")
      .then(results => {
          res.json({
            activities: results,
          });
      });
});
// admin/activities#show
router.get('/admin/activities/:id', (req, res) => {
  knex('activities')
      .select('*')
      .where('id', req.params.id)
      .then(results => {
          res.json({
            activity: results,
          });
      });
});
// admin/activities#destroy
router.delete('/admin/activities:id', (req, res) => res.json({
  message: "Seems to work!",
}));
// admin/activities#create
router.post('/admin/activities', (req, res) => res.json({
  message: "Seems to work!",
}));
// admin/activities#update
router.patch('/admin/activities/:id', (req, res) => res.json({
  message: "Seems to work!",
}));


//converting admin/categories controller
// admin/categories#index
router.get('/admin/categories', (req, res) => res.json({
  message: "Seems to work!",
}));
// admin/categories#destroy
router.delete('/admin/categories:id', (req, res) => res.json({
  message: "Seems to work!",
}));
// admin/categories#create
router.post("/admin/categories", (req, res) => {
  console.log("req for users#create", req)
   knex('categories')
     .insert({name: req.body.name})
     .then(res.status(200).send())
     .catch(
       function(error) {
         console.error(error);
       }
     );
});
  // // insert username to database when put request to /users/
  // router.post("/", (req, res) => {
  //   knex('users')
  //     .insert({username: req.body.username, games_played:0, games_won:0})
  //     .then(res.status(200).send())
  //     .catch(
  //       function(error) {
  //         console.error(error);
  //       }
  //     );
  // });

  // // on get requests to /users/:username  -> return all data in games table where player1 or player2 = username

  // router.get("/:username", (req, res) => {
  //   knex('games')
  //     .select('*')
  //     .where('player1', req.params.username)
  //     .orWhere('player2', req.params.username)
  //     .then((results) => {
  //       res.json(results);
  //     });
  //   });

  return router;
}
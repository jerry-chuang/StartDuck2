"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => { 
  //converting the user_activities_controller from StartDuck
  //user_activities#index
  router.get('/', (req, res) => {
    const {email, date} = req.query
    knex('users') //find user by email
    .select('*')
    .where('email', email)
    .then(results => {
      const userID = results[0].id
      knex('user_agendas') //find most recent user_agenda
      .select('*')
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
        knex('user_activities') //find user_activities that's part of the agenda
        .join('activities', 'user_activities.activity_id', 'activities.id')
        .join('categories', 'activities.category_id', 'categories.id')
        .select('*', 'activities.name AS name', 'categories.name AS categories', 'user_activities.id AS user_activitiy_id')
        .where('user_agenda_id', agendaID)
        .where('date', date)
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
  router.get('/:id', (req, res) => {
    const {user_activity_id} = req.query;
    knex('user_activities')
    .select('*')
    .where('user_activities.id', user_activity_id)
    .join('activities','user_activities.activity_id', 'activities.id' )
    .then(results =>{
      res.json({
        activity: results[0]
      })
    })
  });

  //user_activities#update
  //TODO: Implement validations so user_activities and activities can be 1 to 1
  router.patch('/:id', (req, res) => {

    const {is_complete} = req.body;
    const {id} = req.params;

    knex('user_activities')
    .where('id', id)
    .update({'is_complete': is_complete})
    .then(res.status(200).send())

  });

  //user_activities#destroy
  router.delete('/:id', (req, res) => {
    const {id} = req.params;
    knex('user_activities')
    .where('id', id)
    .del()
    .then(res.status(200).send());
  });

  return router;
}

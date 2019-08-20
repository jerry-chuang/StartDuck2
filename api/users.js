"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => { 
  //converting users controller
  //users#create
  router.post("/", (req, res) => {
    knex('users')
    .select('email')
    .where('email', req.body.email)
    .then(results =>{
      if (!results[0]){
        knex('users')
        .insert({email: req.body.email})
        .then(res.status(200).send())
        .catch(error => {
          console.error(error);
        })
      } else {
        res.status(200).send()
      }
    })
  });

  //users#show
  router.get('/:id', (req, res) => {
    const {email} = req.query
    knex //find user by email
    .select()
    .table('users')
    .where('email', email)
    .then(results => {
      const userID = results[0].id
      knex
      .select('*', 'activities.name AS name', 'categories.name AS categories', 'user_activities.id AS user_activitiy_id')
      .table('user_agendas')
      .join('user_activities', 'user_agendas.id', 'user_activities.user_agenda_id')
      .join('activities','user_activities.activity_id', 'activities.id' )
      .join('categories', 'activities.category_id', 'categories.id')
      .where('user_agendas.user_id', userID)
      .where('is_complete', true)
      .then(results => {
        const categories = 
          Array.from (new Set (results.map(item =>item.categories))) // get unique list of categories
          .map( category => {
            return {
              id: results.find(item => item.categories  === category).id,
              name: category
            } 
          });

          const activities = 
          Array.from (new Set (results.map(item =>item.activity_id))) // get unique list of activities
          .map( activity_id => {
            const found = results.find(item => item.activity_id  === activity_id);
            return {
              activity_id: activity_id,
              name: found.name,
              duration: found.duration,
              content: found.content,
              category_id: found.category_id,
              is_complete: found.is_complete,
            } 
          });
     
        
        res.json({
          activities: activities,
          categories: categories
        });
      });
    })
  });
  
  return router;
}

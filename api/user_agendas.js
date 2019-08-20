"use strict";

const express = require('express');
const router  = express.Router();
const Moment = require('moment');

module.exports = (knex) => { 
  router.post('/', (req, res) => {
    const {email, categories, hours_per_day} = req.body;
    let agendaDates = [];
    let dt = new Date(req.body.start_date)
    const start_date = new Date(req.body.start_date)
    const end_date = new Date(req.body.end_date)
    while (dt<= end_date){// make array of dates that's part of the agenda
      agendaDates.push(new Date(dt));
      dt.setDate(dt.getDate() + 1);
    } 
    knex('users') //find user by email
    .select('id')
    .where('email', email)
    .then(results => {
      const userID = results[0].id
      knex('user_agendas') //create new user agenda
      .returning('id')
      .insert({
        user_id: userID,
        start_date: Moment(start_date).utc().format('YYYY-MM-DD'),
        end_date: Moment(end_date).utc().format('YYYY-MM-DD'),
        hours_per_day: hours_per_day,
      })
      .then( results => {
        const user_agenda_id = results[0]; 
        knex('activities')
        .select('*', 'activities.id AS activity_id')
        .whereIn('category_id', categories)
        .leftOuterJoin('user_activities', 'activities.id', 'user_activities.activity_id')
        .then( results=>{
          let old_activities = results.filter(activity => !activity.is_complete) // filter for activities that were not completed before
          // Filter for user_activities with identical activity_id since currently we're always creating new user_activities
          const activities = [];
          const map = new Map();
          for (let item of old_activities) {
            if(!map.has(item.activity_id)){
                map.set(item.activity_id, true);
                activities.push(item);
            }
          }
          let recommended_activities = [];
          let remove_index = [];
          //looping through list of dates in agenda
          for (let date of agendaDates){
            let day_duration = hours_per_day * 60;
            while (remove_index.length){
              activities.splice(remove_index.pop(), 1)
            }//remove activities that have been chosen already

            //looping through list of available activities to make recommended_activities
            for (let activity of activities){
              if(activity.duration <= day_duration){
                recommended_activities.push({
                  activity_id: activity.activity_id,
                  date: Moment(date).utc(),
                  user_agenda_id: user_agenda_id,
                  is_complete: false
                })

                remove_index.push(activities.indexOf(activity))
                day_duration -= activity.duration
              }
              if(day_duration <= 0)
                break
            }
          }
          knex('user_activities') //insert all recommended_activities
          .insert(recommended_activities)
          .then(res.status(200).send())
          .catch(error => console.log(error));           
        })      
      })  
    })
  });
  
  return router;
}

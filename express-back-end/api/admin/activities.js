'use strict';

const express = require('express');
const router  = express.Router();

module.exports = (knex) => { 
  //converting admin/activities controller
  // admin/activities#index
  router.get('/', (req, res) => {
    knex
    .select()
    .table('activities')
    .then(results => {
      res.json({
        activities: results,
      });
    });
  });
  // admin/activities#show
  router.get('/:id', (req, res) => {
    knex('activities')
    .select('*')
    .where('id', req.params.id)
    .then(results => {
      res.json({
        activity: results[0],
      });
    });
  });
  // admin/activities#destroy
  router.delete('/:id', (req, res) => {
    const {id} = req.params;
    knex
    .select()
    .table('activities')
    .where('id', id)
    .del()
    .then(res.status(200).send());
  });
  // admin/activities#create
  router.post('/', (req, res) => {
    const {name, content, duration, category} = req.body;
    knex('activities')
    .insert({
      category_id: category,
      content: content,
      name: name,
      duration: duration,
    })
    .then(res.status(200).send())
    .catch(error => console.log(error))
  });
  // admin/activities#update
  router.patch('/:id', (req, res) => {
    const {name, content, duration, category} = req.body;
    const {id} = req.params;
    knex
    .select()
    .table('activities')
    .where('id', id)
    .update({
      'name': name,
      'content': content,
      'duration': duration,
      'category_id': category,
    })
    .then(res.status(200).send())
  });
  
  return router;
}



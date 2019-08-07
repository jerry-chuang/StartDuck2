'use strict';

const express = require('express');
const router  = express.Router();

module.exports = (knex) => { 
  //converting admin/categories controller from StartDuck
  // admin/categories#index
  router.get('/', (req, res) => {
    knex('categories')
    .select('*')
    .then(results => {
      res.json({
        categories: results,
      });
    });
  });
  // admin/categories#destroy
  router.delete('/:id', (req, res) => {
    const {id} = req.params;
    knex('categories')
    .where('id', id)
    .del()
    .then(res.status(200).send());
  });
  // admin/categories#create
  router.post('/', (req, res) => {
    knex('categories')
    .insert({name: req.body.name})
    .then(res.status(200).send())
    .catch(function(error) {
      console.error(error);
    });
  });
  
  return router;
}

"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => { 
  //converting admin/categories controller
  // admin/categories#index
  router.get('/admin/categories', (req, res) => {
    knex('categories')
    .select('*')
    .then(results => {
        res.json({
          categories: results,
        });
    });
  });
  // admin/categories#destroy
  router.delete('/admin/categories/:id', (req, res) => {
    const {id} = req.params;
    knex('categories')
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

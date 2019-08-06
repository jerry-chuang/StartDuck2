"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => { 
//converting the categories controller from StartDuck
//categories#index
  router.get('/', (req, res) => {
    knex('categories')
    .select('*')
    .then(results => {
      res.json({
        categories: results,
      });
    });
  });
    return router;
}

const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8080;
const ENV         = process.env.ENV || "development";
require('dotenv').config();
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(Express.static('public'));

// Sample GET route
App.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));
App.delete('/api/api/user_activities/:id', (req, res) => res.json({
  message: "Seems to work!",
}));
App.get('/api/users/:id', (req, res) => res.json({
  message: "Seems to work!",
}));
App.post('/api/user_agendas', (req, res) => res.json({
  message: "Seems to work!",
}));
App.get('/api/user_activities', (req, res) => res.json({
  message: "Seems to work!",
}));
App.get('/api/admin/categories', (req, res) => res.json({
  message: "Seems to work!",
}));
App.get('/api/admin/activities', (req, res) => res.json({
  message: "Seems to work!",
}));
App.get('/api/admin/activities/:id', (req, res) => res.json({
  message: "Seems to work!",
}));
App.patch('/api/admin/activities/:id', (req, res) => res.json({
  message: "Seems to work!",
}));
App.delete('/api/admin/activities', (req, res) => res.json({
  message: "Seems to work!",
}));

App.post('/api/admin/activities', (req, res) => res.json({
  message: "Seems to work!",
}));



App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});

const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8080;
const ENV = process.env.ENV || "development";
require('dotenv').config();
const knexConfig  = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json()) //included to allow axios to pass json objects
App.use(Express.static('public'));

const categoriesRoutes = require('./api/categories.js')
const userActivitiesRoutes = require('./api/user_activities.js')
const userAgendasRoutes = require('./api/user_agendas.js')
const usersRoutes = require('./api/users.js')
const adminActivitiesRoutes = require('./api/admin/activities.js')
const adminCategoriesRoutes = require('./api/admin/categories.js')

App.use('/api/categories', categoriesRoutes(knex))
App.use('/api/user_activities', userActivitiesRoutes(knex))
App.use('/api/user_agendas', userAgendasRoutes(knex))
App.use('/api/users', usersRoutes(knex))
App.use('/api/admin/activities', adminActivitiesRoutes(knex))
App.use('/api/admin/categories', adminCategoriesRoutes(knex))

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});

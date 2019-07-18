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

const apiRoutes = require("./api");

App.use("/users", apiRoutes(knex));

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});

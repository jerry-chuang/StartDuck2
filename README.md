# StartDuck2

Based on the LHL final project [StartDuck](https://github.com/JerChuang/StartDuck), StartDuck2 is a productivity app re-built with React Hooks, React Router, Ant Design UI Framework for front-end, Express.js for server, and PostgreSQL for database. 

## Final Product
#### Landing Page:
!["Screenshot of StartDuck Landing Page"](https://github.com/JerChuang/StartDuck/blob/master/docs/loginpage.png?raw=true)

#### Select Category Page:
!["Screenshot of StartDuck Select Category Page"](https://github.com/JerChuang/StartDuck/blob/master/docs/selectCategory.gif?raw=true)

#### Home Page:
!["Screenshot of StartDuck Home Page"](https://github.com/JerChuang/StartDuck/blob/master/docs/homePage.gif?raw=true)

#### Activity Page:
!["Screenshot of StartDuck Activity Page"](https://github.com/JerChuang/StartDuck/blob/master/docs/activityPage.gif?raw=true)

#### Admin Category Page:
!["Screenshot of StartDuck Admin Category Page"](https://github.com/JerChuang/StartDuck/blob/master/docs/admincategories.png?raw=true)

#### Admin Activities Page:
!["Screenshot of StartDuck Admin Activities Page"](https://github.com/JerChuang/StartDuck/blob/master/docs/adminActivity.gif?raw=true)

#### Admin Activity Page:
!["Screenshot of StartDuck Admin Activity Page"](https://github.com/JerChuang/StartDuck/blob/master/docs/adminEditPage.gif?raw=true)


## Setup
1. Open **TWO** terminals
2. In one terminal, run `bundle` to install the dependencies. 
3. Run `bin/rake db:setup` to create the databases (called rails_project_development by default). 
4. Run `bin/rails s` to run the server.
5. In the other terminal, `cd` into `client`. 
6. Run `npm install`.
7. Run `npm start` 
8. Visit `localhost:3000` in your browser.

## Dependencies
- Express
- PostgreSQL
- React
- Antd
- Axios
- React-router
- Universal-cookie

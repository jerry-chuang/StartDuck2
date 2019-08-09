import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import 'antd/dist/antd.css';
import Cookies from 'universal-cookie';

import Nav from './components/Nav.jsx';
import Login from './components/Login.jsx'
import Activities from "./components/activities/Activities.jsx";
import DatePicker from "./components/schedule/datePicker.jsx";
import TodayActivity from "./components/activity/TodayActivity.jsx";
import CompletedActivities from './components/completeActivities/CompletedActivities.jsx'
import CompletedActivityContent from './components/completeActivities/CompletedActivityContent.jsx'
import AdminCategories from "./components/admin/AdminCategories.jsx";
import AdminActivities from "./components/admin/AdminActivities.jsx";
import AdminActivity from "./components/admin/AdminActivity.jsx";

const cookies = new Cookies()

function App(){
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(cookies.get('email'))

  return (
    <Router>
      <Nav cookies={cookies} setUser={setUser}/>
      <main className="main-container">
        <Switch>
          <Route
          path="/admin/activities/:id"
          render={(props) => <AdminActivity {...props} params={props.match.params}/>}
          />
          <Route
          path="/admin/activities"
          render={(props) => <AdminActivities {...props}/>}
          />
          <Route
            path="/admin/categories"
            render={(props) => <AdminCategories {...props}/>}
          />
          <Route
            path="/:day/activities/:activityID"
            render={(props) => <TodayActivity {...props} cookies={cookies} params={props.match.params} />}
          />
          <Route
            path="/schedule"
            render={(props) => <DatePicker {...props} cookies={cookies} />}
          />
          <Route
            path="/:day/activities/"
            render={(props) => <Activities {...props} cookies={cookies} params={props.match.params} />}
          />
          <Route
          path="/completed_activities/:id"
          render={(props) => <CompletedActivityContent {...props} cookies={cookies} params={props.match.params} />}
          />
          <Route
            path="/completed_activities"
            render={(props) => <CompletedActivities {...props} cookies={cookies} />}
          />
          <Route
            path="/"
            render={(props) => <Login {...props} setUser={setUser} cookies={cookies} />}
          />
        </Switch>
      </main>
    </Router>
  );
}

export default App;

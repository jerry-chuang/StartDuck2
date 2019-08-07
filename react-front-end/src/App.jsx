import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'antd/dist/antd.css';
import Cookies from 'universal-cookie';

import Nav from './components/Nav.jsx';
import Login from './components/Login.jsx'
import DayActivities from "./components/activities/DayActivities.jsx";
import DatePicker from "./components/schedule/datePicker.jsx";
import TodayActivity from "./components/activity/TodayActivity.jsx";
import CompletedActivities from './components/completeActivities/CompletedActivities.jsx'
import CompletedActivityContent from './components/completeActivities/CompletedActivityContent.jsx'
import AdminCategories from "./components/admin/AdminCategories.jsx";
import AdminActivities from "./components/admin/AdminActivities.jsx";
import AdminActivity from "./components/admin/AdminActivity.jsx";

const cookies = new Cookies()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: cookies.get('email'),
    }
  }

  setUser = (email) => {
    this.setState({ email: email }, () => console.log('current state after setting user', this.state))
  }

  render() {

    return (
      <Router>
        <Nav cookies={cookies} setUser={this.setUser} setRedirect={this.setRedirect} />

        <main className="main-container">
          <Switch>

            <Route
            path="/admin/activities/:id"
            render={(props) => <AdminActivity {...props} activity={this.state.activity} params={props.match.params}/>}
            />

            <Route
            path="/admin/activities"
            render={(props) => <AdminActivities {...props} activities={this.state.activities} params={props.match.params}/>}
            />

            <Route
              path="/admin/categories"
              render={(props) => <AdminCategories {...props} categories={this.state.categories} params={props.match.params}/>}
            />

            <Route
              path="/:day/activities/:activityID"
              render={(props) => {
                return <TodayActivity {...props} cookies={cookies} activities={this.state.activities} params={props.match.params} />
              }
              } />
            <Route
              path="/schedule"
              render={(props) => <DatePicker {...props} cookies={cookies} state={this.state} />}
            />

            <Route
              path="/:day/activities/"
              render={(props) => <DayActivities {...props} cookies={cookies} params={props.match.params} />}
            />
              <Route
              path="/completed_activities/:id"
              render={(props) => {
                return <CompletedActivityContent {...props} cookies={cookies} activities={this.state.activities} params={props.match.params} />}
              }/>
              <Route
                path="/completed_activities"
                render={(props) => {
                return <CompletedActivities {...props} params={props.match.params} setUser={this.setUser} cookies={cookies} />}

                }/>

            <Route
              path="/"
              render={(props) => <Login {...props} setUser={this.setUser} cookies={cookies} />}
            />
          </Switch>
        </main>
      </Router>
    );

  }
}

export default App;

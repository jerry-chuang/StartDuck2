import React, { Component } from 'react';
import TodayActivityBox from './TodayActivityBox.jsx';
import TodayActivityCalendar from './TodayActivityCalendar.jsx';
import { Redirect } from "react-router-dom";
import { Icon } from 'antd';
import { Calendar } from 'antd';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import * as moment from 'moment';

class TodayActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      activities: [],
      activity: {},
      categories: [],
      email: this.props.cookies.get('email'),
      agenda: [],
      date: this.props.params.day,
    };
  }

  componentDidMount() {
    this.getActivities();
    this.fetchActivity();
  }

  componentDidUpdate (prevProps) {
    const activityID = this.props.params.activityID
    if (prevProps.params.activityID !== activityID) {
  this.fetchActivity(activityID);
    }
    if (this.state.redirect){
        this.setState({redirect:false})
    }
  }

  fetchActivity = () => {
    axios.get('/api/user_activities/:id', {
      params: {
        activityID: this.props.params.activityID
      }
    })
    .then((response) => {
      this.setState({
        activity: response.data.activity,
      });
    })
  }

  getActivities(){
    axios.get('/api/user_activities', {
      params:{
        email: this.state.email,
        date: this.props.params.day
      }
    })
    .then((response) => {
      console.log('response for api/user_activities', response)
      this.setState({
        activities: response.data.activities,
        user_activities_id: response.data.user_activities_id
      });
    })
    .catch((error) => {
      if (error) {
        console.log(error)
      }
    })
  }
// toggle calender
handleClick = () => {
this.setState({
    active: !this.state.active
});
}

onSelect = (value) => {
this.setState({
    date: value.format('YYYY-MM-DD'),
    redirect: true,
});
}

complete = (event) => {      
axios.patch(`/api/user_activities/${this.props.params.activityID}`, {
    email: this.state.email,
    is_complete: !this.state.activity.is_complete
}) 
    .then((response) => {         
        let activity = {...this.state.activity}
        activity.is_complete = !this.state.activity.is_complete
        if(activity.is_complete){
            this.setState({
                activity:activity,
                redirect:true,
            })
        }   else {
            this.setState({
                activity:activity,
            })
        }
        
        this.fetchActivity()
    })
}

onFullRender = (value) => {
const date = value.format('YYYY-MM-DD');
let style ={
  paddingLeft:"3px",
  opacity:0.5};

for (let assigned of this.state.agenda){
  if(date === assigned) {
    style = {
        background: "lightskyblue",
        border: "1px solid lightcyan",
        fontStyle: "italic",
        fontWeight: "bold",
        paddingLeft: "3px"};
    }
}
return <div className="ant-fullcalendar-value" style ={style}>{value.date()}</div>
}

  render() {
    if(this.state.redirect){
      return (
        <Redirect to={`/${this.state.date}/activities`}/>
      )
    }

    return (
      <section className="dayActivity">
        <div className="sideBarSchedule">
          <h3 className="dayHeading">{moment(this.props.params.day).format('dddd, MMMM Do YYYY')}
            <div className="todayActivityIcon">
              <Icon style={{ fontSize: '35px' }} type="calendar" onClick={this.handleClick} />
            </div>
          </h3>
          {this.state.active && <Calendar onSelect={this.onSelect} dateFullCellRender={this.onFullRender} fullscreen={false} className="sidebar_calendar" />}

          <div className="TodayActivityCalendar">
            <TodayActivityCalendar activities={this.state.activities} params={this.props.match.params}/>
          </div>
        </div>

        <div className="TodayTask">
          <div className="TodayActivityBox">
            <TodayActivityBox activity={this.state.activity} />
          </div>
          <div className="Completeness">
            <span>Status: {this.state.activity.is_complete ? "Complete":"Incomplete"}	</span>
          </div>
          <div className="TodayContent">
            <ReactMarkdown source={this.state.activity.content} />
          </div>

          <button className={this.state.activity.is_complete? 
                              "todayActivity_cancel":
                              "todayActivity_complete"}
                  onClick={this.complete}>
              {this.state.activity.is_complete ? "Wait! I'm not done yet!":"Complete Activity!"}
          </button>
        </div>
      </section>
    )
  }
}

export default TodayActivity;

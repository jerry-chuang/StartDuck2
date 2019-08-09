import React, { useState, useEffect, useRef } from 'react';
import TodayActivityBox from './TodayActivityBox.jsx';
import TodayActivityCalendar from './TodayActivityCalendar.jsx';
import { Redirect } from "react-router-dom";
import { Icon } from 'antd';
import { Calendar } from 'antd';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import * as moment from 'moment';

function  TodayActivity(props) {

  const {cookies, params, match} = props;
  const [active, setActive] = useState(false);
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState({});
  const [email, setEmail] = useState(cookies.get('email'));
  const [agenda, setAgenda] = useState([]);
  const [date, setDate] = useState(params.day);
  const [redirect, setRedirect] = useState(false);
 

  useEffect(()=>{
    getActivities();
    fetchActivity();
  }, [])

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  const prevID = usePrevious(params.activityID);
  useEffect(() => {
    if (prevID !== params.activityID){ // re-fetch data if params are different, triggering component refresh
      fetchActivity(params.activityID);
    }
  });

  useEffect(()=>{
    if(redirect){
      setRedirect(false)
    }
  }, [redirect])

  function fetchActivity() {
    axios.get('/api/user_activities/:id', {
      params: {
        user_activity_id: params.activityID
      }
    })
    .then((response) => {
      setActivity(response.data.activity);
    })
  }

  function getActivities(){
    axios.get('/api/user_activities', {
      params:{
        email: email,
        date: params.day
      }
    })
    .then((response) => {
      setActivities(response.data.activities);
    })
  }
// toggle calender
  function handleClick() {
    setActive(!active);
  }

  function onSelect (value) {
    setDate(value.format('YYYY-MM-DD'));
    setRedirect(true);
  }

  function complete (event) {    
    axios.patch(`/api/user_activities/${params.activityID}`, 
    {
      email: email,
      is_complete: !activity.is_complete
    }) 
    .then(() => {      
      let newActivity = {...activity}
      newActivity.is_complete = !newActivity.is_complete
      if(newActivity.is_complete){
        setActivity(newActivity);
        setRedirect(true);
      } else {
        setActivity(newActivity);
      }     
      fetchActivity()
    })
  }

  function onFullRender(value) {
    const date = value.format('YYYY-MM-DD');
    let style ="activities_calendarNotScheduled";

    for (let assigned of agenda){
      if(date === assigned) {
        style = "activities_calendarScheduled";
      }
    }
    return <div className={`ant-fullcalendar-value ${style}`}>{value.date()}</div>;
  }


  if(redirect){
    return <Redirect to={`/${date}/activities`}/>  
  }

  return (
    <section className="dayActivity">
      <div className="sideBarSchedule">
        <h3 className="dayHeading">{moment(params.day).format('dddd, MMMM Do YYYY')}
          <div className="todayActivityIcon">
            <Icon style={{ fontSize: '35px' }} type="calendar" onClick={handleClick} />
          </div>
        </h3>
        {active && <Calendar onSelect={onSelect} dateFullCellRender={onFullRender} fullscreen={false} className="sidebar_calendar" />}

        <div className="TodayActivityCalendar">
          <TodayActivityCalendar activities={activities} params={match.params}/>
        </div>
      </div>

      <div className="TodayTask">
        <div className="TodayActivityBox">
          <TodayActivityBox activity={activity} />
        </div>
        <div className="Completeness">
          <span>Status: {activity.is_complete ? "Complete":"Incomplete"}	</span>
        </div>
        <div className="TodayContent">
          <ReactMarkdown source={activity.content} />
        </div>

        <button className={activity.is_complete? "todayActivity_cancel":"todayActivity_complete"} onClick={complete}>
          {activity.is_complete ? "Wait! I'm not done yet!":"Complete Activity!"}
        </button>
      </div>
    </section>
  )
}

export default TodayActivity;

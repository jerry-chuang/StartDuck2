import React from 'react';
import TodaySchedule from './TodaySchedule.jsx';
import {Link} from "react-router-dom";
import * as moment from 'moment';

function TodayActivityCalendar(props) {
  const activities = props.activities.map(activity => {
    return (
      <Link key={activity.activity_id} to={`/${moment(activity.date).format('YYYY-MM-DD')}/activities/${activity.user_activitiy_id}`} >
        <TodaySchedule key = {activity.user_activitiy_id} {...activity} /> 
      </Link>
    )
  })

  return (
    <main className="todayActivityList">
      {activities}
    </main>
  );
}

export default TodayActivityCalendar;

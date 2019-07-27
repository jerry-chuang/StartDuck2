import React, {Component} from 'react';
import TodaySchedule from './TodaySchedule.jsx';
import {Link} from "react-router-dom";
import * as moment from 'moment';

class TodayActivityCalendar extends Component {
  render() {
    const activities = this.props.activities.map(activity => {
        return (
          <Link to={`/${moment(activity.date).format('YYYY-MM-DD')}/activities/${activity.activity_id}`} >
            <TodaySchedule key = {activity.id} {...activity} /> 
          </Link>
        )
      })

      return (
        <main className="todayActivityList">
          {activities}
        </main>
      );
    }
  }

export default TodayActivityCalendar;

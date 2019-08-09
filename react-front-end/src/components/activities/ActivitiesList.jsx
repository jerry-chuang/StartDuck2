import React from 'react';
import ActivityItem from './ActivityItem.jsx'
import {Link} from "react-router-dom";
import { Icon } from 'antd';
import axios from 'axios';
import * as moment from 'moment';

function ActivitiesList(props) {
  const {getActivities, showDelete} = props;

  const onDelete = (event) => {
    axios.delete(`/api/user_activities/${event.currentTarget.id}`, {})
    .then(()=> {
      getActivities();
    })
  }

  const activities = props.activities.map(activity => {
    return (
      <div className="activities_listBlock">
        <div className={showDelete?'activities_deleteButton_hidden':'activities_deleteButton'}>
          <Icon id={activity.user_activitiy_id} onClick = {onDelete} type="minus-circle" />
        </div>
        <Link to={`/${moment(activity.date).format('YYYY-MM-DD')}/activities/${activity.user_activitiy_id}`} >
          <ActivityItem key = {activity.user_activitiy_id} {...activity } />
        </Link>
      </div>
    )
  })

  return (
    <main className="activities_activitiesList">
      {activities}
    </main>
  )
}

export default ActivitiesList;

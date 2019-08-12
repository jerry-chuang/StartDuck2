import React from 'react';
import CompletedActivitiesItem from './CompletedActivitiesItem.jsx'
import {Link} from "react-router-dom";

function CompletedActivitiesList(props) {
  const activities = props.activities.map(activity => {
    return (
      <Link to={`/completed_activities/${activity.activity_id}`} >
        <CompletedActivitiesItem key = {activity.activity_id} {...activity } />
      </Link>
    )
  })

  return (
    <main className="dayActivities_activitiesList">
      {activities}
    </main>
  )
}

export default CompletedActivitiesList;

import React from 'react';

const TodaySchedule = (props) => {
    return (
        <div className="todayActivityItem">
          <span className="dayActivities_itemName">{props.name}</span>
          <input type="checkbox" disabled={true} checked={props.is_complete} />
        </div>
    )
}

export default TodaySchedule
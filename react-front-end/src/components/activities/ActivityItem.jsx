import React from 'react';

const ActivityItem = (props) => {
  const {duration, name, is_complete} = props;
  return (
    <div className="activities_activityItem">
      <span>{duration} m</span>
      <span>{name}</span>
      <input type="checkbox" disabled={true} checked={is_complete} />
    </div>
  );
}

export default ActivityItem;

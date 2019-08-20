import React from 'react';

const TodayActivityBox = (props) => {
  const {name, duration} = props.activity
  return (
    <div className="todayActivityBox">
      <h1 className="todayActivityTitle">{name}</h1>
      <h6 className="todayActivityDuration">{duration} m</h6>
    </div>
  )
}

export default TodayActivityBox;

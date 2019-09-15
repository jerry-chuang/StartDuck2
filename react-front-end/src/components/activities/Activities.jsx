import React, {useState, useEffect, useRef} from 'react';
import { Redirect} from "react-router-dom";
import { Calendar} from 'antd';
import ActivitiesList from './ActivitiesList.jsx';
import axios from 'axios';
import * as moment from 'moment';

function Activities (props) {
  const {cookies, params} = props;
  const initialState = {
    activities: [],
    categories: [],
    filterActivities: [],
    date: moment(),
    redirect: false,
    scheduleRedirect: false,
    agenda: [],
    showDelete: false
  };

  const [data, setData] =  useState(initialState);
  // const [activities, setActivities] = useState([]);
  // const [categories, setCategories] = useState([]);
  // const [filterActivities, setFilterActivities] = useState([]);
  const [date, setDate] = useState(moment());
  const [redirect, setRedirect] = useState(false);
  const [scheduleRedirect, setScheduleRedirect] = useState(false);
  // const [agenda, setAgenda] = useState([]);
  const [showDelete, setShowDelete] = useState(false);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  const prevParams = usePrevious(params);
  useEffect(() => {
    if (prevParams !== params){ // re-fetch data if params are different, triggering component refresh
      getActivities();
    }
  });

  useEffect(() =>{ //reset redirects
    if (redirect){
      setRedirect(false)
    }
    if (scheduleRedirect){
      setScheduleRedirect(false)
    }
  }, [redirect, scheduleRedirect]);

  const mounted = useRef(); //simulate componentDidUpdate for checking first time user with no agendas
  useEffect(() =>{ 
    if (!mounted.current) {
      mounted.current = true;
    } else if(!data.agenda.length){    
      setScheduleRedirect(true)
    }
  },[data.agenda])

  function getActivities(){
    axios.get('/api/user_activities', {
      params:{
        email: cookies.get('email'),
        date: params.day
      }
    })
    .then((response) => {
      const {activities, categories, agenda} = response.data;
      setData({
        ...data,
        filterActivities: activities,
        activities,
        categories,
        agenda  
      })
      // setActivities(response.data.activities);
      // setFilterActivities(response.data.activities)
      // setCategories(response.data.categories);
      // setAgenda(response.data.agenda);
    })
  }

  function onSelect(value) {
    setDate(value);
    setRedirect(true);
  }

  function onFullRender(value) {
    const date = value.format('YYYY-MM-DD');
    let style ="activities_calendarNotScheduled";

    for (let assigned of data.agenda){
      if(date === moment(assigned).format('YYYY-MM-DD')) {
        style = "activities_calendarScheduled";
      }
    }
    return <div className={`ant-fullcalendar-value ${style}`}>{value.date()}</div>;
  }

  function filterCategory(event) {
    setData({
      ...data,
      filterActivities: data.activities.filter(
        activity => {
          return activity.category_id === Number(event.currentTarget.id)
        })
    })
    // setFilterActivities(
    //   data.activities.filter(
    //     activity => {
    //       return activity.category_id === Number(event.currentTarget.id)
    //     })
    // )
  }

  function allCategories() {
    setData({
      ...data,
      filterActivities: data.activities
    })
    // setFilterActivities(data.activities)
  }

  function toggle() {
    setShowDelete(!showDelete)
  }

  if(redirect){ //redirect to selected days on calendar
    return (
        <Redirect to={`/${date.format('YYYY-MM-DD')}/activities`}/>
    )
  }

  if(scheduleRedirect){ //redirect to schedule page if no agenda
    return (
        <Redirect to={`/schedule`}/>
    )
  }

  const categories_button = data.categories.map(category => {
    return <button id={category.id} className="activities_categoriesButtons" onClick={filterCategory}>{category.name}</button>
  })

  if(data.activities.length){
    return (
      <section className="activities">
        <div className="activities_left">
          <h3>{date.format('dddd, MMMM Do YYYY')}</h3>
          <div  className="activities_calendar" >
            <Calendar value={moment(params.day)} onSelect={onSelect} dateFullCellRender={onFullRender} fullscreen={false}/>
          </div>
        </div>

        <div className="activities_right">
          <h2>Activities</h2>
          <div className="activities_categories">
            {categories_button}
            <button className="activities_categoriesButtons" onClick={allCategories}>All</button>
            <button className = "activities_edit" onClick={toggle}>Edit</button>
          </div>
          <ActivitiesList cookies={cookies} getActivities={getActivities} showDelete = {showDelete} activities = {data.filterActivities}/>
        </div>
      </section>
    )
  } else {
    return (
      <section className="activities">
        <div className="activities_left">
          <h3>{date.format('dddd, MMMM Do YYYY')}</h3>
          <div className="activities_calendar" >
            <Calendar value={moment(params.day)} onSelect={onSelect} dateFullCellRender={onFullRender} fullscreen={false}/>
          </div>
        </div>
        <div className="activities_right">
          <h2>No activities planned for the day</h2>
        </div>
    </section>
    )
  }
}

export default Activities;

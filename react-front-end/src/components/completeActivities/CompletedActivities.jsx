import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import CompletedActivitiesList from './CompletedActivitiesList.jsx';

function  CompletedActivities(props) {
  const [activities, setActivities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterActivities, setFilterActivities] = useState([])
  const {cookies, params} = props;
 
  useEffect(()=>{
    getActivities();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])// run only once on mount

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

  function getActivities(){
    axios.get('/api/users/:id', {
      params:{
        email: cookies.get('email'),
      }
    })
    .then((response) => {
      const {activities, categories} = response.data;
      setActivities(activities);
      setFilterActivities(activities);
      setCategories(categories);
    })
  }

  const filterCategory = (event) => {
    setFilterActivities(
      activities.filter(
        activity => {
          return activity.category_id === Number(event.currentTarget.id)
        }),
    );
  }

  const allCategories = () => {
    setFilterActivities(activities);
  }

  const categories_button = categories.map(category => {
    return <button id={category.id} className="activities_categoriesButtons" onClick={filterCategory}>{category.name}</button>
  });

  return (
    <section className="activities">
      <div>
        <div className="activities_categories">
          {categories_button}
          <button className="activities_categoriesButtons" onClick={allCategories}>All</button>
        </div>
        <h2>Completed Activities</h2>
        <CompletedActivitiesList className="activities_activitiesList" activities = {filterActivities}/>
      </div>
    </section>
  )
}

export default CompletedActivities

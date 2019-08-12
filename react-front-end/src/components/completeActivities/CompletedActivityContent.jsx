import React, { useState, useEffect, useRef } from 'react';
import TodayActivityBox from '../activity/TodayActivityBox.jsx';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

function CompletedActivityContent (props){
  const [active, setActive] = useState(false);
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState([]);
  const [categories, setCategories] = useState([]);

  const {cookies, params} = props;
  console.log('params', params.id)
  useEffect(()=>{
    fetchActivity();
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
      fetchActivity();
    }
  });

  function fetchActivity() {
    axios.get('/api/admin/activities/:id', {
      
      params: {
        id: Number(params.id)
      }
    })
    .then((response) => {
      console.log('response.dta', response.data)
      setActivity(response.data.activity);
    })
  }


  return (
      <section className="dayActivity">
          <div className="TodayTask">
              <div className="TodayActivityBox">
                  <TodayActivityBox activity={activity} />
              </div>
              <div className="Completeness">
                  <span>Status: Completed </span>
              </div>
              <div className="TodayContent">
                  <ReactMarkdown source={activity.content} />
              </div>
          </div>
      </section>
  )

}

export default CompletedActivityContent;

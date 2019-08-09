import React, { useState, useEffect } from 'react';
// import { ReactComponent as Logo } from '../images/logo.svg';
import Logo from '../images/logo.png'
import {Link, Redirect} from "react-router-dom";
import * as moment from 'moment';
import { withRouter } from 'react-router-dom';

const HideSchedule = (props) => {
  const { location } = props;
  if (location.pathname.match("/schedule")){
    return null;
  }

  return (
   <Link className="navbar_schedule" to="/schedule" currentpath = '/'>Reschedule</Link>
  )
}

const Reschedule = withRouter(HideSchedule); //component for rescheudule link to hide when on schedule page

function Nav(props) {
  const {cookies, setUser} = props;
  const [redirect, setRedirect] = useState(false);
  const [redirect1, setRedirect1] = useState(false);

  useEffect(() =>{
    if (redirect){
      setRedirect(false)
    }
    if (redirect1){
      setRedirect1(false)
    }
  }, [redirect, redirect1])
 
  const logout = (e) =>{
    e.preventDefault();
    cookies.remove('email',  { path: '/' })
    setUser('')
    setRedirect(true)
  };
  const redirectHome = (e) =>{
    e.preventDefault();
    setRedirect1(true)
  };

  if(redirect){
    return <Redirect to='/'/>  
  }

  if(redirect1){
    return <Redirect to={`/${moment().format('YYYY-MM-DD')}/activities`}/>
  }

  if (cookies.get('email')){
    return(
      <nav className="navbar">
        <nav className="navbar_left">
          {/* <Logo className="navbar_logo" onClick={this.redirectHome}/> */}
          <img src={Logo} alt ="Logo"className="navbar_logo" onClick={redirectHome}/>
        </nav>
        <nav className="navbar_right">
          <Reschedule/>
          <Link className="navbar_complete" to="/completed_activities" currentpath='/'>Completed Activities</Link>
          <button className="navbar_logout" onClick={logout}>Logout</button>
        </nav>
      </nav>
  )} else{
    return(
      <nav className="navbar">
        <nav className="navbar_left">
          {/* <Logo className="navbar_logo" /> */}
          <img src={Logo} alt ="Logo" className="navbar_logo" />
        </nav>
      </nav>
    )
  }
}

export default Nav;

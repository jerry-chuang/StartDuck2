import React, {useReducer} from 'react';
import { Form, DatePicker, Button} from 'antd';
import TimePicker from './TimePicker.jsx';
import CategoryPicker from './CategoryPicker.jsx';
import axios from 'axios';
import { Redirect } from 'react-router'
import * as moment from 'moment';

function Schedule({cookies}) {

  const initialState = {
    hours_per_day: 0,
    categories: [],
    start_date: null,
    end_date: null,
    endOpen: false,
    redirect: false
  }
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_HOURS_PER_DAY":
        return {
          ...state,
          hours_per_day: action.payload
        };
      case "SET_CATEGORIES":
        return {
          ...state,
          categories: action.payload
        };
      case "SET_START_DATE":
        return {
          ...state,
          start_date: action.payload
        };
      case "SET_END_DATE":
        return {
          ...state,
          end_date: action.payload
        };
      case "SET_ENDOPEN":
        return {
          ...state,
          endOpen: action.payload
        };
      case "SET_REDIRECT":
        return {
          ...state,
          redirect: action.payload
        };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  //functions for calendar date pickers
  const disabledStartDate = start_date => {
    if (!start_date || !state.end_date) {
      return moment().add(-1, 'days')  >= start_date;
    }
      return moment().add(-1, 'days')  >= start_date || state.end_date < start_date;
  };

  const disabledEndDate = end_date => {
    if (!end_date || !state.start_date) {
      return moment().add(-1, 'days')  >= end_date;
    }
    return end_date < state.start_date;
  };

  const onStartChange = value => {
    dispatch({
      type: 'SET_START_DATE',
      payload: value
    })
  };

  const onEndChange = value => {
    dispatch({
      type: 'SET_END_DATE',
      payload: value
    })
  };

  const handleStartOpenChange = open => {
    if (!open) {
      dispatch({
        type: 'SET_ENDOPEN',
        payload: true
      })
    }
  };

  const handleEndOpenChange = open => {
    dispatch({
      type: 'SET_ENDOPEN',
      payload: open
    })
  };
  //end functions for calendar date pickers

  const pickCategories = event => {
    const {value, checked} = event.target;
    if (checked){
      let category1 = state.categories.concat()
      category1.push(value)
      dispatch({
        type: 'SET_CATEGORIES',
        payload: category1
      })
    } else {
      const index = state.categories.indexOf(value);
      if (index > -1){
        let category1 = state.categories.concat()
        category1.splice(index, 1);
        dispatch({
          type: 'SET_CATEGORIES',
          payload: category1
        })
      }
    }
  };

  const setTime = hours_per_day => {
    dispatch({
      type: 'SET_HOURS_PER_DAY',
      payload: hours_per_day
    })
  };

  const handleSubmit = () => {
    axios.post('/api/user_agendas',
      {
      email: cookies.get('email'),
      start_date: state.start_date.format('YYYY-MM-DD'),
      end_date: state.end_date.format('YYYY-MM-DD'),
      categories: state.categories,
      hours_per_day: state.hours_per_day
      })
      .then(() =>   dispatch({
        type: 'SET_REDIRECT',
        payload: true
      }));
  }

  const isFormValid = () => {
    return state.hours_per_day && state.categories.length && state.start_date && state.end_date
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  if (state.redirect) {
    console.log(state.redirect);
    return <Redirect to={`/${moment().format('YYYY-MM-DD')}/activities`}/>;
  }

  return (
    <div className="datePicker_form">
      <Form {...formItemLayout} >
        <Form.Item >
          <CategoryPicker
            pickCategories={pickCategories}
          />
        </Form.Item>
        <p className="text_schedule_form">How many hours per day</p>
        <Form.Item>
          <TimePicker
          onSelectedTime={setTime}
          />
        </Form.Item>
        <Form.Item>
          <DatePicker
            disabledDate={disabledStartDate}
            showTime
            format="YYYY-MM-DD"
            value={state.start_date}
            placeholder="Star Date"
            onChange={onStartChange}
            onOpenChange={handleStartOpenChange}
          />
        </Form.Item>
        <Form.Item>
          <DatePicker
            disabledDate={disabledEndDate}
            showTime
            format="YYYY-MM-DD"
            value={state.end_date}
            placeholder="End Date"
            onChange={onEndChange}
            open={state.endOpen}
            onOpenChange={handleEndOpenChange}
          />
        </Form.Item>
        <Button className="datePicker_button" disabled={!isFormValid()} onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Schedule;

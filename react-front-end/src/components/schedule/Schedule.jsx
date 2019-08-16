import React, {useState} from 'react';
import { Form, DatePicker, Button} from 'antd';
import TimePicker from './TimePicker.jsx';
import CategoryPicker from './CategoryPicker.jsx';
import axios from 'axios';
import { Redirect } from 'react-router'
import * as moment from 'moment';

function Schedule(props) {

  const [hours_per_day, setHours_per_day] = useState(0);
  const [categories, setCategories] = useState([]);
  const [start_date, setStart_date] = useState(null);
  const [end_date, setEnd_date] = useState(null);
  const [endOpen, setEndOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const {cookies} = props;

  //functions for calendar date pickers
  const disabledStartDate = start_date => {
    if (!start_date || !end_date) {
      return moment().add(-1, 'days')  >= start_date;
    }
      return moment().add(-1, 'days')  >= start_date || end_date < start_date;
  };

  const disabledEndDate = end_date => {
    if (!end_date || !start_date) {
      return moment().add(-1, 'days')  >= end_date;
    }
    return end_date < start_date;
  };

  const onStartChange = value => {
    setStart_date(value);
  };

  const onEndChange = value => {
    setEnd_date(value);
  };

  const handleStartOpenChange = open => {
    if (!open) {
      setEndOpen(true);
    }
  };

  const handleEndOpenChange = open => {
    setEndOpen(open);
  };
  //end functions for calendar date pickers

  const pickCategories = event => {
    const {value, checked} = event.target;
    if (checked){
      let category1 = categories.concat()
      category1.push(value)
      setCategories(category1)
    } else {
      const index = categories.indexOf(value);
      if (index > -1){
        let category1 = categories.concat()
        category1.splice(index, 1);
        setCategories(category1)
      }
    }
  };

  const setTime = hours_per_day => {
    setHours_per_day(hours_per_day)
  };

  const handleSubmit = () => {
    axios.post('/api/user_agendas',
      {
      email: cookies.get('email'),
      start_date: start_date.format('YYYY-MM-DD'),
      end_date: end_date.format('YYYY-MM-DD'),
      categories: categories,
      hours_per_day: hours_per_day
      })
      .then(() => setRedirect(true));
  }

  const isFormValid = () => {
    return hours_per_day && categories.length && start_date && end_date
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

  if (redirect) {
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
            value={start_date}
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
            value={end_date}
            placeholder="End Date"
            onChange={onEndChange}
            // open={endOpen}
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

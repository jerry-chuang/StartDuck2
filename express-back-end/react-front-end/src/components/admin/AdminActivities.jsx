import React, { useState, useEffect} from 'react';
import { Icon, Form, Select, Input, Button } from 'antd';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import {Link} from 'react-router-dom';

function AdminActivities(props) {
  
  const { Option } = Select;
  const {form} = props;

  const [activities, setActivities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [textarea, setTextarea] = useState('');

  useEffect(()=>{
    fetchCategories();
    fetchActivities();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])// run only once on mount

  // recevies categories
  const fetchCategories = () => {
    axios.get('/api/admin/categories', {})
      .then((response) => {
        setCategories(response.data.categories);
      })
  }

  //receives activities from backend
  const fetchActivities = () => {
    axios.get('/api/admin/activities', {})
      .then((response) => {
        setActivities(response.data.activities);
      })
  }

  // delete an exisiting activity by clicking trash button
  const onDelete = (event) => {
    axios.delete(`/api/admin/activities/${event.currentTarget.id}`, {})
      .then(() => {
        fetchActivities();
      })
  }

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        axios.post('/api/admin/activities', {
            name: values.activityName,
            content: values.content,
            duration: Number(values.duration),
            category: values.category
        })
        .then(() => {
          fetchActivities();
          form.resetFields();
          setTextarea('')
        })
      }
    });
  };

  const changeContent = event => {
    setTextarea(event.target.value)
  }

  const { getFieldDecorator } = form;
       
  const activitiesList = activities.map(activity => {
    return( 
      <div key={activity.id} className="activitiesList">
        <span className="activityTitle">{activity.name}</span>
        <span className="activityIcons">
          <Link to={`/admin/activities/${activity.id}`} >
            <Icon  
                type="edit" 
                className="activityEditIcon" 
                style={{ fontSize: '24px', color: 'rgba(0, 0, 0, 0.65)' }} 
            />
          </Link>
          
          <Icon  
              type="delete" 
              className="activityDeleteIcon" 
              onClick={onDelete} 
              style={{ fontSize: '24px', color: 'rgba(0, 0, 0, 0.65)' }}
          />
        </span>
      </div>
    )    
  })

  const categoriesOption = categories.map(category => {
    return <Option key={category.id} value={category.id}>{category.name}</Option>
  })

  return (
    <div className="adminActivities">
      <div className="existingActivities">
        <h2 className="adminActivitiesTitle"> Activity List</h2>
        <ul className="activitiesList">
          {activitiesList}
        </ul>
      </div>

      <div className="newActivityForm">
        <Form labelCol={{ span: 30 }} wrapperCol={{ span: 30 }} onSubmit={handleSubmit}>
          <Form.Item>
            {getFieldDecorator('activityName', {
              rules: [{ required: true, message: 'Please input activity name!' }],
            })(
              <Input
                prefix={<Icon type="trophy" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Activity Name"
                style={{width: '300px'}}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('category', {
              rules: [{ required: true, message: 'Please select category!' }],
            })(
              <Select placeholder="Select a category" style={{width: '300px'}}>
                {categoriesOption}
              </Select>,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('duration', {
              rules: [{ required: true, message: 'Please input duration!' }],
            })(
              <Input 
                prefix={<Icon type="dashboard" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Duration in minutes"
                style={{width: '300px'}}
              />
            )}
          </Form.Item>
          <Form.Item>
            <ReactMarkdown source={textarea} />
            {getFieldDecorator('content', {
              rules: [{ required: true, message: 'Please input content!' }],
            })(
              <Input.TextArea 
                onChange={changeContent} 
                rows={10}
                style={{width: '300px'}}                            
                placeholder="Content"
              />
            )}
              
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
            <Button className="createButton" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>      
      </div>
    </div>
  )    
}

const WrappedApp = Form.create({ name: 'coordinated' })(AdminActivities);

export default WrappedApp

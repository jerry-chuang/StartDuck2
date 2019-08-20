import React, { useState, useEffect } from 'react';
import { Input, Form, Button } from 'antd';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

function AdminActivity(props) {
  const {params, form} = props;
  const [activity, setActivity] = useState([]);
  const [textarea, setTextarea] = useState('');

  useEffect(()=>{
    fetchActivity();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])// run only once on mount
  
  const fetchActivity = () => {
    axios.get(`/api/admin/activities/${params.id}`, {})
      .then((response) => {
        const {content, name, duration} = response.data.activity
        form.setFieldsValue({
            content: content,
            activityName: name,
            duration: duration
        })
        setActivity(response.data.activity);
        setTextarea(content)
      })
  }

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        axios.patch(`/api/admin/activities/${params.id}`, {
          name: values.activityName,
          content: values.content,
          duration: Number(values.duration),
          category: activity.category_id
        })
        .then(() => {
            fetchActivity();
            form.resetFields();
            setTextarea('');
        })
      }
    });
  };

  const changeContent = event => {
    setTextarea(event.target.value);
  }

  const { getFieldDecorator} = form;
  return (
    <div className="adminActivity">      
      <Form labelCol={{ span: 30 }} wrapperCol={{ span: 30 }} onSubmit={handleSubmit}>
        <Form.Item label="Activity Name">
          <p>{activity.name}</p>
          {getFieldDecorator('activityName', {
            rules: [{ required: true, message: 'Please input activity name!' }],
          })(<Input style={{width: '350px'}} />)}
        </Form.Item>
        <Form.Item label="Duration">
          <p>{activity.duration} m</p>
          {getFieldDecorator('duration', {
            rules: [{ required: true, message: 'Please input duration!' }],
          })(<Input style={{width: '350px'}} />)}
        </Form.Item>
        <Form.Item label="Content">
          <ReactMarkdown source={textarea} />
          {getFieldDecorator('content', {
              rules: [{ required: true, message: 'Please input content!' }],
          })(<Input.TextArea style={{width: '350px'}} onChange={changeContent} rows={10}/>)}    
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <Button className="createButton" htmlType="submit">
              Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
const WrappedAdminActivity = Form.create({ name: 'coordinated' })(AdminActivity);

export default WrappedAdminActivity 

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Icon, Form, Input, Button } from 'antd';

function AdminCategories (props) {
  const {form} = props;
  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    fetchCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])// run only once on mount

  const fetchCategories = () => {
    axios.get('/api/admin/categories', {})
      .then((response) => {
        setCategories(response.data.categories)
      })
  }

  // delete an existing category by clicking trash button
  const onDelete = (event) => {
    axios.delete(`/api/admin/categories/${event.currentTarget.id}`, {})
      .then(() => {
        fetchCategories()
      })
  }

  // create new category and saves in db
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        axios.post('/api/admin/categories', { name: values.category })
          .then(() => {
            fetchCategories();
            form.resetFields();
          })
      }
    });
  };

  function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  const categoriesList = categories.map(category => {
    return(
      <div key={category.id}className="activitiesList">
        <span className="activityTitle">
          {category.name}
        </span>
        <span className="activityIcons">
          <Icon id={category.id} 
            type="delete" 
            onClick={onDelete} 
            style={{ fontSize: '24px', color: 'rgba(0, 0, 0, 0.65)' }}
          />
        </span>
      </div>
    )
  })

  const { getFieldDecorator, getFieldsError} = form;

  return (
    <div className="adminActivities">
      <div className="existingActivities">
        <h2 className="adminActivitiesTitle"> Categories List</h2>
        <ul className="activitiesList">
            {categoriesList}
        </ul>
      </div>
      <div className="newActivityForm">
        <Form layout="inline" onSubmit={handleSubmit} >
          <Form.Item>
            {getFieldDecorator('category', {
              rules: [{ required: true, message: 'Please input category!', valuePropName: 'value' }],
              // rules: [{ required: true, message: 'Please input category!', valuePropName: 'value' }],
            })(
              <Input
                prefix={<Icon type="trophy" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="New Category"
              />,
            )}
          </Form.Item>
          
          <Form.Item>
            <Button 
              className="createButton"
              htmlType="submit" 
              disabled={hasErrors(getFieldsError())}
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

const WrappedHorizontalLoginForm = Form.create({ name: 'creating_category' })(AdminCategories);

export default WrappedHorizontalLoginForm

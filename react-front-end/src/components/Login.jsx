import React from 'react';
// import { ReactComponent as MainImage } from '../images/main.svg';
import main from '../images/main.png'
import { Form, Icon, Input, Button} from 'antd';
import {Redirect} from "react-router-dom";
import * as moment from 'moment';
import axios from 'axios';

function Login (props) {
  const {cookies, form, setUser} = props;

  function handleSubmit (e) {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        axios
        .post('/api/users', {email: values.email})
        .then(() => {
          cookies.set("email", values.email, { path: '/' })
          setUser(cookies.get('email'))  
        })  
      }
    });
  };

  if(cookies.get('email')){
    return (
        <Redirect to={`/${moment().format('YYYY-MM-DD')}/activities`}/>
    )
  } 
  const { getFieldDecorator } = form;
  return (
    <section className="login-page">
      <div>
        {/* <MainImage className="main_image" /> */}
        <img src={main} alt ="Main-page"className="main_image" />
      </div>
      <Form onSubmit={handleSubmit} className="login-form">
      <h1>Manage your time with us!</h1>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="E-mail address"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" className="login-page_login-button">
            Log in
          </Button>     
        </Form.Item>
      </Form>
    </section>
  );
  
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm;

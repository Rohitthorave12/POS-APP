import { Form, Input, Button, message } from 'antd'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import {useDispatch} from 'react-redux'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const handleSubmit = async(value) => {
      try {
        
        dispatch({ type: "SHOW_LOADING" });
        const res = await axios.post("http://localhost:8080/api/users/login", value);
        message.success("User Login successfully");
        localStorage.setItem('auth', JSON.stringify(res.data));

        dispatch({ type: "HIDE_LOADING" });
        navigate('/')
      } catch (error) {
        message.error("Something went wrong");
        console.error("Error adding item:", error);
      }
    }

    useEffect(() => {
      const auth = localStorage.getItem("auth");
      if (auth) {
        navigate("/");
      }
    }, [navigate]);
    


  return (
    <>
      <div className="register">
        <div className="register-form">
        <h1>POS APP</h1>
        <h3>Login Page</h3>
        <Form
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Form.Item
              name="userId"
              label="User ID"
              rules={[{ required: true, message: "Please enter the User ID" }]}
            >
              <Input type="Number" />
            </Form.Item>
            <Form.Item  name="password" label="password"> 
              <Input type="password" />
            </Form.Item>
            <div className="d-flex justify-content-between">
                <p>
                    Not a user Please 
                    <Link to="/register" > Register Here</Link>
                </p>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default Login

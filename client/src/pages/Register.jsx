import { Form, Input, Button, message } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (value) => {
    try {
      dispatch({ type: "SHOW_LOADING" });
      await axios.post("http://localhost:8080/api/users/register", value);
      message.success("User Registered Successfully");
      dispatch({ type: "HIDE_LOADING" });
      navigate("/login");
    } catch (error) {
      message.error("Something went wrong");
      console.error("Error registering user:", error); // ✅ Updated error message
    }
  };

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
          <h3>Register Page</h3>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="userId"
              label="User ID"
              rules={[{ required: true, message: "Please enter the User ID" }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input type="password" />
            </Form.Item>

            <div className="d-flex justify-content-between">
              <p>
                Already Register Please
                <Link to="/login"> Login Here</Link>
              </p>
              <Button type="primary" htmlType="submit">
                REGISTER
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;

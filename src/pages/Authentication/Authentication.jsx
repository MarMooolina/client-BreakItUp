import { Button, Form, Input, Image, Divider, Layout } from "antd";
import "./Authentication.css"
import { Link } from "react-router-dom";
import { Page } from "../../components";
import {signupService,loginService} from '../../services/auth.services'
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navbar } from "../../components"

const { Footer } = Layout;

function Auth(props) {
const navigate = useNavigate()
const {storeToken, authenticatedUser} = useContext(AuthContext)

const onFinish = async(values) => {

try {
    const service = props.signup ? signupService : loginService;
    const response = await service(values)

    storeToken(response.data.authToken)
    authenticatedUser()
    navigate("/dashboard")
    
} catch (error) {
    if(error.response && error.response.data && error.response.data.messageError){
        console.log("Error:",error.response.data.messageError) 
    }
}
}

const onFinishFailed = async (errorInfo) => {

try {
  console.log("Failed:", errorInfo);
  const service = await props.signup ? signupService : loginService;
  
} catch (error) {
    if(error.response && error.response.data && error.response.data.messageError){
      console.log("Error:",error.response.data.messageError) 
    }
}
}

  return (
    <>
    <Navbar/>
    <div className="Container">
    <div className="Container-Photo">
    <img
    className="Crop"
    src="https://images.pexels.com/photos/6951853/pexels-photo-6951853.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
    />
    </div>
    <Page>
    <div className="Titles">
      <h1> 🍃&nbsp;✨&nbsp;&nbsp;&nbsp;&nbsp; Break It Up &nbsp;&nbsp;&nbsp;&nbsp;✨&nbsp;🍃</h1>
    </div>
      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 800,
          alignItems: "center",
          marginTop: 60
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item

          label="Email"
          name="email"
          rules={[
            {
              type:"email",
              required: true,
              message: "Please input your email!",
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        {props.signup &&
        
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        
        }
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 5,
            span: 16
          }}
          style={{marginTop: 40}}
        >
          
          <Button type="primary" htmlType="submit" style={{marginRight: 16, backgroundColor: "#8d6e63"}}>
            {
                props.signup ? "Sign Up" : "Login"
            }
          </Button>

          or <a className="Links"
            href={props.signup ? "/login":"/signup"}
          > {  props.signup ? "Login" : "Sign Up"}</a>
        </Form.Item>
      </Form>
    </Page>
    </div>

    <Footer style={{ textAlign: 'center' }}>Break It Up ©2023 | Created by Mar Molina</Footer>

    </>
  );
}

export default Auth;
import { Button, Form, Input, Avatar, Divider, Card, Tooltip, Layout, Typography } from "antd";
import { AntDesignOutlined, DeleteOutlined } from '@ant-design/icons';
import { Page } from "../../components";
import {signupService,loginService} from '../../services/auth.services'
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { editProfile} from "../../services/user.services"
import { listQuotes, quoteCtrl } from "../../services/quote.services"
import { listVideo, videoCtrl } from "../../services/video.services";
import { Navbar } from "../../components";
import "./ProfilePage.css"

const { Footer } = Layout;
const { Title } = Typography;

function ProfilePage(props) {
const navigate = useNavigate()
const { user, setUser } = useContext(AuthContext)
const [ quote, setQuote ] = useState({})
const [ favQuote, setFavQuote ] = useState(true)

const onFinish = async(values) => {
  try {
      const response = await editProfile (values)
      setUser(prevState => ({...prevState, username: response.data.username}))      
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

//Delete Quote
const handleDeleteFavorite = async (i, quote) => {
  try {
  const responseFav = await quoteCtrl({q: quote.quote, a: quote.author})
  const newListArr = [...favList]
  newListArr.splice(i, 1)  
  setFavList(newListArr)
  setFavQuote(false)

  } catch (error) {
    if(error.response && error.response.data && error.response.data.messageError){
      console.log("Error:",error.response.data.messageError) 
    }
  }
}

//Delete Video
const handleDeleteVideo = async (i, video) => {
  try {
  const responseFav = await videoCtrl(video)
  const newListArr = [...videoList]
  newListArr.splice(i, 1)  
  setVideoList(newListArr)

  } catch (error) {
    if(error.response && error.response.data && error.response.data.messageError){
      console.log("Error:",error.response.data.messageError) 
    }
  }
}

//Video List
const [videoList, setVideoList] = useState([])

  useEffect(()=>{ 
      const getVideos = async () => {
          try {
              const response = await listVideo()
              setVideoList(response.data)
          } catch (error) {
            if(error.response && error.response.data && error.response.data.messageError){
              console.log("Error:",error.response.data.messageError) 
            }
          }
      }
      getVideos()
  }, [])

//Quote List
const [favList, setFavList] = useState([])

  useEffect(()=>{ 
      const getQuotes = async () => {
          try {
              const response = await listQuotes()
              setFavList(response.data)

          } catch (error) {
            if(error.response && error.response.data && error.response.data.messageError){
              console.log("Error:",error.response.data.messageError) 
            }
          }
      }
      getQuotes()
  }, [])

  return (
    <>
    <Navbar/>
    <div className="Header">
      <div className="Avatar">
        <Avatar
        src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        size={140}
        icon={<AntDesignOutlined />}
        />
      </div>
      <div className="Header-Photo">
        <img
        src="https://images.pexels.com/photos/6044185/pexels-photo-6044185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
        <p>{}</p>
      </div>
    </div>
    
    <div className="Container-Info">
    <Page>
      <h1>{user.username}</h1>
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
          marginLeft: 370,
          marginTop: 24
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          hasFeedback
        >
          <Input />
        </Form.Item>

       <Form.Item
          wrapperCol={{
            offset: 6,
            span: 16,
          }}
        >
          <Button style={{backgroundColor: "#8d6e63", height: 40}}type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>

      <Divider style={{width: "60%", borderColor: "#8d6e63", marginTop: 80, alignItems: "baseline"}}><Title level={4}>My favorites</Title></Divider>
        
      <div className="Container-Profile">

        <div className="Container-Videos">
        
        <div className="Title-Video">
          <Title level={4}>Your videos</Title>
        </div>

        <div className="Container-Cards">

        {videoList.length ? videoList.map((video, index) =>(
          
          <Card>
          <iframe id={`player-${index}`} type="text/html" width="640" height="390"
          title={video.title} 
          style={{ width: 650}}
          key={index}
          src={`https://www.youtube.com/embed/${video.videoId}`}
          frameborder="0"></iframe>

          <Divider /> 

          <Tooltip title="Delete from favorites">
                    <Button 
                    onClick={()=>handleDeleteVideo(index, video)}
                    type="primary" 
                    shape="circle" 
                    style={{backgroundColor: "#A7727D"}}
                    icon={<DeleteOutlined />} 
                    />
                </Tooltip>
                </Card>
            )): <p className="Title-Empty">You don't have favorite videos yet 📹</p>}
        </div>
        </div>

      <div className="Container-Quotes">

        <div className="Title-Quote">
          <Title level={4}>Your quotes</Title>
        </div>

        <div className="Container-Cards"
        >
      {favList.length ? favList.map((item, index) =>(
              <Card 
              key={index}
              style={{ width: 678}}
              >
              <h3><b>{item.quote}</b></h3>
              <br />
              <p>-{item.author}</p>

              <Divider />

              <Tooltip title="Delete from favorites">
                  <Button 
                  onClick={()=>handleDeleteFavorite(index, item)}
                  type="primary" 
                  shape="circle" 
                  style={{backgroundColor: "#A7727D"}}
                  icon={<DeleteOutlined />} 
                  />
              </Tooltip>

              </Card>
          )) : <p className="Title-Empty">You don't have favorite quotes yet 📝</p>}
        </div>
          </div>
      </div>

    </Page>

    <Footer style={{ textAlign: 'center' }}>Break It Up ©2023 | Created by Mar Molina</Footer>

    </div>
    </>
  );
}

export default ProfilePage;
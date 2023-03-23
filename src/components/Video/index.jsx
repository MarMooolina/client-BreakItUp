import { randomVideo, videoCtrl } from "../../services/video.services";
import { useState, useEffect } from "react";
import { Typography, Tooltip, Button} from "antd";
import { HeartOutlined, DeleteOutlined} from '@ant-design/icons';

import "./styles.css"


const { Title } = Typography;


function VideoFunction(){
    const [video, setVideo] = useState({})
    const [favVideo, setFavVideo] = useState(true)


    async function getVideo (){
        try {
            const responseVideo = await randomVideo()
            setVideo(responseVideo.data)
            
        } catch (error) {
            if(error.response && error.response.data && error.response.data.messageError){
                console.log("Error: Can't get video",error.response.data.messageError) 
              }
        }
    }

    const handleFavorite = async () => {
        try {
            const responseFav = await videoCtrl(video)
            if(responseFav.data.messageSuccess){
                setFavVideo(true)
            } else{
                setFavVideo(false)
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.messageError){
                console.log("Error: Video can't be marked as favorite",error.response.data.messageError) 
            }
        }
      }

      useEffect(() => {
        getVideo()
    }, [])

    return(
        <div className="Container-Video">
            <div className="Title-Video-D">
                <Title level={3}>Video</Title>
            </div>
        <>
        <iframe id="player" type="text/html" width="640" height="390"
        src={video.url}
        frameborder="0"></iframe>
        </>
        <div className="Video-Fav">
        <Title level={5}>Did you like this video? Save it for later!</Title>
        
        {favVideo ?
            <Tooltip title="Mark as favorite">
                  <Button 
                  onClick={()=>handleFavorite(video)}
                  type="primary" 
                  style={{backgroundColor: "#6096B4"}}
                  shape="circle" 
                  icon={<HeartOutlined />} 
                  />
              </Tooltip>
              :
              <Tooltip title="Delete from favorites">
                  <Button 
                  onClick={()=>handleFavorite(video)}
                  type="primary" 
                  style={{backgroundColor: "#A7727D"}}
                  shape="circle" 
                  icon={<DeleteOutlined />} 
                  />
              </Tooltip>
            }
        </div>
        </div>

    )
}

export default VideoFunction;
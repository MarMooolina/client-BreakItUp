import { useState, useEffect } from 'react';
import { quoteRandom, quoteCtrl  } from '../../services/quote.services';
import { HeartOutlined, DeleteOutlined} from '@ant-design/icons';
import { Tooltip, Button, Typography } from "antd"
import  "./styles.css"

const { Title } = Typography;

function GetQuote(random){
    const [quote, setQuote] = useState({})
    const [favQuote, setFavQuote] = useState(true)

    async function getData (){
        try {
            const responseQuote = await quoteRandom()
            setQuote(responseQuote.data.quote)
            
        } catch (error) {
            if(error.response && error.response.data && error.response.data.messageError){
                console.log("Error: Can't get quote",error.response.data.messageError) 
            }
        }
    }

    const handleFavorite = async () => {
        try {
            const responseFav = await quoteCtrl(quote)
            if(responseFav.data.messageSuccess){
                setFavQuote(true)
            } else{
                setFavQuote(false)
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.messageError){
                console.log("Error: Quote can't be marked as favorite",error.response.data.messageError) 
            }
        }
    }

      useEffect(() => {
        getData()
    }, [])

    return(
        <div className="Container-Quote">
            <div className="Quote">
                <Title level={2}>{quote.q}</Title>
                <Title level={4}>- {quote.a}</Title>
            </div>

            {favQuote ?
            <Tooltip title="Mark as favorite">
                  <Button
                  onClick={()=>handleFavorite(quote)}
                  type="primary" 
                  style={{backgroundColor: "#6096B4", marginTop: 20}}
                  shape="circle" 
                  icon={<HeartOutlined />} 
                  />
              </Tooltip>
              :
              <Tooltip title="Delete from favorites">
                  <Button 
                  onClick={()=>handleFavorite(quote)}
                  type="primary" 
                  style={{backgroundColor: "#A7727D", marginTop: 20}}
                  shape="circle" 
                  icon={<DeleteOutlined />} 
                  />
              </Tooltip>
            }
            </div>
    )
}

export default GetQuote
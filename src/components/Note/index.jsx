import { Button, Modal, Input, Typography, Space, Card, Tooltip, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { listNote, deleteNote, createNote, editNote } from "../../services/note.services";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import "./styles.css"

const { Title } = Typography;
const { TextArea } = Input;
function Note() {

const navigate = useNavigate()
const [isModalOpen, setIsModalOpen] = useState(false);

const [note, setNote] = useState({title: "", description: ""})
const [newList, setnewList] = useState([])
const [edit, setEdit] = useState(false)
  
    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = async () => {
      try {
      const responseCreate = edit ?  await editNote(note._id, note) : await createNote(note)
      if(edit){
        const indexNote = list.findIndex((item)=> item._id === note._id)
        const newListOk = [...list]
        newListOk[indexNote] = note
        setList(newListOk)
      } else{
        setList(prevState => [responseCreate.data, ...prevState])
      }
      setNote({title: "", description: ""})
      setIsModalOpen(false); 
      setEdit(false)    
      } catch (error) {
        if(error.response && error.response.data && error.response.data.messageError){
          console.log("Error: Can't create note",error.response.data.messageError) 
        }
      }
    }
  
    const handleCancel = () => {
      setNote({title: "", description: ""})
      setIsModalOpen(false);
      setEdit(false)
    }

    const handleEdit = (note) => {
      setNote(note)
      setEdit(true)
      setIsModalOpen(true);
    };

const handleDelete = async (i, noteID) => {
  try {
  const responseDelete = await deleteNote(noteID)
  const newListArr = [...list]
  newListArr.splice(i, 1)  
  setList(newListArr)

  } catch (error) {
    if(error.response && error.response.data && error.response.data.messageError){
      console.log("Error: Can't detelete note",error.response.data.messageError) 
    }
  }
}

//List
const [list, setList] = useState([])

useEffect(()=>{ 
    const getData = async () => {
        try {
            const response = await listNote()
            setList(response.data)
        } catch (error) {
          if(error.response && error.response.data && error.response.data.messageError){
            console.log("Error: Can't get note list",error.response.data.messageError) 
          }
        }
    }
    getData()
  }, [])

  return (
    <div className="Container-Notes">
      <div className="Title-Notes">
        <Title level={3}>Your notes</Title>
      </div>
        <>
            <Button type="primary" 
            style={{backgroundColor: "#8d6e63", height: 40}}
            onClick={showModal}>
            Create new note
            </Button>
            <Modal 
            title="New note" 
            open={isModalOpen} 
            style={{color: "#8d6e63"}}
            onOk={handleOk} 
            onCancel={handleCancel}>
                <Input placeholder="Title" value={note.title}
                onChange={(e)=> setNote(prevNote => ({...prevNote, title: e.target.value}))}
                />
                <br />
                <br />
                <TextArea value={note.description} rows={3} placeholder="Write your thoughts" maxLength={100} 
                onChange={(e)=> setNote(prevNote => ({...prevNote, description: e.target.value}))}
                />
            </Modal>
        </>
        <div className="Container-Cards-Note">
          <Space direction="horizontal" size={16} padding={20}>
          {list.length ? list.map((item, index) =>(
              <Card 
              key={index}
              title={item.title} 
              style={{ width: 328 }}>
              <div>
                  {item.description}
              </div>

              <Divider />

              <div className="Container-Buttons">
              <Tooltip title="Edit">
                  <Button 
                  onClick={()=>handleEdit(item)}
                  style={{backgroundColor: "#6096B4"}}
                  onOk={handleOk} 
                  type="primary" shape="circle" icon={<EditOutlined/>} />
              </Tooltip>
              <Tooltip title="Delete">
                  <Button 
                  onClick={()=>handleDelete(index, item._id)}
                  type="primary"
                  style={{backgroundColor: "#A7727D", fontSize: 16}}
                  shape="circle" 
                  icon={<DeleteOutlined />} />
              </Tooltip>
              </div>
              </Card>
          )) : <p className="Title-Empty">✨🍃  You haven't written a note yet, start now and let go of what worries you! ✨🍃</p> } 
          </Space>
        </div>
    </div>
  )
}

export default Note;


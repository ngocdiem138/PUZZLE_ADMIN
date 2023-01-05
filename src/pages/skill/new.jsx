import "./new.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import accountService from "../../services/accountService";
import styled from "@emotion/styled";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import skillService from "../../services/skillService";



const NewSkill = () => {
    const inputs = [
        {
          id: 1,
          label: "Name",
          value: "name",
          type: "text",
          placeholder: "Python, Java",
        }
      ];
      const title = "Add new extra info"
  const [value, setValue] = useState({})
  const [notification, setNotification] = useState({content: "", type:""})
  
  const Message = styled.div`
  color: ${props => (props.success ? 'green' : 'red')};
`

  const onChange = (event, type) => {
    let valueTmp = {...value}
    if(type === 'active')
      valueTmp[type] = event.target.checked
    else
      valueTmp[type] = event.target.value
    setValue({...valueTmp})
    console.log(valueTmp)
  }

  const onSend = async() => {
    setValue(value)
    console.log(value);
    const data = await skillService.createNewSkill(value)
    console.log(data);
    if(data.data.message === 'Save successfully')
    {
      setNotification({content:"Create new skill", type:"success" })
      toast.success("Create new skill", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    else
    {
      setNotification({content:"Error", type:"error" })
      toast.error("Error", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    

  }
  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} onChange={(event)=> onChange(event, input.value)}/>
                </div>
              ))}
              <div className="formInput" style={{marginLeft:"-120px"}}>
                <label>Type </label>
                <select style={{width:"fit-content"}}  type="checkbox" onChange={(event)=>onChange(event, 'type')}>
                  <option value='service'>Service</option>
                  <option value='skill'>Skill</option>
                  <option value='position'>Position</option>
                </select>
              </div>
              <div className="formInput" style={{marginLeft:"-80px"}}>
                <label>Active: </label>
                <input style={{width:"fit-content"}}  type="checkbox" onChange={(event)=>onChange(event, 'active')}/>
              </div>

              <button type="button" onClick={onSend}>Send</button>
            </form>
          </div>
            {notification?.type === "success" ?
              <Message success>{notification.content}</Message>
              :
              <Message error>{notification.content}</Message>}
              <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                  />
              {/* Same as */}
              <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default NewSkill;

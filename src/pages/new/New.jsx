import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import userService from "../../services/UserService";
import accountService from "../../services/accountService";
import styled from "@emotion/styled";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [value, setValue] = useState({})
  const [notification, setNotification] = useState({content: "", type:""})
  
  const Message = styled.div`
  color: ${props => (props.success ? 'green' : 'red')};
`

  const onChange = (event, type) => {
    let valueTmp = {...value}
    if(type === 'active')
      valueTmp[type] = event.target.checked
    else if(type === 'roleCodes')
    {
      const array = event.target.value.toString().split(",")
      valueTmp.roleCodes = array
    }
    else
      valueTmp[type] = event.target.value
    setValue({...valueTmp})
  }

  const onSend = async() => {
    setValue(value)
    console.log(value);
    const data = await accountService.createAccount(value)
    if(data.data.message === "Create user success")
    {
      setNotification({content:"Create new use", type:"success" })
      toast.success("Create new user successfully", {
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
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} onChange={(event)=> onChange(event, input.value)}/>
                </div>
              ))}

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

export default New;

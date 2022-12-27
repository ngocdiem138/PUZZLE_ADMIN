import "./new.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import accountService from "../../services/accountService";
import styled from "@emotion/styled";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import companyService from "../../services/companyService";



const CompanyDetail = () => {
    

    const inputs = [
        {
          id: 1,
          label: "Name",
          value: "name",
          type: "text",
          placeholder: "FPT, Facebook",
        },
        {
          id: 2,
          label: "Description",
          value: "description",
          type: "text",
          placeholder: "Description a bout company",
        },
        {
          id: 3,
          label: "Website",
          value: "website",
          type: "text",
          placeholder: "www.example.com",
        }
      ];
      const title = "Add new company"
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
  }

  const onSend = async() => {
    setValue(value)
    const data = await companyService.createCompany(value)
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
              <div className="formInput">
                <label>Active: </label>
                <input style={{width:"fit-content"}}  type="checkbox" onChange={(event)=>onChange(event, 'active')}/>
              </div>

            </form>
              <button className="px-10 py-2.5 mt-5 bg-[#008080] text-white font-bold mr-auto" type="button" onClick={onSend}>Send</button>
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

export default CompanyDetail;

import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import userService from "../../services/userService";
import accountService from "../../services/accountService";
import styled from "@emotion/styled";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [value, setValue] = useState({});
  const [notification, setNotification] = useState({ content: "", type: "" });
  const [selectedOption, setSelectedOption] = useState();

  const Message = styled.div`
  color: ${props => (props.success ? 'green' : 'red')};
`

  const onChange = (event, type) => {
    let valueTmp = { ...value }
    if (type === 'active')
      valueTmp[type] = event.target.checked
    else if (type === 'roleCodes') {
      let array = [];
      event.forEach(element => {
        array = [...array, element.value]
      });
      if(array.length==0){
        array=['USER']
      }
      valueTmp[type] = array
    }
    else
      valueTmp[type] = event.target.value
    setValue({ ...valueTmp })
  }

  const options = [
    { value: 'user', label: 'USER'},
    { value: 'candidate', label: 'CANDIDATE' },
    { value: 'employer', label: 'EMPLOYER' },
    { value: 'admin', label: 'ADMIN' },
  ];

  const onSend = async () => {
    setValue(value)
    console.log(value);
    const data = await accountService.createAccount(value)
    if (data.status == 200 && data.data.message === "Create user success") {
      setNotification({ content: "Create new use", type: "success" })
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
    else {
      setNotification({ content: "Error", type: "error" })
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
            <form noValidate>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input  type={input.type} placeholder={input.placeholder} onChange={(event) => onChange(event, input.value)} required />
                </div>
              ))}
              <div className="formInput">
                <label>Roles</label>
                <Select
                  value={selectedOption}
                  onChange={(e) => { setSelectedOption(e); onChange(e, "roleCodes") }}
                  options={options}
                  isMulti={true}
                  isSearchable={true}
                  defaultValue ={options[0]}
                />
              </div>
              <div className="formInput">
                <label></label>
                <button style={{ "marginTop": "2vh", "marginLeft": "10vw" }} type="button" onClick={onSend}>Create</button>
              </div>
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

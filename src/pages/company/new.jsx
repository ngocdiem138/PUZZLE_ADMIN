import "./new.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import accountService from "../../services/accountService";
import styled from "@emotion/styled";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import companyService from "../../services/companyService";



const NewCompany = () => {
  const [file, setFile] = useState("");
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
  const [notification, setNotification] = useState({ content: "", type: "" })

  const Message = styled.div`
  color: ${props => (props.success ? 'green' : 'red')};
`

  const onChange = (event, type) => {
    let valueTmp = { ...value }
    if (type === 'active')
      valueTmp[type] = event.target.checked
    else
      valueTmp[type] = event.target.value
    setValue({ ...valueTmp })
  }

  const onSend = async () => {
    setValue(value)
    console.log(value)
    const formData = new FormData();
    formData.append("name", value.name);
    formData.append("website", value.website);
    formData.append("description", value.description);
    formData.append("image", file);
    formData.append("active", value.active);
    console.log(formData);
    const data = await companyService.createCompany(formData)
    console.log(data);
    if (data.data.status === 200) {
      setNotification({ content: "Create new company", type: "success" })
      toast.success("Create new company", {
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
            <img
              style={{ "width": "10vw", "marginLeft": "40%" }}
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
            <div className="formInput" style={{ "marginLeft": "40%" }}>
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
            <form>
              <div className="formInput">
                <label>Active: </label>
                <input style={{ width: "fit-content" }} type="checkbox" onChange={(event) => onChange(event, 'active')} />
              </div>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} onChange={(event) => onChange(event, input.value)} />
                </div>
              ))}

            </form>
            <button className="px-20 py-2.5 mt-5 bg-[#008080] text-white font-bold mr-auto" type="button" onClick={onSend}>Send</button>
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

export default NewCompany;

import "./new.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import accountService from "../../services/accountService";
import styled from "@emotion/styled";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import companyService from "../../services/companyService";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";



const CompanyDetail = () => {
  const [file, setFile] = useState();
  const { id } = useParams();

  // const {
  //   data: company,
  //   error,
  //   isError,
  //   isLoading,
  // } = useQuery({
  //   queryKey: [`company_single-${id}`],
  //   queryFn: () => companyService.getOneCompany(id),
  // });
  const [data, setData]= useState({})
  const [value, setValue] = useState(data ? data : {})
  const [notification, setNotification] = useState({ content: "", type: "" })
  const [companyData, setCompanyData] = useState(data ? data : {});
  console.log(companyData);

  useEffect(()=>{
    companyService.getOneCompany(id).then((res)=>{setData(res.data.data); setCompanyData(res.data.data); setValue(res.data.data)})
  }, [])

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
  const title = "Edit company"


  const Message = styled.div`
  color: ${props => (props.success ? 'green' : 'red')};
`

  const onChange = (event, type) => {
    console.log(value)
    let valueTmp = { ...value }
    if (type === 'active')
      valueTmp[type] = event.target.checked
    else
      valueTmp[type] = event.target.value
    setValue({ ...valueTmp })
    console.log(valueTmp)
  }

  const onSend = async () => {
    setValue(value)
    const formData = new FormData();
    formData.append("name", value.name);
    formData.append("website", value.website);
    formData.append("description", value.description);
    if (file) {
      formData.append("image", file);
    }
    formData.append("active", value.active);
    console.log(formData);
    console.log("Hao ne: " + value);
    const data = await companyService.updateCompany(companyData.id, formData)

    if (data.data.status === 200) {
      setNotification({ content: "Update successfully", type: "success" })
      toast.success("Update successfully", {
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
                  : companyData.image ?
                    companyData.image : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
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
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input value={value ? value[input.value] : ""} type={input.type} placeholder={input.placeholder} onChange={(event) => onChange(event, input.value)} />
                </div>
              ))}
              <div className="formInput">
                <label>Active: </label>
                <input style={{ width: "fit-content" }} type="checkbox" onChange={(event) => onChange(event, 'active')} checked = {value.active}/>
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

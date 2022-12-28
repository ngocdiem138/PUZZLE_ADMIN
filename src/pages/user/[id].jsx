import React, { useState, useEffect } from 'react';
import "./single.scss";
import Chart from "../../components/chart/Chart";
import { useParams } from "react-router-dom";
import accountService from "../../services/accountService";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import styled from "@emotion/styled";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormControl, FormLabel, Grid, Input } from '@chakra-ui/react';
import Select from 'react-select';
import { Box } from '@chakra-ui/react'
import { Container, Alert, Button } from 'react-bootstrap';

const UserDetail = () => {
  const { id } = useParams()

  const { data: user, error, isError, isLoading } = useQuery({ queryKey: [`user-${id}`], queryFn: () => accountService.getAccountById(id) })
  const data = user?.data?.data
  useEffect(()=>{
    if(isError)
    {
      navigate('/login')
      window.alert("Session has expired")
      localStorage.clear()
    }
  }, [isError])
  const [notification, setNotification] = useState({ content: "", type: "" });
  // console.log(data)

  const [profile, setProfile] = useState({
    phone: "",
    fullName: "",
    avatar: "",
    email: "",
    username: "",
    locale: ""
  });
  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [avatar, setAvatar] = useState("")
  const [joinDate, setJoinDate] = useState("")
  const [showError, setShowError] = useState(false)
  const [showError403, setShowError403] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [emailVerified, setEmailVerified] = useState(false)
  const [active, setActive] = useState(false)
  const [online, setOnline] = useState(false)
  const [value, setValue] = useState({});
  const [roleCodes, setRoleCodes] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  useEffect(() => {
    accountService.getAccountById(id).then((response) => {
      if (response.data.errCode == "403") {
        setShowError403(true);
      } else {
        setFullName(response.data.data.fullName);
        setUsername(response.data.data.username);
        setEmail(response.data.data.email);
        setPhone(response.data.data.phone);
        setAvatar(response.data.data.avatar);
        setJoinDate(response.data.data.joinDate);
        setEmailVerified(response.data.data.emailVerified);
        setActive(response.data.data.active);
        setOnline(response.data.data.online);
        setRoleCodes(response.data.data.roleCodes);
        let array = []
        response.data.data.roleCodes.forEach(element => {
          array = [...array, { value: element, label: element.toUpperCase() }];
        });
        setSelectedOption(array)
      }
    });
  }, [])

  const handleChange = (event) => {
    const newProfile = profile
    newProfile[event.target.name] = event.target.value
    setProfile(newProfile);
  };

  const cancel = () => {
    window.location.href = "/users/" + id
  }

  const onSend = async () => {
    setValue(value)
    console.log(value);
    const data = await accountService.updateAccount(id, value)
    if (data.status == 200 && data.data.data) {
      setNotification({ content: "Edit user", type: "success" })
      toast.success("Edit user successfully", {
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

  const onChange = (event, type) => {
    let valueTmp = { ...value }
    if (type === 'active' || type === 'online' || type === 'emailVerified')
      valueTmp[type] = event.target.checked
    else if (type === 'roleCodes') {
      let array = [];
      event.forEach(element => {
        array = [...array, element.value]
      });
      if (array.length == 0) {
        array = ['USER']
      }
      valueTmp[type] = array
    }
    else if (type === 'joinDate') {
      valueTmp[type] = event.target.value + " 00:00:00"
    } else{
      valueTmp[type] = event.target.value
    }
    setValue({ ...valueTmp })
  }


  const options = [
    { value: 'user', label: 'USER' },
    { value: 'candidate', label: 'CANDIDATE' },
    { value: 'employer', label: 'EMPLOYER' },
    { value: 'admin', label: 'ADMIN' },
  ];

  const Message = styled.div`
  color: ${props => (props.success ? 'green' : 'red')};
`

  return (
    <div className="single">
      {showError || showSuccess ?
        <Alert
          variant={showError ? 'danger' : showSuccess ? 'success' : 'info'}>
          {showError ? 'Save fail' : showSuccess ? 'Save success' : 'info'}
          <div className="d-flex justify-content-end">
            <Button
              onClick={() => {
                setShowError(false);
                setShowSuccess(false)
              }}
              variant={showError ? 'outline-danger' : showSuccess ? 'outline-success' : 'outline-info'}>
              Close!
            </Button>
          </div>
        </Alert>
        : null
      }
      <NavLink to="/users" className="d-flex align-items-center ml-4">
        {" "}
        <ArrowBackIosIcon className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8" />
        <span className="text-uppercase font-size-3 font-weight-bold text-gray">
          Back to user list
        </span>
      </NavLink>
      <div className="singleContainer">
        <div className="top">
          <div className="left">
            <div className="editButton">{fullName ? fullName : "Jon Done"}</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={avatar ? avatar : "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{fullName ? fullName : "Jon Done"}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <input
                    onChange={(event) => { onChange(event, "email"); setEmail(event.target.value) }}
                    className="itemValue"
                    value={email}
                    focusBorderColor="blue"
                    type="email"
                    placeholder="tcook@apple.com" />
                </div>
                <div className="detailItem">
                  <span className="itemKey">Usename:</span>
                  <input
                    onChange={(event) => { onChange(event, "username"); setUsername(event.target.value) }}
                    className="itemValue"
                    value={username}
                    focusBorderColor="blue"
                    type="text"
                    placeholder="diem cute" />
                </div>
                <div className="detailItem">
                  <span className="itemKey">Join Date:</span>
                  <input
                    onChange={(event) => { onChange(event, "joinDate"); setJoinDate(event.target.value) }}
                    className="itemValue"
                    value={joinDate ? joinDate.split(' ')[0] : Date.now()}
                    focusBorderColor="blue"
                    type="date" />
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <input
                    className="itemValue"
                    value={phone}
                    onChange={(event) => { onChange(event, "phone"); setPhone(event.target.value) }}
                    focusBorderColor="blue"
                    type="number"
                    placeholder="084957775" />
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email Verified:</span>
                  <input
                    className="itemValue"
                    focusBorderColor="blue"
                    type="checkbox"
                    onChange={(event) => { setEmailVerified(event.target.checked); onChange(event, "emailVerified") }}
                    checked={emailVerified}
                    placeholder="diem cute" />
                </div>
                <div className="detailItem">
                  <span className="itemKey">Active:</span>
                  <input
                    className="itemValue"
                    checked={active}
                    onChange={(event) => { setActive(event.target.checked); onChange(event, "active") }}
                    focusBorderColor="blue"
                    type="checkbox"
                    placeholder="diem cute" />
                </div>
                <div className="detailItem">
                  <span className="itemKey">Online:</span>
                  <input
                    className="itemValue"
                    checked={online}
                    onChange={(event) => { setOnline(event.target.checked); onChange(event, "online") }}
                    focusBorderColor="blue"
                    type="checkbox"
                    placeholder="diem cute" />
                </div>
                <div className="detailItem">
                  <span className="itemKey">Roles:</span>
                  <span className="itemValue" style={{ "max-width:": "60%" }}>
                    <Select
                      value={selectedOption}
                      onChange={(e) => { setSelectedOption(e); onChange(e, "roleCodes") }}
                      options={options}
                      isMulti={true}
                      isSearchable={true}
                    /></span>
                </div>
                <Button className="btn" style={{ padding: "2vh 4vh", "marginTop": "2vh", "marginLeft": "10vw", background: "gray", color: "white", fontSize: "20px" }} type="button" onClick={cancel}>Cancel</Button>
                <Button className="btn" style={{ padding: "2vh 4vh", "marginTop": "2vh", "marginLeft": "10vw", background: "green", color: "white", fontSize: "20px" }} type="button" onClick={onSend}>Edit</Button>
              </div>
            </div>
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

export default UserDetail;

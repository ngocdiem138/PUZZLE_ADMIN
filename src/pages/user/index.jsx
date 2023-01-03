import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import UserDataTable from "../../components/UserDatatable/UserDatatable";
import accountService from "../../services/accountService";
import styled from "@emotion/styled";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authService from "../../services/authService";

const UserList = () => {
  const [data, setData] = useState([]);
  const onLogout = async () => {
    localStorage.removeItem('login')
    navigate('/login')
    const res = await authService.logout()
    console.log('logout', res);
  }
  const Message = styled.div`
  color: ${props => (props.success ? 'green' : 'red')};
`
  const [notification, setNotification] = useState({ content: "", type: "" })
  useEffect(() => {
    accountService.getAllAccount().then((res) => {
      if (res.data.errCode == "403") {
        setNotification({ content: <>Session expire. Click <a href='/login'>here</a> to login again</>, type: "error" });
        toast.error(<>Session expire. Click <a href='/login' onClick={onLogout}>here</a> to login again</>, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        setData(res);
      }
    })
  }, []);
  const data2 = data?.data?.data
  console.log(data2)
  return (
    <div style={{ width: "90%" }}>
      <Message success>{notification.content}</Message>
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
      <UserDataTable dataRows={data2} />
    </div>
  );
};

export default UserList;

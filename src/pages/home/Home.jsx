import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import statisticService from "../../services/statisticService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authService from "../../services/authService";

const Home = () => {
  const onLogout = async () => {
    localStorage.removeItem('login')
    navigate('/login')
    const res = await authService.logout()
    console.log('logout', res);
  }

  const [notification, setNotification] = useState({ content: "", type: "" })
  const navigate = useNavigate()
  const [userNumber, setUserNumber] = useState()
  const [jobNumber, setJobNumber] = useState()
  const [applicationNumber, setApplicationJobNumber] = useState()
  const [companyNumber, setCompanyNumber] = useState()
  useLayoutEffect(() => {
    const token = localStorage.getItem('login')
    if (!token)
      navigate('login')
    else {
      statisticService.getAmountCompany().then((res) => {
        if (res.data.errCode == "403") {
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
          setCompanyNumber(res.data.data.length);
        }
      })
    }
    statisticService.getAmountAccount().then(res => { setUserNumber(res.data.data) })
    statisticService.getJobAmount().then(res => { setJobNumber(res.data.data) })
    statisticService.getApplicationAmount().then(res => { setApplicationJobNumber(res.data.data) })
  }, [])

  return (
    <div className="home">
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
      {/* <Sidebar /> */}
      <div className="homeContainer">
        {/* <Navbar /> */}
        <div className="widgets">
          <Widget type="user" amount={userNumber} />
          <Widget type="job" amount={jobNumber} />
          <Widget type="application" amount={applicationNumber} />
          <Widget type="company" amount={companyNumber} />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Week User Visit" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;

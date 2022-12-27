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

const Home = () => {

  const navigate = useNavigate()
  const [ userNumber, setUserNumber] = useState()
  const [ jobNumber, setJobNumber] = useState()
  const [ applicationNumber, setApplicationJobNumber] = useState()
  useLayoutEffect(()=>{
    const token = localStorage.getItem('login')
    if(!token)
      navigate('login')
    else{
      statisticService.getAmountAccount().then(res => {setUserNumber(res.data.data)})
      statisticService.getJobAmount().then(res => {setJobNumber(res.data.data)})
      statisticService.getApplicationAmount().then(res => {setApplicationJobNumber(res.data.data)})
    }
  }, [])
  
  return (
    <div className="home">
      {/* <Sidebar /> */}
      <div className="homeContainer">
        {/* <Navbar /> */}
        <div className="widgets">
          <Widget type="user" amount={userNumber} />
          <Widget type="job" amount={jobNumber}/>
          <Widget type="application" amount={applicationNumber}/>
          <Widget type="company" amount='100'/>
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

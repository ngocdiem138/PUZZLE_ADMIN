import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import accountService from "../../services/accountService";


const UserPage = () => {
  const [data, setData] = useState()

  useEffect(()=>{
    accountService.getProfile().then(res => setData(res.data.data))
  },[])


  return (
    <div className="single">
      <div className="singleContainer">
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Admin Information</h1>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{data?.fullname}</h1>
                {/* <input className="itemTitle" type="text" value={data?.fullname}></input> */}
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <input className="itemTitle" type="text" value={data?.email} style={{'border':'2px'}}></input>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <input className="itemTitle" type="text" value={data?.phone} style={{'border':'2px'}}></input>
                  {/* <span className="itemValue">{data?.phone}</span> */}
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                  <input className="itemTitle" type="text" value="Elton St. 234 Garden Yd. NewYork" style={{'border':'2px'}}></input>
                    {/* Elton St. 234 Garden Yd. NewYork */}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <input className="itemTitle" type="text" value="USA" style={{'border':'2px'}}></input>
                  {/* <span className="itemValue">USA</span> */}
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;

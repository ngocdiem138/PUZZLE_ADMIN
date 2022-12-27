import "./single.scss";
import Chart from "../../components/chart/Chart";
import { useParams } from "react-router-dom";
import accountService from "../../services/accountService";
import { useQuery } from "@tanstack/react-query";

const UserDetail = () => {
  const {id} = useParams()

  const {data: user, error, isError, isLoading } = useQuery({queryKey: [`user-${id}`], queryFn: () => accountService.getAccountById(id)}) 
  const data = user?.data?.data
  console.log(data)
  return (
    <div className="single">
      <div className="singleContainer">
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={data?.avatar || "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{data?.fullname || "Jon Done"}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{data?.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+1 2345 67 89</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                  {data?.address || "Ho Chi Minh City"}
                  </span>
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

export default UserDetail;

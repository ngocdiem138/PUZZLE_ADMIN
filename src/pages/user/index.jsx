import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import UserDataTable from "../../components/UserDatatable/UserDatatable";
import accountService from "../../services/accountService";

const UserList = () => {
  // const [data, setData] = useState([]);
  const {data, error, isError, isLoading } = useQuery({queryKey: ['users'], queryFn: accountService.getAllAccount})

  // useEffect(() => {
  //   accountService.getAllAccount().then((res) => setData(res));
  // }, []);
  const data2 = data?.data?.data
  console.log(data2)
  return (
    <div style={{ width: "90%" }}>
      <UserDataTable dataRows={data2} />
    </div>
  );
};

export default UserList;

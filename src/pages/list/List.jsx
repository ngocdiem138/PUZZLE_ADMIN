import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import bookService from "../../services/bookService"
import { useQuery } from "@tanstack/react-query"
import userService from "../../services/userService"
import { useEffect } from "react"

const List = () => {


  const {data: users, error, isError, isLoading } = useQuery({queryKey: ['users'], queryFn: userService.getUser}) 
  useEffect(()=>{
    if(isError)
    {
      navigate('/login')
      window.alert("Session has expired")
      localStorage.clear()
    }
  }, [isError])

  return (
      <div className="listContainer">
            <Datatable userData={users?.data?.data}/>
      </div>

  )
}

export default List
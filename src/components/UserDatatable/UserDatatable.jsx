import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './UserDatatable.scss'

export default function UserDatatale({dataRows}) {
  const [data, setData] = useState(dataRows)

  useEffect(()=>{
    setData(dataRows)
  }, [dataRows])

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={"/users/"+params.row.id} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "username", headerName: "Username", width: 140 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 70,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.avatarUrl || '/images/avatar.svg'} alt="avatar" />
          </div>
        );
      },
    },
    { field: "active", headerName: "active", width: 70 },
    { role: "roleCodes", headerName: "Role", width: 170,
      renderCell: (params) => (
        <div>{params.row.roleCodes.map(role => <div>{role} </div>)}</div>
      )}
  ];

  
  return (
    <div className="datatable">
      <div className="datatableTitle">
        User List
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <div style={{ height: 600, width: '100%' }}>
        {data ?
         <DataGrid
         rows={data}
         columns={columns.concat(actionColumn)}
         pageSize={10}
         rowsPerPageOptions={[10]}
         checkboxSelection
       />
       :
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
       }
      
    </div>
    </div>
  );
}

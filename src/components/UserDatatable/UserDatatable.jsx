import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './UserDatatable.scss';
import DeleteIcon from "@mui/icons-material/Delete";
import { Container, Alert, Button } from 'react-bootstrap';
import userService from "../../services/userService";

export default function UserDatatale({ dataRows }) {
  const [data, setData] = useState(dataRows)
  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => {
    setData(dataRows)
  }, [dataRows]);

  const handleDelete = (id) => {
    console.log(id)
    const confirmBox = window.confirm(
      "Do you really want to delete this User?"
    )
    if (confirmBox === true) {
      userService.deleteUserById(id)
      setData(data.filter((item) => item.id !== id));
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={"/users/" + params.row.id} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.id)}
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
            <img className="cellImg" src={params.row.avatar || '/images/avatar.svg'} alt="avatar" />
          </div>
        );
      },
    },
    { field: "active", headerName: "active", width: 70 },
    {
      role: "roleCodes", headerName: "Role", width: 170,
      renderCell: (params) => (
        <div>{params.row.roleCodes.map(role => <div>{role} </div>)}</div>
      )
    },
  ];

  const deleteSelectedFile = () => {
    const confirmBox = window.confirm(
      "Do you really want to delete this User?"
    )
    if (confirmBox === true) {
      const filteredFileList = data.filter(
        (item) => !selectionModel.includes(item.id)
      );
      selectionModel.forEach((item) => {
        userService.deleteUserById(item)
      })
      setData(filteredFileList);
    }

  };


  return (
    <div className="datatable">
      <div className="datatableTitle">
        List All User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <div style={{ height: '80vh', width: '100%' }}>
        {data ?
          <DataGrid
            rows={data}
            columns={columns.concat(actionColumn)}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            onSelectionModelChange={setSelectionModel}
            selectionModel={selectionModel}
          />
          :
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        }

        {selectionModel.length > 0 ? <Button className="btn" style={{ padding: "2vh 4vh", "marginTop": "2vh", background: "red", color: "white", fontSize: "20px" }} type="button" onClick={deleteSelectedFile}>
          <DeleteIcon /> Delete all selected rows
        </Button> : null}

      </div>
    </div>
  );
}

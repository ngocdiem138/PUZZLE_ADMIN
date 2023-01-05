import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import companyService from "../../services/companyService";
import './CompanyDatatable.scss';
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Alert, Button } from 'react-bootstrap';

export default function CompanyDatatable() {

  const [data, setData] = useState([])
  const [isLoading, setILoading] = useState(true)
  const [selectionModel, setSelectionModel] = useState([]);
  const onLogout = async () => {
    localStorage.removeItem('login')
    navigate('/login')
    const res = await authService.logout()
    console.log('logout', res);
  }

  useEffect(() => {

    const token = localStorage.getItem('login')
    if (!token)
      navigate('login')
    else {
      companyService.getAllCompany().then((res) => {
        if (res.data.errCode == "403") {
          toast.error(<a href='/login' onClick={onLogout}>Session expire. Click here to login again</a>, {
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
          setData(res.data.data);
          setILoading(false)
        }
      })
    }
  }, []);

  const handleDelete = (id) => {
    console.log(id)
    const confirmBox = window.confirm(
      "Do you really want to delete this Company?"
    )
    if (confirmBox === true) {
      companyService.deleteCompany(id)
      setData(data.filter((item) => item.id !== id));
    }
  };

  const deleteSelectedFile = () => {
    const confirmBox = window.confirm(
      "Do you really want to delete this Company?"
    )
    if (confirmBox === true) {
      const filteredFileList = data.filter(
        (item) => !selectionModel.includes(item.id)
      );
      console.log(selectionModel)
      selectionModel.forEach((item) => {
        companyService.deleteCompany(item)
      })
      setData(filteredFileList);
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
            <Link to={"/company/" + params.row.id} style={{ textDecoration: "none" }}>
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
    { field: "name", headerName: "Name", width: 190 },
    // { field: "description", headerName: "Description", width: 500, dangerouslySetInnerHTML:{_html: ""} },
    { field: "website", headerName: "website", width: 650 },
    {
      field: "image",
      headerName: "image",
      width: 70,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.image || '/images/avatar.svg'} alt="image" />
          </div>
        );
      },
    },

  ];


  return (
    <div className="datatable">
      <div className="datatableTitle">
        List All Company
        <Link to="/company/new" className="link">
          Add New
        </Link>
      </div>
      <div style={{ height: 600, width: '100%' }} >
        {isLoading ? <div>Đang tải</div> :
          <DataGrid
            _html={false}
            rows={data}
            columns={columns.concat(actionColumn)}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            onSelectionModelChange={setSelectionModel}
            selectionModel={selectionModel}
          />}

        {selectionModel.length > 0 ? <Button className="btn" style={{ padding: "2vh 4vh", "marginTop": "2vh", background: "red", color: "white", fontSize: "20px" }} type="button" onClick={deleteSelectedFile}>
          <DeleteIcon /> Delete all selected rows
        </Button> : null}

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

      </div>
    </div>
  );
}

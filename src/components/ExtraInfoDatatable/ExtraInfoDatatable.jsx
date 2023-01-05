import "./ExtraInfoDatatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Alert, Button } from 'react-bootstrap';
import skillService from "../../services/skillService";

const ExtraInfoDatatable = ({ dataRows, columns, deleteMutation, actionColumn = [] }) => {
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
      skillService.getAllSkill().then((res) => {
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

  console.log(columns);

  const handleDelete = async (event, id) => {
    const confirmBox = window.confirm(
      "Do you really want to delete this Company?"
    )
    if (confirmBox === true) {
      event.stopPropagation()
      setData(data.filter((item) => item.id !== id));
      await deleteMutation.mutate(id)
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
        deleteMutation.mutate(item)
      })
      setData(filteredFileList);
    }

  };

  const _actionColumn = actionColumn(handleDelete)

  return (
    <div className="datatable">
      <div className="datatableTitle">
        List Extra Info
        <Link to='new' className="link">
          Add New
        </Link>
      </div>
      {
        deleteMutation.isSuccess ?
          <div>Success</div>
          :
          ""
      }
      {!data ?
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
        :
        <DataGrid
          className="datagrid"
          rows={data}
          columns={columns.concat(_actionColumn)}
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
  );
};

export default ExtraInfoDatatable;

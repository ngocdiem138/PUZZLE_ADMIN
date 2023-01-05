import "./list.scss";
import { DataGrid } from "@mui/x-data-grid";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import { jobColumn } from "../../datatablesource";
import { useMutation, useQuery } from "@tanstack/react-query";
import jobService from "../../services/jobService"
import { v4 as uuidv4 } from 'uuid'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import { Container, Alert, Button } from 'react-bootstrap';
import RemoveIcon from '@mui/icons-material/Remove';

const DatatableTemplate = () => {
  const [selectionModel, setSelectionModel] = useState([]);
  const { data, error, isError, isLoading, refetch } = useQuery({ queryKey: ['jobs'], queryFn: jobService.getAllJob })
  useEffect(() => {
    if (isError) {
      navigate('/login')
      window.alert("Session has expired")
      localStorage.clear()
    }
  }, [isError])
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
  const dataRow = data?.data?.data
  console.log(data?.data)


  const activeAllSelected = () => {
    const confirmBox = window.confirm(
      "Do you really want to active all selected job?"
    )
    if (confirmBox === true) {
      selectionModel.forEach((item) => {
        jobService.activeJob(item, true)
      })
      jobService.getAllJob().then((res)=>{setData(res.data.data)})
    }
  };

  const deActiveAllSelected = () => {
    const confirmBox = window.confirm(
      "Do you really want to active all selected job?"
    )
    if (confirmBox === true) {
      selectionModel.forEach((item) => {
        jobService.activeJob(item, false)
      })
      jobService.getAllJob().then((res)=>{setData(res.data.data)})
    }
  };

  const activeJobMutation = useMutation({
    mutationFn: (id) => jobService.activeJob(id, true), mutationKey: `active-job-${uuidv4()}`,
    refetchQueries: [{ query: 'jobs' }]
  })

  const deactivateJobMutation = useMutation({ mutationFn: (id) => jobService.activeJob(id, false), mutationKey: `deactivate-job-${uuidv4()}`, refetchQueries: [{ query: 'jobs' }] })

  const handleActiveJob = async (event, id, value) => {
    event.stopPropagation()
    if (value)
      await activeJobMutation.mutate(id)
    else
      await deactivateJobMutation.mutate(id)
    refetch()
  };

  const actionColumn = (handleAction) => [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="viewButton"
              onClick={(event) => handleAction(event, params.row.id, true)}
            >
              Active
            </div>
            <div
              className="deleteButton"
              onClick={(event) => handleAction(event, params.row.id, false)}
            >
              Deactivate
            </div>
          </div>
        );
      },
    },
  ];

  const _actionColumn = actionColumn(handleActiveJob)

  return (
    <div className="datatable">
      <div className="datatableTitle">
        List All Job
      </div>
      {isLoading ?
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
        :
        <DataGrid
          className="datagrid"
          rows={dataRow}
          columns={jobColumn.concat(_actionColumn)}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          onSelectionModelChange={setSelectionModel}
          selectionModel={selectionModel}
        />}
      {selectionModel.length > 0 ? <Button className="btn" style={{ padding: "2vh 4vh", "marginTop": "2vh", background: "green", color: "white", fontSize: "20px" }} type="button" onClick={activeAllSelected}>
        <OfflinePinIcon /> Active all selected rows
      </Button> : null}

      {selectionModel.length > 0 ? <Button className="btn" style={{ padding: "2vh 4vh", "marginTop": "2vh", background: "red", color: "white", fontSize: "20px" }} type="button" onClick={deActiveAllSelected}>
        <RemoveIcon /> Deactive all selected rows
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
      {/* Same as */}
      <ToastContainer />
    </div>
  );
};

export default DatatableTemplate;

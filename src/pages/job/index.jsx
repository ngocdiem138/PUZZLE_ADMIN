import "./list.scss";
import { DataGrid } from "@mui/x-data-grid";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import { jobColumn } from "../../datatablesource";
import { useMutation, useQuery } from "@tanstack/react-query";
import jobService from "../../services/jobService"
import {v4 as uuidv4} from 'uuid'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DatatableTemplate = () => {
  const {data, error, isError, isLoading, refetch } = useQuery({queryKey: ['jobs'], queryFn: jobService.getAllJob }) 
  const dataRow = data?.data?.data
  console.log(data?.data)
  const activeJobMutation =  useMutation({mutationFn: (id) => jobService.activeJob(id, true), mutationKey: `active-job-${uuidv4()}`,
  refetchQueries: [{ query: 'jobs'}]})
  
  const deactivateJobMutation =  useMutation({mutationFn: (id) => jobService.activeJob(id, false), mutationKey: `deactivate-job-${uuidv4()}`, refetchQueries: [{ query: 'jobs'}]})
  
  const handleActiveJob = async (event, id, value) => {
    event.stopPropagation()
    if(value)
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
        <Link to='new' className="link">
          Add New
        </Link>
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
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />}
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

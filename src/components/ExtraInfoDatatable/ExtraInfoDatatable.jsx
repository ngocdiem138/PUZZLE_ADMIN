import "./ExtraInfoDatatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import { useState } from "react";

const ExtraInfoDatatable = ({dataRows, columns, deleteMutation, actionColumn=[]}) => {
  const [data, setData] = useState(dataRows);

  console.log(columns);

  const handleDelete = async (event, id) => {
    event.stopPropagation()
    setData(data.filter((item) => item.id !== id));
    await deleteMutation.mutate(id)
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
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />}
    </div>
  );
};

export default ExtraInfoDatatable;

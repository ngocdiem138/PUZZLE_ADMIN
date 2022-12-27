import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import accountService from "../../services/accountService";
import companyService from "../../services/companyService";
import './JobDatatable.scss'

export default function CompanyDatatable() {

  const {data: users, error, isError, isLoading } = useQuery({queryKey: ['jobs'], queryFn: companyService.getAllCompany}) 
  const data = users?.data?.data
  console.log(data)
  
  

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
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
    { field: "name", headerName: "Name", width: 140 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "website", headerName: "website", width: 150 },
    { field: "createdEmployerId", headerName: "createdEmployerId", width: 150 },
    { field: "jobPostIds", headerName: "jobPostIds", width: 150 },
    { field: "active", headerName: "active", width: 150 },
    
  ];

  
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Company List
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <div style={{ height: 600, width: '100%' }}>
        {isLoading ? <div>Đang tải</div> : 
        <DataGrid
        rows={data}
        columns={columns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />}
      
    </div>
    </div>
  );
}

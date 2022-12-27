import { Link } from "react-router-dom";

export const skillActionColumn = (handleDelete) => [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={"/skills/"+params.row.id} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={(event) => handleDelete(event, params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];


export const companyActionColumn = (handleDelete) => [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={"/company/"+params.row.id} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={(event) => handleDelete(event, params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
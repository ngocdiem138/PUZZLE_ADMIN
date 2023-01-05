import "./table.scss";
import TablePagination from "@mui/material/TablePagination/TablePagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import statisticService from "../../services/statisticService";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authService from "../../services/authService";

const List = () => {


  const onLogout = async () => {
    localStorage.removeItem('login')
    navigate('/login')
    const res = await authService.logout()
    console.log('logout', res);
  }

  const Message = styled.div`
  color: ${props => (props.success ? 'green' : 'red')};
`
  const [notification, setNotification] = useState({ content: "", type: "" })

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [rows, setRows] = useState([]);

  const token = localStorage.getItem("login");

  useEffect(() => {
    if (token) {
      statisticService
        .getAllTransactions()
        .then((res) => {
          if (res.data.errCode == "403") {
            setNotification({ content: <>Session expire. Click <a href='/login'>here</a> to login again</>, type: "error" })
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
            const sortByTime = res.data.data.sort((date1, date2) => date1.payTime - date2.payTime);
            console.log(sortByTime)
            setRows(sortByTime)
          }
        });
    }
  }, []);

  return (
    <>
      <Message success>{notification.content}</Message>
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
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Tracking ID</TableCell>
              <TableCell className="tableCell">Product</TableCell>
              <TableCell className="tableCell">Customer</TableCell>
              <TableCell className="tableCell">Date</TableCell>
              <TableCell className="tableCell">Amount</TableCell>
              <TableCell className="tableCell">Payment Method</TableCell>
              <TableCell className="tableCell">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell className="tableCell">{row.transactionCode}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    {row.serviceType}
                  </div>
                </TableCell>
                <TableCell className="tableCell">{row.email}</TableCell>
                <TableCell className="tableCell">{row.payTime}</TableCell>
                <TableCell className="tableCell">{row.price}</TableCell>
                <TableCell className="tableCell">{row.paymentMethod}</TableCell>
                <TableCell className="tableCell">
                  <span className={row.status == 'COMPLETED' ? 'status Approved' : 'status Pending'}>{row.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={rows.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      />
    </>
  );
};

export default List;

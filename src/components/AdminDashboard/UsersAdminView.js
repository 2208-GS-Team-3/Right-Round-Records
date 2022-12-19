import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { useDispatch, useSelector } from "react-redux";
import { Button, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { setUserList } from "../../store/adminUserListSlice";
import axios from "axios";

export default function UsersAdminView() {
  const users = useSelector((state) => state.adminUserList.users);

  const dispatch = useDispatch();

  const navigate = useNavigate()

  const navUserAdd = () => navigate("./add")
  const navUserEdit = (user) => navigate(`./${user}`)

  const handleSearch = (event) => {
    console.log("not searching yet...");
  };

  const getUsers = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const tokenData = {
        headers: {
          authorization: token,
        },
      };

      const users = await axios.get(`/api/user/userlist`, tokenData);
      dispatch(setUserList(users.data));
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
getUsers()
  }, [])
  

  return (
    <Paper>
      <Title>Users</Title>
      <Container
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "30px",
        }}
      >
        <TextField
          id="search-bar"
          className="text"
          onChange={handleSearch}
          label="Search for user"
          variant="outlined"
          placeholder="Search..."
          size="small"
          style={{ width: "400px" }}
        />
        <Button
          variant="contained"
          style={{ width: "400px" }}
          onClick={navUserAdd}
        >
          Add User
        </Button>
      </Container>

      <div style={{ overflowX: "auto", height: "550px" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Birth Date</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNum}</TableCell>
                <TableCell>{user.birthday.split('T')[0]}</TableCell>
                <TableCell>
                  <Button size="small" value={user.id} onClick={navUserEdit}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
}

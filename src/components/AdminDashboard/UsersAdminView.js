import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { setUserList } from "../../store/adminUserListSlice";
import axios from "axios";

export default function UsersAdminView() {
  const users = useSelector((state) => state.adminUserList.users);
  const [searchUser, setSearchUser] = useState();
  const [searchFilter, setSearchFilter] = useState();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const navUserAdd = () => navigate("./add");
  const navUserEdit = (event) => navigate(`./${event.target.value}`);

  const handleSearchUser = (event) => {
    setSearchUser(
      event.target.innerHTML || event.target.innerText || event.target.value
    );
  };

  useEffect(() => {
    setSearchFilter(
      users.filter((user) => {
        return searchUser
          ? user.username?.trim()?.toLowerCase()?.includes(searchUser?.trim()?.toLowerCase()) ||
              user.userName?.trim()?.includes(
                searchUser?.trim()?.split("|")[0]?.toLowerCase()
              ) ||
              user.email?.toLowerCase()?.includes(searchUser?.trim()?.toLowerCase()) ||
              user.email?.includes(searchUser?.split("|")[1]?.trim()?.toLowerCase())
          : user.username !== searchUser;
      })
    );
  }, [searchUser, users]);

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
    getUsers();
  }, []);

  return (
    <Container
      style={{
        padding: "3%",
        backgroundColor: "white",
        borderRadius: "5px",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h5" component="h5">
        Users
      </Typography>
      {/* <Title>Users</Title> */}
      <Container
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          gap: "20vw",
          padding: '3%'
        }}
      >
        <Autocomplete
          fullWidth
          freeSolo
          id="product-search"
          disableClearable
          onChange={handleSearchUser}
          options={users.map((option) => {
            return `${option.username} | ${option.email}`;
          })}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              onChange={handleSearchUser}
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
        <Button
          variant="contained"
          style={{ width: "400px", backgroundColor: "black", color: "white" }}
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
            {searchFilter?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNum}</TableCell>
                <TableCell>{user.birthday.split("T")[0]}</TableCell>
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
    </Container>
  );
}

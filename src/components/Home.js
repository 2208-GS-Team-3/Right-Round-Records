import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../store/userSlice";
import Container from "@mui/material/Container";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logout = () => {
    window.localStorage.removeItem("token");
    dispatch(resetUser());
  };

  return (
    <Container>
      <div>
        <h1>Home</h1>
        <div>
          <p>Welcome {user.username}!!</p>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </Container>
  );
};

export default Home;

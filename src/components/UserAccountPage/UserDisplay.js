import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import GoogleLocation from "../CreateUserPage/UserGoogleLocation";
import { setUserToCreate } from "../../store/createUserSlice";
import { setUser } from "../../store/userSlice";

const UserAccountPage = () => {
  const userToCreate = useSelector((state) => state.userToCreate.userToCreate);
  const currentUser = useSelector((state) => state.user.user);
  const [validity, setValidity] = useState({});
  const [editing, setEditing] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdittable = (e) => {
    const target = e.target;
    const value = true;
    const name = target.name;
    setEditing({ ...editing, [name]: value });
  };
  const handleUserStateChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    dispatch(setUserToCreate({ ...userToCreate, [name]: value }));
  };

  const handleSubmit = async (event) => {
    if (!Object.values(validity).includes(true)) {
      try {
        event.preventDefault();
        const token = window.localStorage.getItem("token");
        const tokenData = {
          headers: {
            authorization: token,
          },
        };
        const { data: created } = await axios.put(
          "/api/user",
          userToCreate,
          tokenData
        );
        dispatch(setUser(created));
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const validateUsername = async (event) => {
    const currentUsername = event.target.value;
    if (currentUser.username.toLowerCase() === currentUsername.toLowerCase()) {
      return setValidity({ ...validity, username: false });
    }
    try {
      const response = await axios.post("/api/user/usernameAuth", {
        currentUsername,
      });

      const usernameValid = response.status !== 200;

      setValidity({ ...validity, username: usernameValid });
    } catch (error) {
      setValidity({ ...validity, username: true });
    }
  };

  const validateEmail = async (event) => {
    const currentEmail = event.target.value;
    if (currentUser.email.toLowerCase() === currentEmail.toLowerCase()) {
      return setValidity({ ...validity, email: false });
    }
    try {
      const response = await axios.post("/api/user/userEmailAuth", {
        currentEmail,
      });

      const emailValid = response.status !== 200;

      setValidity({ ...validity, email: emailValid });
    } catch (error) {
      setValidity({ ...validity, email: true });
    }
  };

  useEffect(() => {
    dispatch(setUserToCreate({ ...currentUser }));
  }, [currentUser]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        placeSelf: "center",
        padding: "30px",
        marginTop: "30px",
        borderRadius: "5px",
      }}
    >
      <Typography
        variant="h4"
        component="h4"
        sx={{ placeSelf: "center", padding: "30px" }}
      >
        Your Account Information
      </Typography>
      <Form className="form" sx={{ placeSelf: "center", padding: "30px" }}>
        <div className="userForm">
          <FormControl error={validity.username} required>
            <InputLabel shrink htmlFor="username-input">
              Your Username
            </InputLabel>
            <Input
              disabled={!editing?.username}
              onClick={handleEdittable}
              value={userToCreate?.username || ""}
              name="username"
              id="username-input"
              aria-describedby="username-helper-text"
              onChange={(event) => {
                handleUserStateChange(event);
                validateUsername(event);
              }}
            />
            <FormHelperText id="username-helper-text">
              {validity.username
                ? "Your username must be unique."
                : "Other users will see this username."}
            </FormHelperText>
          </FormControl>

          <FormControl required>
            <InputLabel shrink htmlFor="password-input">
              Your Password
            </InputLabel>
            <Input
              disabled={!editing?.password}
              onClick={handleEdittable}
              defaultValue={"**********"}
              name="password"
              id="password-input"
              aria-describedby="password-helper-text"
              onChange={handleUserStateChange}
            />
            <FormHelperText id="password-helper-text">
              Your password should include a number.
            </FormHelperText>
          </FormControl>

          <FormControl required>
            <InputLabel shrink htmlFor="firstName-input">
              First Name
            </InputLabel>
            <Input
              disabled={!editing?.firstName}
              onClick={handleEdittable}
              value={userToCreate?.firstName || ""}
              name="firstName"
              id="firstName-input"
              aria-describedby="firstName-helper-text"
              onChange={handleUserStateChange}
            />
            <FormHelperText id="firstName-helper-text">
              Please enter your first name only.
            </FormHelperText>
          </FormControl>

          <FormControl required>
            <InputLabel shrink htmlFor="lastName-input">
              Last Name
            </InputLabel>
            <Input
              disabled={!editing?.lastName}
              onClick={handleEdittable}
              value={userToCreate?.lastName || ""}
              name="lastName"
              id="lastName-input"
              aria-describedby="lastName-helper-text"
              onChange={handleUserStateChange}
            />
            <FormHelperText id="lastName-helper-text">
              Please enter your last name only.
            </FormHelperText>
          </FormControl>
          <FormControl error={validity.email} required>
            <InputLabel shrink htmlFor="email-input">
              Your Email
            </InputLabel>
            <Input
              disabled={!editing?.email}
              onClick={handleEdittable}
              value={userToCreate?.email || ""}
              name="email"
              id="email-input"
              aria-describedby="email-helper-text"
              onChange={(event) => {
                handleUserStateChange(event);
                validateEmail(event);
              }}
            />
            <FormHelperText id="email-helper-text">
              {validity.email
                ? "This email address has already been used."
                : "Please enter your email address."}
            </FormHelperText>
          </FormControl>

          <FormControl required>
            <InputLabel shrink htmlFor="phoneNum-input">
              Your Phone Number
            </InputLabel>
            <Input
              disabled={!editing?.phoneNum}
              onClick={handleEdittable}
              value={userToCreate?.phoneNum || ""}
              name="phoneNum"
              id="phoneNum-input"
              aria-describedby="phoneNum-helper-text"
              onChange={handleUserStateChange}
            />
            <FormHelperText id="phoneNum-helper-text">
              Please enter your phone number with area code.
            </FormHelperText>
          </FormControl>

          <FormControl required>
            <InputLabel shrink htmlFor="avatar-input">
              Your Avatar
            </InputLabel>
            <Input
              disabled={!editing?.avatarUrl}
              onClick={handleEdittable}
              value={userToCreate?.avatarUrl || ""}
              name="avatarUrl"
              id="avatar-input"
              aria-describedby="avatar-helper-text"
              onChange={handleUserStateChange}
            />
            <FormHelperText id="avatar-helper-text">
              Please provide an avatar image URL for your avatar.
            </FormHelperText>
          </FormControl>
          <FormControl required>
            <InputLabel shrink htmlFor="birthday-input">
              Birthday
            </InputLabel>
            <Input
              disabled={!editing?.birthday}
              onClick={handleEdittable}
              value={userToCreate?.birthday?.split("T")[0] || ""}
              type="date"
              name="birthday"
              id="birthday-input"
              aria-describedby="birthday-helper-text"
              onChange={handleUserStateChange}
            />
            <FormHelperText id="birthday-helper-text">
              Please provide your birth date.
            </FormHelperText>
          </FormControl>

          <FormControl required>
            <GoogleLocation key={"GoogleLocation"} />
            <FormHelperText id="address-helper-text">
              Please provide your current address.
            </FormHelperText>
          </FormControl>
        </div>
        <Button
          size="large"
          sx={{ width: "20vw", height: "10vh" }}
          onClick={handleSubmit}
          variant="contained"
        >
          <Typography
            sx={{
              display: { xs: "none", md: "flex" },
              fontWeight: 500,
              letterSpacing: ".2rem",
            }}
            variant={"h4"}
          >
            Submit
          </Typography>
        </Button>
      </Form>
    </Container>
  );
};

export default UserAccountPage;

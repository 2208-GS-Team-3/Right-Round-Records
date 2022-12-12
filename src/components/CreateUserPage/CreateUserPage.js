import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import "./createUserPage.css";
import GoogleLocation from "./GoogleLocation";
import { setUserToCreate } from "../../store/createUserSlice";
import { setUser } from "../../store/userSlice";

const CreateUserPage = () => {
  const userToCreate = useSelector((state) => state.userToCreate.userToCreate);
  // { username, password, firstName, lastName, email, phoneNum, shippingAddress, billingAddress, birthday, avatarUrl }
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserStateChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    dispatch(setUserToCreate({ ...userToCreate, [name]: value}));
    console.log(userToCreate);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data: created } = await axios.post("/api/user", userToCreate);
    dispatch(setUser(created));
    navigate("/");
  };

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", placeSelf: "center" }}
    >
      <Typography sx={{ placeSelf: "center" }} variant={"h2"}>
        Create Your Account
      </Typography>
      <Form className="form">
        <div className="userForm">
          <FormControl required>
            <InputLabel htmlFor="username-input">Your Username</InputLabel>
            <Input
              name="username"
              id="username-input"
              aria-describedby="username-helper-text"
              onChange={handleUserStateChange}
            />
            <FormHelperText id="username-helper-text">
              Your Username must be unique.
            </FormHelperText>
          </FormControl>

          <FormControl required>
            <InputLabel htmlFor="password-input">Your Password</InputLabel>
            <Input
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
            <InputLabel htmlFor="firstName-input">First Name</InputLabel>
            <Input
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
            <InputLabel htmlFor="lastName-input">Last Name</InputLabel>
            <Input
              name="lastName"
              id="lastName-input"
              aria-describedby="lastName-helper-text"
              onChange={handleUserStateChange}
            />
            <FormHelperText id="lastName-helper-text">
              Please enter your last name only.
            </FormHelperText>
          </FormControl>

          <FormControl required>
            <InputLabel htmlFor="email-input">Your Email</InputLabel>
            <Input
              name="email"
              id="email-input"
              aria-describedby="email-helper-text"
              onChange={handleUserStateChange}
            />
            <FormHelperText id="email-helper-text">
              Please enter your email address.
            </FormHelperText>
          </FormControl>

          <FormControl required>
            <InputLabel htmlFor="phoneNum-input">Your Phone Number</InputLabel>
            <Input
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
            <InputLabel htmlFor="avatar-input">Your Avatar</InputLabel>
            <Input
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
            <GoogleLocation />
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

export default CreateUserPage;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetUser } from '../store/userSlice';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import RRRAppBar from './AppBar';
import { Outlet } from 'react-router-dom';

const Home = () => {
    const { user } = useSelector(state => state.user);

    return (
            <div>
                <p>Welcome {user.username ?? "Guest"}!!</p>
            </div>
    );
};

export default Home;

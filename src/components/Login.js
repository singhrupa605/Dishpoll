import {
  Box,
  Button,
  Stack,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { getUsers } from "./Data";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import food from "../food.jpg";

const Login = () => {
  const style = {
    backgroundImage: `url(${food})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    position: "absolute",
    height: "100vh",
    width: "100%",
  };

  const [userData, setUserData] = useState({ username: " ", password: "" });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const login = async () => {
    if ((await validateUser(userData)) === true) {
      enqueueSnackbar("Logged in successfully", { variant: "success" });
      localStorage.setItem("username", userData.username);
      navigate("/home");
    }
  };

  const validateUser = async (userData) => {
    const users = await getUsers();
    if (!userData.username) {
      enqueueSnackbar("Username is a required field", { variant: "warning" });
      return;
    }
    if (!userData.password) {
      enqueueSnackbar("Password is a required field", { variant: "warning" });
      return;
    }
    const user = users.length
      ? users.filter(
          (user) =>
            user.username === userData.username &&
            userData.password === user.password
        )
      : [];
    if (user.length) {
      return true;
    } else {
      enqueueSnackbar("Sorry you are not an authorized user", {
        variant: "error",
      });
      return false;
    }
  };

  return (
    <Box sx={style}>
      <Box className="login-logo">
        {" "}
        <img
          src={require("../logo-no-background.png")}
          alt="logo.png"
        ></img>{" "}
      </Box>

      <Dialog open={true}>
        <DialogTitle sx={{ fontWeight: "600", alignSelf: "center" }}>
          Login to Dishpoll
        </DialogTitle>
        <DialogContent className="login-content">
          <Stack spacing={3} sx={{ padding: "1rem" }}>
            <TextField
              required
              label="Username"
              onChange={(event) =>
                setUserData({ ...userData, username: event.target.value })
              }
            />
            <TextField
              required
              label="Password"
              onChange={(event) =>
                setUserData({ ...userData, password: event.target.value })
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={login}>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Login;

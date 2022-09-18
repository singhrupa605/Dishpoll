import { Box, Stack, Typography, Button } from "@mui/material";
import "./Header.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header({ username }) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Navbar expand="lg" variant="light" className="header">
      <Container>
        <Box className="logo">
          {" "}
          <img
            src={require("../logo-no-background.png")}
            alt="logo.png"
          ></img>{" "}
        </Box>
        {username ? (
          <Box className="rightbox">
            <Button variant="contained" onClick={logout}>
              Logout
            </Button>

            <Stack className="stack">
              <AccountCircleIcon fontSize="large" />
              <Typography sx={{ padding: "0.2em" }} variant="p">
                {username}
              </Typography>
            </Stack>
          </Box>
        ) : (
          <Link to="/home" className="header-login-link">
            {" "}
            <Button variant="contained">Login</Button>
          </Link>
        )}
      </Container>
    </Navbar>
  );
}

export default Header;

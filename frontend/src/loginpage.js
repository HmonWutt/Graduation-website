import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import Box from "@mui/material/Box";
import axios from "axios";
import Rocket from "./rocketlauncher.js";
//import ToggleButton from "./toggle";
//import Words from "./words";

const Loginpage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const rocket = useRef();
  const navigate = useNavigate();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  function submit(e) {
    axios
      .post("/login", {
        username: username,
        password: password,
      })
      .then(function (response) {
        response.status === 200 &&
          setTimeout(() => {
            navigate("/mainpage/" + username);
          }, 1000);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    axios.get("/testme").then((data) => console.log(data.result));
  }, []);
  return (
    <section
      id="login"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      <Input
        sx={{ margin: "0" }}
        size="small"
        id="username"
        variant="outlined"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <Input
        sx={{ margin: "0" }}
        size="small"
        id="password"
        variant="outlined"
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <Rocket ref={rocket} />
      <Button
        onClick={() => {
          submit();
          rocket.current.launch();
        }}
      >
        Submit
      </Button>
    </section>
  );
};
export default Loginpage;

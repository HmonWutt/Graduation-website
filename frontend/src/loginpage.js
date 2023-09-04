import React from "react";
import { useState, useEffect } from "react";
import Logout from "./logout";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from "axios";
import Rocket from "./rocketlauncher.js";
import ToggleButton from "./toggle";
import Words from "./words";

const Loginpage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  console.log(username, password);
  const fetchlala = (e) => {
    axios.get("/lala").then((data) => console.log(data));
    return e.target.removeEventListener("click", fetchlala);
  };
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
        console.log(response);
      })
      .catch((err) => console.log(err));
    return e.target.removeEventListener("click", submit);
  }
  {
    useEffect(() => {
      axios.get("/testme").then((data) => console.log(data.result));
    }, []);
  }
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      <h3 id="welcome" style={{ margin: "2rem", marginTop: "4rem" }}>
        Welcome to ....
      </h3>
      <Words />
      <ToggleButton />
      <Box sx={{ display: "flex", flexWrap: "wrap" }}></Box>
      <div>
        {" "}
        <Input
          sx={{ margin: "0" }}
          size="small"
          id="username"
          variant="outlined"
          type="text"
          placeholder="Username"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <Input
          sx={{ margin: "0" }}
          size="small"
          id="password"
          variant="outlined"
          type="text"
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
      </div>
      <div id="rocket-container">
        <Rocket />
      </div>
      <Button
        variant="primary"
        onClick={(e) => {
          submit(e);
        }}
      >
        Submit
      </Button>
      <Button variant="warning" onClick={(e) => fetchlala(e)}>
        Test
      </Button>{" "}
      <Logout />
    </section>
  );
};
export default Loginpage;

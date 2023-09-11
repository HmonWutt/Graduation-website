import React from "react";
import { useState, useEffect, useRef, createContext } from "react";
import { useNavigate, Outlet } from "react-router-dom";
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

export const Context = createContext("");
const Loginpage = () => {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [loggedin, setLoggedin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const rocket = useRef();
  const usernameref = useRef();
  const passwordref = useRef();
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
            setLoggedin(true);
            navigate("/mainpage/" + username);
          }, 1000);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    axios.get("/testme").then((data) => console.log(data.result));
  }, []);

  return (
    <>
      {loggedin === false && (
        <section id="login">
          <div style={{ marginTop: "5%" }} id="invite">
            You are cordially invited to my graduation party. Please login to
            RSVP.
          </div>
          <Input
            ref={usernameref}
            sx={{ margin: "0" }}
            style={{ marginTop: "3rem" }}
            size="small"
            id="username"
            variant="outlined"
            type="text"
            className="input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            ref={passwordref}
            sx={{ margin: "0" }}
            className="input "
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
                  style={{ color: "grey" }}
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
            id="submit"
            onClick={() => {
              submit();
              rocket.current.launch();
            }}
          >
            Submit
          </Button>
        </section>
      )}
      <Outlet context={(username, loggedin)} />
    </>
  );
};
export default Loginpage;

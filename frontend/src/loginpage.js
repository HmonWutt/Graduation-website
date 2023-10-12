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
import "./index.css";

const Loginpage = () => {
  const [loggedin, setLoggedin] = useState(false);
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
        response.status === 200 && rocket.current.launch();
        setTimeout(() => {
          setLoggedin(true);

          navigate("/mainpage/" + username);
        }, 1000);
      })
      .catch((err) => alert("Could not login, please try again."));
  }
  // useEffect(() => {
  //   axios.get("/testme").then((data) => {
  //     const { username, password } =
  //       data.data.rows[Math.floor(Math.random() * data.data.rows.length)];
  //     setUsername(username);
  //     setPassword(password);
  //     console.log(username, password);
  //   });
  // }, []);

  return (
    <>
      {loggedin === false && (
        <section id="login" style={{ paddingBottom: "2rem" }}>
          <div
            id="invite"
            className="invite"
            style={{
              color: "purple",
            }}
          >
            You are cordially invited to my graduation party.
          </div>
          <div
            className="invite"
            style={{
              color: "purple",
            }}
          >
            {" "}
            Please login to RSVP.
          </div>
          <Input
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
            variant="warning"
            onClick={() => {
              submit();
            }}
          >
            Log in
          </Button>
        </section>
      )}
    </>
  );
};
export default Loginpage;

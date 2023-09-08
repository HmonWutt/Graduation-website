import React from "react";
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
// import Button from "react-bootstrap/Button";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Input from "@mui/material/Input";
// import IconButton from "@mui/material/IconButton";
// import InputAdornment from "@mui/material/InputAdornment";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import Box from "@mui/material/Box";
import axios from "axios";
//import Rocket from "./rocketlauncher.js";
//import ToggleButton from "./toggle";
//import Words from "./words";

const Loginpage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const fetchlala = (e) => {
    axios.get("/lala").then((data) => console.log(data));
    return e.target.removeEventListener("click", fetchlala);
  };
  //const handleClickShowPassword = () => {
  //  setShowPassword(!showPassword);
  //};
  //const handleMouseDownPassword = (event) => {
  //  event.preventDefault();
  //};
  function submit(e) {
    axios
      .post("/login", {
        username: username,
        password: password,
      })
      .then(function (response) {
        response.status === 200 && navigate("/mainpage/" + username)
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    axios.get("/testme").then((data) => console.log(data.result));
  }, []);
      return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={submit}>Submit</button>
      <button onClick={fetchlala}>Test</button>
    </section>
  );
};
export default Loginpage;

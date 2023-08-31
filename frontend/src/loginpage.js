import React from "react";
import { useState, useEffect } from "react";
import Logout from "./logout";

import axios from "axios";

const Loginpage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  console.log(username, password);
  const fetchlala = () => {
    axios.get("/lala").then((data) => console.log(data));
  };
  const handleClickShowPassword = () => {
    setShowPassword(!setPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  function submit() {
    axios
      .post("/login", {
        username: username,
        password: password,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch((err) => console.log(err));
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
      <Logout />
    </section>
  );
};
export default Loginpage;

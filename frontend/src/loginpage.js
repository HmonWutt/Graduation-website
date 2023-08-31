import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";

const Loginpage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  console.log(username, password);
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
      });
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
      Hello
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
    </section>
  );
};
export default Loginpage;

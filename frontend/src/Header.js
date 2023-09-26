import { NavLink } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import ToggleButton from "./toggle";
import useScreenSize from "./resizer";
import { useEffect } from "react";

const Header = () => {
  const screenSize = useScreenSize();
  function logout() {
    axios
      .get("/logout")
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }

  // useEffect(() => {
  //   console.log(screenSize.screenHeight);
  //   const div = document.querySelector("#root");
  //   if (
  //     //screenSize.screenHeight < screenSize.screenWidth &&
  //     screenSize.screenHeight < 600
  //   ) {
  //     alert("Please use portrait mode!");
  //   }
  // }, [screenSize]);
  return (
    <>
      <NavLink
        id="nav"
        to="/"
        onClick={logout}
        style={{
          textDecoration: "none",
          top: "2%",
          left: "1%",
          position: "absolute",
          fontSize: "0.7rem",
        }}
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        <span
          className="roundthing"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Log out
        </span>
      </NavLink>
      <ToggleButton />
    </>
  );
};

export default Header;

import { NavLink } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import ToggleButton from "./toggle";

const Header = () => {
  function logout() {
    axios
      .get("/logout")
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }
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

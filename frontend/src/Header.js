import { NavLink } from "react-router-dom";
import axios from "axios";

const Header = () => {
  function logout() {
    axios
      .get("/logout")
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }
  return (
    <NavLink
      to="/"
      onClick={logout}
      className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? "active" : ""
      }
    >
      Log out
    </NavLink>
  );
};

export default Header;

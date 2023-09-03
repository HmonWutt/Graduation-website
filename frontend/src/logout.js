import axios from "axios";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
export default function Logout() {
  function logout() {
    axios
      .get("/logout")
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }
  return (
    <Button variant="primary" className="btn-primary" onClick={logout}>
      log out
    </Button>
  );
}

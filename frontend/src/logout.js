import axios from "axios";
export default function Logout() {
  function logout() {
    axios
      .get("/logout")
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }
  return <button onClick={logout}>log out</button>;
}

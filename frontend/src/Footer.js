import "./App.css";
const Footer = () => {
  return (
    <span id="footer">
      {" "}
      <i>
        Collaboration between{" "}
        <a
          href="https://github.com/HmonWutt"
          target="_blank"
          style={{ textDecoration: "none" }}
        >
          Hmon
        </a>{" "}
        and{" "}
        <a
          href="https://github.com/jocketocke"
          target="_blank"
          style={{ textDecoration: "none" }}
        >
          Joakim
        </a>
      </i>{" "}
      ❤️
    </span>
  );
};

export default Footer;

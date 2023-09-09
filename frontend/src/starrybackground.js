import { useEffect } from "react";
export default function Starrify() {
  function multipleBoxShadow(number) {
    let color = "white";

    let boxShadow = "";
    for (let i = 0; i < number; i++) {
      let top = Math.floor(Math.random() * (2000 - 1));
      let right = Math.floor(Math.random() * (2000 - 1));
      let size = 1;
      boxShadow += top + "px " + right + "px " + size + "px " + color + ",";
    }
    return boxShadow.slice(0, boxShadow.length - 1);
  }

  useEffect(() => {
    document.getElementById("star1").style.boxShadow = multipleBoxShadow(100);
    document.getElementById("star2").style.boxShadow = multipleBoxShadow(700);
    document.getElementById("star3").style.boxShadow = multipleBoxShadow(200);
  }, []);

  return (
    <>
      <span
        style={{
          width: "3px",
          height: "3px",
          borderRadius: "50%",
          background: "transparent",
          zIndex: 0,
          position: "absolute",
          left: "0",
          top: "0",
        }}
        className="star"
        id="star1"
      ></span>

      <span
        style={{
          width: "1px",
          height: "1px",
          background: "transparent",
          zIndex: 0,
          position: "absolute",
          left: "0",
          top: "0",
        }}
        className="star"
        id="star2"
      ></span>
      <span
        style={{
          width: "2px",
          height: "2px",
          background: "transparent",
          zIndex: 0,
          position: "absolute",
          left: "0",
          top: "0",
        }}
        className="star"
        id="star3"
      ></span>
    </>
  );
}

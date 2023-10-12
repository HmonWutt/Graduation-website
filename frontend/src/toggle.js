import "./index.css";

import { useState, useEffect } from "react";
import Starrify from "./starrybackground";

export default function ToggleButton() {
  const [day, setDay] = useState(false);

  useEffect(() => {
    Array.from(document.getElementsByClassName("input")).forEach(
      (each) => (each.style.color = day ? "black" : "white")
    );
    document.getElementById("root").style.background = day
      ? "radial-gradient(ellipse at bottom, #5ddefe 0%, aliceblue 100%)"
      : "radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)";
    document.getElementById("root").style.color = day ? "black" : "aliceblue";

    Array.from(document.getElementsByClassName("roundthing")).forEach(
      (each) => {
        each.style.backgroundColor = day
          ? "rgb(125,228,254)"
          : "rgb(31, 55, 99)";
        each.style.color = day ? "black" : "aliceblue";
      }
    );
    const day_night = document.getElementById("circle");

    day_night.innerText = day ? "🌞" : "🌛";
  });

  return (
    <>
      <div id="toggle-container">
        <span
          id="toggle-background"
          className="roundthing"
          style={{
            //backgroundColor: day ? "cornflowerblue" : "rgb(31, 55, 99)",
            justifyContent: day ? "flex-start" : "flex-end",
            filter: " drop-shadow(0px 0px 2px #ffffff)",
          }}
          onClick={() => setDay(!day)}
        >
          <span
            id="circle"
            onCopy={() => false}
            style={{
              backgroundColor: "transparent",
              filter: day
                ? "drop-shadow(0px 0px 6px #ffffff)"
                : "drop-shadow(0px 0px 2px #ffffff)",
            }}
          ></span>
        </span>
      </div>

      <div id="star-container"></div>
      {!day && <Starrify />}
    </>
  );
}

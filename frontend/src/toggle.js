import "./index.css";
import { day } from "./day";
import { night } from "./night";
import { useState, useEffect } from "react";
import Starrify from "./starrybackground";

export default function ToggleButton() {
  const [day, setDay] = useState(true);
  useEffect(() => {
    document.getElementById("root").style.background = day
      ? "radial-gradient(ellipse at bottom, #5ddefe 0%, aliceblue 100%)"
      : "radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)";
    document.getElementById("App").style.color = day ? "black" : "aliceblue";
    Array.from(document.getElementsByClassName("roundthing")).forEach(
      (each) => {
        each.style.backgroundColor = day ? "cornflowerblue" : "rgb(31, 55, 99)";
        each.style.color = day ? "yellow" : "aliceblue";
      }
    );
  });
  return (
    <>
      <div id="toggle-container">
        <span
          id="toggle-background"
          className="roundthing"
          style={{
            backgroundColor: day ? "cornflowerblue" : "rgb(31, 55, 99)",
            justifyContent: day ? "flex-start" : "flex-end",
          }}
          onClick={() => setDay(!day)}
        >
          <span
            id="circle"
            style={{
              backgroundColor: day ? "yellow" : "aliceblue",
            }}
          ></span>
        </span>
      </div>

      <div id="star-container"></div>
      {!day && <Starrify />}
    </>
  );
}

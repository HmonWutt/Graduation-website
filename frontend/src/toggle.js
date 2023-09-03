import "./index.css";
import { day } from "./day";
import { night } from "./night";
import { useState, useEffect } from "react";
export default function ToggleButton() {
  function bringToFront(target, nontarget) {
    console.log(target, nontarget);
    Array.from(target).map((x) => {
      console.log("each", x);
      x.classList.add(".hidden");
    });

    Array.from(nontarget).map((x) => {
      x.style.zIndex = 5;
    });
  }
  let target;

  let background;
  let circle;
  let circleLocation;
  let backgroundcolors;
  let circlecolors;
  let decoration;
  useEffect(() => {
    target = [
      document.getElementById("cloud-container"),
      document.getElementById("star-container"),
    ];
    console.log(target);
    // target[0].style.opacity = 1;
    //  target[1].style.opacity = 0;
    circleLocation = ["flex-start", "flex-end"];
    decoration = [
      document.getElementById("circle::before"),
      document.getElementById("circle::after"),
    ];
    backgroundcolors = ["cornflowerblue", "rgb(31, 55, 99)"];
    circlecolors = ["yellow", "aliceblue"];
    background = document.getElementById("toggle-background");
    background.style.justifyContent = "flex-start";
    background.style.backgroundColor = backgroundcolors[0];
    circle = document.getElementById("circle");
    circle.style.backgroundColor = circlecolors[0];
    console.log(target[0], target[1]);
    Array.from(target[0]).map((x) => {
      console.log("each", x);
      x.style.opacity = 1;
    });

    Array.from(target[1]).map((x) => {
      x.style.opacity = 0;
    });
  }, []);

  function toggle() {
    // console.log(target);
    let popped = target.pop();
    let poppedLocation = circleLocation.pop();
    let poppedBackgroundColor = backgroundcolors.pop();
    let poppedcirclecolor = circlecolors.pop();
    console.log(poppedLocation);
    bringToFront(popped, target[0]);

    background.style.justifyContent = poppedLocation;
    background.style.backgroundColor = poppedBackgroundColor;
    circle.style.backgroundColor = poppedcirclecolor;

    target = [popped, ...target];
    console.log(popped, target);
    circleLocation = [poppedLocation, ...circleLocation];
    backgroundcolors = [poppedBackgroundColor, ...backgroundcolors];
    circlecolors = [poppedcirclecolor, ...circlecolors];
  }

  return (
    <>
      <div id="toggle-container">
        <span id="day" className="">
          {day}
        </span>
        <span id="toggle-background" onClick={toggle}>
          <span id="circle"></span>
        </span>
        <span id="night" className=" ">
          {night}
        </span>{" "}
      </div>
      <div id="cloud-container">
        <span className="cloud" id="cloud1"></span>
        <span className="cloud" id="cloud2"></span>
        <span className="cloud" id="cloud3"></span>
      </div>
      <div id="star-container"></div>
    </>
  );
}

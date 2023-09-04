import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { duration } from "@mui/material";
const gsap = window.gsap;
export default function Words() {
  const [show, setShow] = useState(null);
  const letters = ["W", "E", "L", "C", "O", "M", "E"];
  let taken = new Set();
  function randomgenerator() {
    console.log(origin);
    while (taken.size < letters.length) {
      taken.add(Math.floor(Math.random() * letters.length));
      // }
    }

    return taken;
  }
  function makeletters() {
    let letterlist = [];
    Array.from(taken).map((each) => {
      console.log(each);
      letterlist.push(letters[each]);
    });
    console.log("letterlist", letterlist);
    let newSpan;

    letterlist.map((each, index) => {
      newSpan = document.createElement("h3");
      newSpan.id = "letter" + index.toString();
      newSpan.textContent = each;
      newSpan.className = "letter";

      document.getElementById("letters").appendChild(newSpan);
    });
  }
  function getRandomBinary() {
    const plusorminus = [-100, 100];
    const randomDecimal = Math.random();

    const result = Math.round(randomDecimal);

    return plusorminus[result];
  }

  function placeletters() {
    const letters = document.getElementsByClassName("letter");
    console.log("letters", letters);
    let x = 20;
    Array.from(letters).map((letter, index) => {
      gsap.from(
        letter,
        {
          x: (-(Math.random() + index) * getRandomBinary()).toString(),
          y: (-(Math.random() + index) * getRandomBinary()).toString(),
          duration: 2.5,
          ease: "power1.in",
        }
        // { x: (index + x) * 50, y: -400, duration: 2 }
      );
    });
  }

  useEffect(() => {
    randomgenerator();
    makeletters();
    placeletters();
  });
  return (
    <>
      <div id="letters"></div>
      <button
        onClick={() => {
          setShow(true);
          placeletters();
        }}
      >
        generate
      </button>
    </>
  );
}

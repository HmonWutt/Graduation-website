import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { duration } from "@mui/material";

const gsap = window.gsap;
export default function Words() {
  const letters = ["W", "E", "L", "C", "O", "M", "E"];
  let taken = new Set();
  function randomgenerator() {
    while (taken.size < letters.length) {
      taken.add(Math.floor(Math.random() * letters.length));
    }

    return taken;
  }
  let letterlist = [];
  function makeletters() {
    Array.from(taken).map((each, index) => {
      letterlist.push({
        letter: letters[each],
        spanid: "letter" + index.toString(),
      });
    });

    let newSpan;

    letterlist.map((each, index) => {
      newSpan = document.createElement("h3");
      newSpan.id = "letter" + index.toString();
      newSpan.textContent = each.letter;
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

    Array.from(letters).map((letter, index) => {
      gsap.from(
        letter,
        {
          x: -(Math.random() + index) * getRandomBinary().toString(),
          y: -(Math.random() + index) * getRandomBinary().toString(),
          duration: 2,
          ease: "power1.in",
        }
        //{ x: x, y: 157.21875 }
      );
    });
  }
  let finalposition = [];
  let coordinates = [];
  Array.from(letters).map((letter, index) =>
    finalposition.push({ letter, index })
  );

  useEffect(() => {
    randomgenerator();
    makeletters();
    placeletters();
    let i = 0;
    let wrongposition = [];

    while (i < finalposition.length) {
      console.log("spanid", letterlist[i].spanid);
      coordinates.push({
        spanid: letterlist[i].spanid,
        x: gsap.getProperty("#" + letterlist[i].spanid, "x"),
        y: gsap.getProperty("#" + letterlist[i].spanid, "y"),
      });
      if (finalposition[i].letter !== letterlist[i].letter) {
        wrongposition.push({
          spanid: "#" + letterlist[i].spanid,
          letter: finalposition[i].letter,
        });
      }

      i++;
    }
    console.log("wrong position", wrongposition);
    setTimeout(() => {
      Array.from(wrongposition).map((each) => {
        gsap.getProperty("#id", "x");
        gsap.to(each.spanid, 0.1, { y: "-=20", yoyo: true, repeat: 3 });
        //gsap.to("#" + each, 0.1, { y: "+=20", yoyo: true, repeat: 2 });
      });
    }, 3000);

    setTimeout(() => {
      Array.from(wrongposition).map((each) => {
        //gsap.to("#" + each, 0.1, { y: "-=20", yoyo: true, repeat: 3 });
        gsap.to(each.spanid, 0.1, { y: "-20", yoyo: false, repeat: 0 });
      });
    }, 4000);
    ///////////////////////
    console.log("coordinates", coordinates);
    // setTimeout(() => {
    //   let ii = 0;
    //   while (ii < wrongposition.length) {
    //     gsap.to(wrongposition[ii].spanid, {
    //       x: 136 + coordinates[ii].x,
    //       y: coordinates[ii].y,
    //       duration: 0.5,
    //     });
    //     ii++;
    //   }
    // }, 4500);
  }, []);

  return (
    <>
      <div id="letters"></div>
      <button onClick={() => {}}>generate</button>
    </>
  );
}

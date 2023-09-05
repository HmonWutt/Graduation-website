import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { duration } from "@mui/material";

const gsap = window.gsap;

export default function Words() {
  const letters = ["W", "E", "L", "C", "O", "M", "E"];
  const letterstring = "WELCOME";
  const distancefrommiddle = [-100, -70, -40, -10, 20, 50, 80];
  const original = [
    { index: 0, letter: "W", spanid: "letterW" },
    { index: 1, letter: "E", spanid: "letterE1" },
    { index: 2, letter: "L", spanid: "letterL" },
    { index: 3, letter: "C", spanid: "letterC" },
    { index: 4, letter: "O", spanid: "letterO" },
    { index: 5, letter: "M", spanid: "letterM" },
    { index: 6, letter: "E", spanid: "letterE2" },
  ];
  let taken = new Set();
  const middleX = getMiddleX();
  let scrambledlist = [];
  let wrongposition = [];
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function getMiddleX() {
    const viewportWidth =
      window.innerWidth || document.documentElement.clientWidth;
    const middleX = viewportWidth / 2;
    return middleX;
  }

  function randomgenerator() {
    while (taken.size < letters.length) {
      taken.add(Math.floor(Math.random() * letters.length));
    }
    return taken;
  }

  function scramble() {
    Array.from(taken).forEach((each, index) => {
      scrambledlist.push({
        letter: original[each].letter,
        spanid: original[each].spanid,
        index: original[each].index,
      });
    });

    let newSpan;
    scrambledlist.forEach((each, index) => {
      newSpan = document.createElement("h3");
      newSpan.id = each.spanid;
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
    Array.from(letters).forEach((letter, index) => {
      console.log(middleX + distancefrommiddle[index]);
      gsap.fromTo(
        letter,
        {
          left: -(Math.random() + index) * getRandomBinary().toString(),
          top: -(Math.random() + index) * getRandomBinary().toString(),
          duration: 2,
          ease: "power1.in",
        },
        { left: middleX + distancefrommiddle[index], top: 150 }
      );
    });
  }
  function findwrongposition() {
    let i = 0;
    while (i < scrambledlist.length) {
      if (original[i].letter !== scrambledlist[i].letter)
        console.log(
          "scrambled",
          scrambledlist[i].letter,
          "original",
          original[i].letter,
          original[i].index
        );
      wrongposition.push({
        index: original[i].index,

        spanid: original[i].spanid,
      });
      i++;
    }
    console.log("wrong position", wrongposition);
  }

  useEffect(() => {
    randomgenerator();

    scramble();

    placeletters();
    findwrongposition();

    setTimeout(() => {
      Array.from(wrongposition).forEach((each) => {
        gsap.getProperty("#id", "x");
        gsap.to("#" + each.spanid, 0.1, { y: "-=20", yoyo: true, repeat: 3 });
        //gsap.to("#" + each, 0.1, { y: "+=20", yoyo: true, repeat: 2 });
      });
    }, 2500);

    setTimeout(() => {
      Array.from(wrongposition).forEach((each) => {
        //gsap.to("#" + each, 0.1, { y: "-=20", yoyo: true, repeat: 3 });
        gsap.to("#" + each.spanid, 0.1, { top: 130, yoyo: false, repeat: 0 });
      });
    }, 3000);
    ///////////////////////

    setTimeout(() => {
      Array.from(wrongposition).forEach((each, index) => {
        console.log(middleX + distancefrommiddle[index]);
        //sleep(500).then(() => {
        gsap.to("#" + each.spanid, {
          left: `${middleX + distancefrommiddle[index]}px`,
          top: "150px",
          duration: 1,
          // });
        });
      });
    }, 3500);
  }, []);

  return (
    <>
      <div id="letters"></div>
      <button onClick={() => {}}>generate</button>
    </>
  );
}

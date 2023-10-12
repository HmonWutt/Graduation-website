import { useEffect, useRef } from "react";
import "./index.css";
import useScreenSize from "./resizer";
const gsap = window.gsap;

export default function Words({
  letterstring,
  OFFSET,
  color,
  shadow = ".1em .1em 0 hsl(200 50% 30%)",
  fontFamily = "Montserrat,sans-serif",
}) {
  letterstring = letterstring.toUpperCase();
  //const OFFSET = 25;

  const original = createIdObject(letterstring);
  const taken = randomGenerator(letterstring);
  const scrambledList = scramble(taken, original);
  const viewportWidth = useScreenSize().screenWidth;
  const isInitialMount = useRef(true);

  function getMiddleIndex(string) {
    return string.length / 2;
  }

  function getDistance(string, middleX) {
    const middleIndex = getMiddleIndex(string);
    const distanceArray = [];

    let letterValue = middleIndex * -OFFSET * 0.8 + 5;

    for (let i = 0; i < string.length; i++) {
      distanceArray.push(letterValue);
      letterValue += OFFSET * 0.8;
    }
    return distanceArray;
  }

  function getMiddleX(viewportWidth) {
    // const viewportWidth =
    //   window.innerWidth || document.documentElement.clientWidth;
    const middleX = viewportWidth / 2;
    return middleX;
  }

  function randomGenerator(string) {
    let taken = new Set();
    while (taken.size < string.length) {
      taken.add(Math.floor(Math.random() * string.length));
    }
    return taken;
  }

  function createIdObject(string) {
    const original = [];
    Array.from(string).forEach((i, index) =>
      original.push({
        index: index,
        letter: i,
        spanid: letterstring.trim().replaceAll(" ", "-") + index,
      })
    );
    return original;
  }

  function scramble(taken, original) {
    const scrambledList = [];
    Array.from(taken).forEach((each, index) => {
      scrambledList.push({
        letter: original[each].letter,
        spanid: original[each].spanid,
        index: original[each].index,
      });
    });
    return scrambledList;
  }

  function createSpans(scrambledList) {
    let newSpan;
    scrambledList.forEach((each, index) => {
      newSpan = document.createElement("span");

      newSpan.id = each.spanid;
      newSpan.textContent = each.letter;
      newSpan.className = letterstring.trim();
      newSpan.style.position = "absolute";
      newSpan.style.width = OFFSET * 0.04 + "rem";
      newSpan.style.fontSize = OFFSET * 0.045 + "rem";
      newSpan.style.color = color;
      newSpan.style.fontFamily = fontFamily;

      document.getElementById(letterstring).appendChild(newSpan);
    });
  }

  function getRandomBinary() {
    const plusorminus = [-100, 100];
    const randomDecimal = Math.random();
    const result = Math.round(randomDecimal);
    return plusorminus[result];
  }

  function placeLetters(distanceFromMiddle, heightOfDiv, middleX) {
    const letters = document.getElementsByClassName(letterstring.trim());

    Array.from(letters).forEach((letter, index) => {
      gsap.fromTo(
        letter,
        {
          left: -(Math.random() + index) * getRandomBinary().toString(),
          top: -(Math.random() + index) * getRandomBinary().toString(),
          duration: 2,
          ease: "power1.in",
        },
        {
          left: middleX + distanceFromMiddle[index],
          top: heightOfDiv,
        }
      );
    });
  }
  function resize(distanceFromMiddle, heightOfDiv, middleX) {
    Array.from(original).forEach((letter, index) => {
      gsap.to("#" + letter.spanid, {
        left: middleX + distanceFromMiddle[index],
        top: heightOfDiv,
      });
    });
  }
  function findWrongPosition(scrambledList, original) {
    let i = 0;
    const wrongPosition = [];
    while (i < scrambledList.length) {
      if (scrambledList[i].spanid !== original[i].spanid)
        wrongPosition.push({
          index: original[i].index,
          letter: original[i].letter,
          spanid: original[i].spanid,
        });
      i++;
    }
    return wrongPosition;
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      const middleX = getMiddleX(viewportWidth);

      const distanceFromMiddle = getDistance(letterstring, middleX);
      const heightOfDiv = document
        .getElementById(letterstring)
        .getBoundingClientRect().top;

      createSpans(scrambledList);
      placeLetters(distanceFromMiddle, heightOfDiv, middleX);
      const wrongPosition = findWrongPosition(scrambledList, original);

      setTimeout(() => {
        Array.from(wrongPosition).forEach((each) => {
          gsap.getProperty("#id", "x");
          gsap.to("#" + each.spanid, 0.1, {
            y: "-=" + OFFSET,
            yoyo: true,
            repeat: 3,
          });
        });
      }, 1000);

      setTimeout(() => {
        Array.from(wrongPosition).forEach((each) => {
          // //gsap.to("#" + each, 0.1, { y: "-=20", yoyo: true, repeat: 3 });
          gsap.to("#" + each.spanid, 0.1, {
            top: heightOfDiv - OFFSET,
            yoyo: false,
            repeat: 0,
          });
        });
      }, 1500);
      ///////////////////////

      setTimeout(() => {
        Array.from(wrongPosition).forEach((each) => {
          gsap.to("#" + each.spanid, {
            left: `${middleX + distanceFromMiddle[each.index]}px`,
            top: `${heightOfDiv}px`,
            duration: 1,
          });
        });
        Array.from(original).forEach((each) => {
          document.getElementById(each.spanid).style.textShadow = shadow;
        });
      }, 2500);
    } else {
      const middleX = getMiddleX(viewportWidth);

      const distanceFromMiddle = getDistance(letterstring, middleX);
      const heightOfDiv = document
        .getElementById(letterstring)
        .getBoundingClientRect().top;

      resize(distanceFromMiddle, heightOfDiv, middleX);
    }
  });

  return (
    <>
      <div
        id={letterstring}
        style={{
          height: 2 * OFFSET + "px",
          marginTop: "1rem",
          fontWeight: "Bold",
        }}
      ></div>
    </>
  );
}

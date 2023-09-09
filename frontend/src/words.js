import { useEffect } from "react";
import "./index.css";
const gsap = window.gsap;

export default function Words({ letterstring }) {
  letterstring = letterstring.toUpperCase();
  const OFFSET = 20;
  const original = createIdObject(letterstring);
  const taken = randomGenerator(letterstring);
  const scrambledList = scramble(taken, original);

  const middleX = getMiddleX();

  const distanceFromMiddle = getDistance(letterstring, middleX);

  function getMiddleIndex(string) {
    return string.length / 2;
  }

  function getDistance(string, middleX) {
    const middleIndex = getMiddleIndex(string);
    const distanceArray = [];

    let letterValue = middleIndex * -OFFSET + 5;

    for (let i = 0; i < string.length; i++) {
      distanceArray.push(letterValue);
      letterValue += OFFSET;
    }
    return distanceArray;
  }

  function getMiddleX() {
    const viewportWidth =
      window.innerWidth || document.documentElement.clientWidth;
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
        spanid: letterstring.trim().replace(" ", "-") + index,
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
      newSpan = document.createElement("h3");
      newSpan.id = each.spanid;
      newSpan.textContent = each.letter;
      newSpan.className = letterstring.trim();
      newSpan.style.position = "absolute";
      newSpan.style.width = "20px";
      document.getElementById(letterstring).appendChild(newSpan);
    });
  }

  function getRandomBinary() {
    const plusorminus = [-100, 100];
    const randomDecimal = Math.random();
    const result = Math.round(randomDecimal);
    return plusorminus[result];
  }

  function placeLetters(distanceFromMiddle, heightOfDiv) {
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
    const heightOfDiv = document
      .getElementById(letterstring)
      .getBoundingClientRect().top;

    createSpans(scrambledList);
    placeLetters(distanceFromMiddle, heightOfDiv);
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
    }, 2500);

    setTimeout(() => {
      Array.from(wrongPosition).forEach((each) => {
        // //gsap.to("#" + each, 0.1, { y: "-=20", yoyo: true, repeat: 3 });
        gsap.to("#" + each.spanid, 0.1, {
          top: heightOfDiv - OFFSET,
          yoyo: false,
          repeat: 0,
        });
      });
    }, 3000);
    ///////////////////////

    setTimeout(() => {
      Array.from(wrongPosition).forEach((each) => {
        gsap.to("#" + each.spanid, {
          left: `${middleX + distanceFromMiddle[each.index]}px`,
          top: `${heightOfDiv}px`,
          duration: 1,
        });
      });
    }, 3500);
  }, []);

  return (
    <>
      <div id={letterstring} style={{ height: "50px" }}></div>
    </>
  );
}

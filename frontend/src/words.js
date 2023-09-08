import { useEffect } from "react";
const gsap = window.gsap;

export default function Words() {
  const letterstring = "HMONCODED";
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
    let letterValue = middleIndex * -30 + 5;

    for (let i = 0; i < string.length; i++) {
      distanceArray.push(letterValue);
      letterValue += 30;
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
      original.push({ index: index, letter: i, spanid: "letter" + i + index })
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

  function placeLetters(distanceFromMiddle) {
    const letters = document.getElementsByClassName("letter");
    Array.from(letters).forEach((letter, index) => {
      console.log(middleX + distanceFromMiddle[index]);
      gsap.fromTo(
        letter,
        {
          left: -(Math.random() + index) * getRandomBinary().toString(),
          top: -(Math.random() + index) * getRandomBinary().toString(),
          duration: 2,
          ease: "power1.in",
        },
        { left: middleX + distanceFromMiddle[index], top: 150 }
      );
    });
  }

  function findWrongPosition(scrambledlist, original) {
    let i = 0;
    const wrongPosition = [];
    while (i < scrambledList.length) {
      if (original[i].letter !== scrambledlist[i].letter)
        console.log(
          "scrambled",
          scrambledlist[i].letter,
          "original",
          original[i].letter,
          original[i].index
        );
      wrongPosition.push({
        index: original[i].index,

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
    createSpans(scrambledList);
    placeLetters(distanceFromMiddle);
    const wrongPosition = findWrongPosition(scrambledList, original);

    setTimeout(() => {
      Array.from(wrongPosition).forEach((each) => {
        gsap.getProperty("#id", "x");
        gsap.to("#" + each.spanid, 0.1, { y: "-=20", yoyo: true, repeat: 3 });
      });
    }, 2500);

    setTimeout(() => {
      Array.from(wrongPosition).forEach((each) => {
        // //gsap.to("#" + each, 0.1, { y: "-=20", yoyo: true, repeat: 3 });
        gsap.to("#" + each.spanid, 0.1, { top: 130, yoyo: false, repeat: 0 });
      });
    }, 3000);
    ///////////////////////

    setTimeout(() => {
      Array.from(wrongPosition).forEach((each, index) => {
        gsap.to("#" + each.spanid, {
          left: `${middleX + distanceFromMiddle[index]}px`,
          top: "150px",
          duration: 1,
        });
      });
    }, 3500);
  }, []);

  return (
    <>
      <div id="letters"></div>
    </>
  );
}

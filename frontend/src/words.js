import { useEffect } from "react";
const gsap = window.gsap;
export default function Words() {
  const letters = ["W", "E", "L", "C", "O", "M", "E"];
  let taken = new Set();
  function randomgenerator() {
    console.log(origin);
    while (taken.size < letters.length) {
      taken.add(Math.floor(Math.random() * letters.length));
    }

    return taken;
  }
  function makeletters() {
    let letterlist = [];
    Array.from(taken).forEach((each) => {
      letterlist.push(letters[each]);
    });
    let newSpan;

    letterlist.forEach((each, index) => {
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
    Array.from(letters).forEach((letter, index) => {
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
          placeletters();
        }}
      >
        generate
      </button>
    </>
  );
}

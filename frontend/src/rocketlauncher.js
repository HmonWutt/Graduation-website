import "./index.css";
import { rocket } from "./rocket";
import { motion } from "framer-motion";
import { useState } from "react";
const gsap = window.gsap;

// Register the MotionPathPlugin

function Rocket() {
  const [hideRocket, setHideRocket] = useState(false);
  function launchrocket() {
    // target.classList.add("rocket-grow");
    const rocket = document.getElementById("rocket");
    setTimeout(() => setHideRocket(!hideRocket), 3000);

    gsap.to(rocket, {
      duration: 3,
      scale: 3,
      rotate: 60,
      x: 1000,
      y: -1000,
    });
  }

  return (
    <div id="rocket-container">
      {" "}
      <motion.div
        style={{
          visibility: hideRocket ? "hidden" : "show",
        }}
        id="rocket-holder"
        animate={{ y: [15, 0, 15], scale: [0.95, 1, 0.95] }}
        transition={{
          ease: "easeOut",
          duration: 3,
          repeat: Infinity,
        }}
      >
        {rocket}
      </motion.div>
      <button onClick={launchrocket}>launch</button>{" "}
    </div>
  );
}
export default Rocket;

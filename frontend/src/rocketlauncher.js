import "./index.css";
import { rocket } from "./rocket";
import { motion } from "framer-motion";
import { useState, useImperativeHandle, forwardRef, useRef } from "react";
const gsap = window.gsap;

// Register the MotionPathPlugin

const Rocket = forwardRef((props, ref) => {
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
  useImperativeHandle(ref, () => ({
    launch() {
      return launchrocket();
    },
  }));
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
    </div>
  );
});
export default Rocket;

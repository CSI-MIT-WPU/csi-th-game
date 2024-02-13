/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import fillerData from "./fillerData";

const FillerButtons = ({ expectedIndex, setExpectedIndex }) => {
  const [buttons, setButtons] = useState(fillerData);
  const initialPositions = buttons.map(() => ({ x: 0, y: 0 }));
  const [positions, setPositions] = useState(initialPositions); // Use initial positions
  const [showPopup, setShowPopup] = useState(false);

  const [clickedIndex, setClickedIndex] = useState(-1);

  const animationControls = buttons.map(() => useAnimation());

  useEffect(() => {
    const animateButtons = async () => {
      while (true) {
        // Trigger all animations based on updated positions
        buttons.forEach((btn, index) => {
          animationControls[index].start({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            transition: { duration: 5, ease: "linear" },
          });
        });

        // Add a delay before the next animation
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    };

    animateButtons();

    // Clean up the interval on component unmount
    return () => animationControls.forEach((control) => control.stop());
  }, [animationControls, buttons]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";

    // Generate random RGB values
    const r = Math.floor(Math.random() * 128); // Keep it in the darker range
    const g = Math.floor(Math.random() * 128);
    const b = Math.floor(Math.random() * 128);

    // Convert RGB to hex
    color += r.toString(16).padStart(2, "0");
    color += g.toString(16).padStart(2, "0");
    color += b.toString(16).padStart(2, "0");

    return color;
  };

  const handleButtonClick = (index) => {
    setExpectedIndex(0);
    setShowPopup("oops");

    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <>
      {buttons.map((btn, index) => (
        <motion.button
          key={index}
          animate={animationControls[index]}
          className="absolute  text-white py-2 px-4 rounded"
          style={{
            backgroundColor: getRandomColor(),
            left: `${positions[index].x}px`,
            top: `${positions[index].y}px`,
          }}
          onClick={() => handleButtonClick(index)}
        >
          {btn}
        </motion.button>
      ))}

      {showPopup === "oops" && (
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 p-4 rounded shadow">
          Ooops! Start from the beginning.
        </div>
      )}
    </>
  );
};

export default FillerButtons;

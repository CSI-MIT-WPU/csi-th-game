/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import data from "./data";

const CorrectButtons = ({ teamName, expectedIndex, setExpectedIndex }) => {
  const navigate = useNavigate();
  const [buttons, setButtons] = useState(data[teamName]);
  // console.log(data[teamName]);
  const initialPositions = buttons.map(() => ({ x: 0, y: 0 }));
  const [positions, setPositions] = useState(initialPositions); // Use initial positions
  const [showPopup, setShowPopup] = useState(false);

  const [clickedIndex, setClickedIndex] = useState(-1);

  const animationControls = buttons.map(() => useAnimation());

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    const animateButtons = async () => {
      while (true) {
        // Trigger all animations based on updated positions
        buttons.forEach((btn, index) => {
          animationControls[index].start({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            transition: { duration: 3, ease: "linear" },
          });
        });

        // Add a delay before the next animation
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    };

    animateButtons();

    // Clean up the interval on component unmount
    return () => animationControls.forEach((control) => control.stop());
  }, [animationControls, buttons]);

  const handleButtonClick = (index) => {
    setClickedIndex(index);

    if (index === expectedIndex) {
      setShowPopup("success");
      setExpectedIndex((prevIndex) => prevIndex + 1);
      // Reset clicked index if all buttons are clicked in order
      // console.log(expectedIndex, buttons.length);
      if (expectedIndex + 1 === buttons.length) {
        navigate("/win"); // Replace with your desired path
        setExpectedIndex(0);
      }
    } else {
      setShowPopup("oops");
      setExpectedIndex(0); // Reset expected index on incorrect click
    }

    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div className="relative h-screen">
      {buttons.map((btn, index) => (
        <motion.button
          key={index}
          animate={animationControls[index]}
          className="absolute text-white py-2 px-4 rounded"
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

      {showPopup === "success" && (
        <div className="absolute top-8 px-12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600 py-4 rounded shadow text-white">
          Correct!
        </div>
      )}

      {showPopup === "oops" && (
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 p-4 rounded shadow">
          Ooops! Start from the beginning.
        </div>
      )}
    </div>
  );
};

export default CorrectButtons;

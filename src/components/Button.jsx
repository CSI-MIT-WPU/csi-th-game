/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const ButtonAnimation = () => {
  const [buttons, setButtons] = useState([1, 2, 3, 4]);
  const initialPositions = buttons.map(() => ({ x: 0, y: 0 }));
  const [positions, setPositions] = useState(initialPositions); // Use initial positions
  const [showPopup, setShowPopup] = useState(false);

  const animationControls = buttons.map(() => useAnimation());

  useEffect(() => {
    const animateButtons = async () => {
      while (true) {
        // Trigger all animations based on updated positions
        buttons.forEach((btn, index) => {
          animationControls[index].start({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            transition: { duration: 2, ease: "linear" },
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
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div className="relative h-screen">
      {buttons.map((btn, index) => (
        <motion.button
          key={index}
          animate={animationControls[index]}
          className="absolute bg-blue-500 text-white py-2 px-4 rounded"
          style={{
            left: `${positions[index].x}px`,
            top: `${positions[index].y}px`,
          }}
          onClick={() => handleButtonClick(index)}
        >
          Move Me! {btn}
        </motion.button>
      ))}

      {showPopup && (
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-300 p-4 rounded shadow">
          Correct!
        </div>
      )}
    </div>
  );
};

export default ButtonAnimation;

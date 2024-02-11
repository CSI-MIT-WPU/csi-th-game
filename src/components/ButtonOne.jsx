import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const ButtonAnimationOne = () => {
  const controls = useAnimation();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  useEffect(() => {
    const animateButton = async () => {
      while (true) {
        await controls.start({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          transition: { duration: 1, ease: "linear" },
        });

        // Add a delay before the next animation
        await new Promise((resolve) => setTimeout(resolve, 20));
      }
    };

    animateButton();
    console.log(controls);

    // Clean up the interval on component unmount
    return () => controls.stop();
  }, [controls]);

  return (
    <div className="relative h-screen">
      <motion.button
        animate={controls}
        className="absolute bg-blue-500 text-white py-2 px-4 rounded"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
        onClick={handleButtonClick}
      >
        Move Me!
      </motion.button>

      {showPopup && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow">
          Correct!
        </div>
      )}
    </div>
  );
};

export default ButtonAnimationOne;

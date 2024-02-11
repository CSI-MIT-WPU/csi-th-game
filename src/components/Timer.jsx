/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const Timer = ({ initialTime, onTimeout }) => {
  const [remainingTime, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => Math.max(0, prevTime - 1));

      if (remainingTime === 0) {
        onTimeout();
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [initialTime, onTimeout, remainingTime]);

  return (
    <div className="text-xl p-2 text-slate-200">
      {remainingTime} seconds remaining
    </div>
  );
};

export default Timer;

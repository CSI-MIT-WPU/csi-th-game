import { useLocation, useNavigate } from "react-router-dom";
import CorrectButtons from "./CorrectButtons";
import FillerButtons from "./FillerButtons";
import { useState } from "react";
import Timer from "./Timer";

const GamePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const teamName = state?.teamName;
  const [expectedIndex, setExpectedIndex] = useState(0);

  return (
    <div className="bg-primary">
      <div className="flex justify-between">
        <div className="text-xl font-bold text-slate-200 p-2">{teamName}</div>
        <Timer initialTime={180} onTimeout={() => navigate("/lose")} />
      </div>
      <CorrectButtons
        teamName={teamName}
        expectedIndex={expectedIndex}
        setExpectedIndex={setExpectedIndex}
      />
      <FillerButtons
        expectedIndex={expectedIndex}
        setExpectedIndex={setExpectedIndex}
      />
    </div>
  );
};

export default GamePage;

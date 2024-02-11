import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [teamName, setTeamName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/game", { state: { teamName } }); // Pass teamName as state
  };

  return (
    <div className="w-full h-screen bg-primary">
      <h1 className="w-full text-center py-12 font-bold text-3xl text-slate-100">
        Welcome to the Final Stage
      </h1>
      <div className="w-screen">
        <h2 className="w-fit mx-auto text-slate-100 text-2xl font-bold">
          Rules
        </h2>
        <p className="text-slate-300 font-extralight text-left w-fit mx-auto">
          1. Select your hints in order <br /> 2. On correct selection a popup
          will appear in green colours indicating the same <br /> 3. On wrong
          selection an error popup will appear and you have to start again from
          the beginning
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center mt-24"
      >
        <input
          type="text"
          className="w-fit border px-4 py-2 bg-primary rounded-md text-slate-100"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Enter team name"
        />
        <button
          type="submit"
          className="mt-12 px-4 py-2 rounded-md bg-green-400 hover:text-white font-bold hover:shadow-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;

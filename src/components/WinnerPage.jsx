import confetti from "../assets/conf.mp4";

const WinnerPage = () => {
  return (
    <div className="h-screen bg-black">
      <h1 className="text-white font-black text-5xl w-fit mx-auto pt-12">
        Congratulations you have WON!!
      </h1>
      <video src={confetti} autoPlay muted loop className="h-screen"></video>
    </div>
  );
};

export default WinnerPage;

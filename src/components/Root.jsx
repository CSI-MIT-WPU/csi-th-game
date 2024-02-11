import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <main>
      <Outlet />
      Root
    </main>
  );
};

export default Root;

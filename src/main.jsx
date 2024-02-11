import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Login.jsx";
import WinnerPage from "./components/WinnerPage.jsx";
import GamePage from "./components/GamePage.jsx";
import LosePage from "./components/LosePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "game",
    element: <GamePage />,
  },
  {
    path: "win",
    element: <WinnerPage />,
  },
  {
    path: "lose",
    element: <LosePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

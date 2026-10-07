import createBrowserRouter from "react-router";
import Register from "./features/auth/pages/Register.jsx";
// import Login from "./features/auth/pages/Login.jsx";
import { Routes, Route } from "react-router-dom";

export const router = CreateBrowserRouter([
  {
    path: "/",
    element: <h1>Home Page</h1>,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

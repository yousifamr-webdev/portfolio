import { useState } from "react";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Portfolio from "./components/Portfolio/Portfolio";
import MainLayout from "./components/MainLayout/MainLayout"
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const Routes = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />, 
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "portfolio", element: <Portfolio /> },
      { path: "contact", element: <Contact /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={Routes}></RouterProvider>
      
    </>
  );
}

export default App;

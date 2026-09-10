import React from "react";
import Style from "./About.module.css";

export default function About() {
  return (
    <>
      <main className={Style["main-content"]}>
        <div className="container d-flex flex-column justify-content-center align-items-center">
          <h2 className="text-center" >ABOUT COMPONENT</h2>
          <div className="d-flex justify-content-center align-items-center mb-3 mt-2">
            <span className={Style["line"]}></span>
            <i className="fa-solid fa-star text-white mx-4"></i>
            <span className={Style["line"]}></span>
          </div>

          <div className="d-flex">
            <p>
              Freelancer is a free bootstrap theme created by Route. The
              download includes the complete source files including HTML, CSS,
              and JavaScript as well as optional SASS stylesheets for easy
              customization.
            </p>
            <p>
              Freelancer is a free bootstrap theme created by Route. The
              download includes the complete source files including HTML, CSS,
              and JavaScript as well as optional SASS stylesheets for easy
              customization.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

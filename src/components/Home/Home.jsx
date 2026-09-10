import React from "react";
import Avatar from "../../assets/avatar.svg";
import Style from "./Home.module.css";

export default function Home() {
  return (
    <>
      <main className={Style["main-content"]}>
        <div className="container d-flex flex-column justify-content-center align-items-center">
          <img className={`${Style["avatar"]} mb-5`} src={Avatar} />
          <h2 className="text-center" >START FRAMEWORK</h2>
          <div className="d-flex justify-content-center align-items-center mb-3 mt-2">
            <span className={Style["line"]}></span>
            <i className="fa-solid fa-star text-white mx-4"></i>
            <span className={Style["line"]}></span>
          </div>

          <p>Graphic Artist - Web Designer - Illustrator</p>
        </div>
      </main>
    </>
  );
}

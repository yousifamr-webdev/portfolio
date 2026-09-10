import React, { useState } from "react";
import Style from "./Contact.module.css";

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  return (
    <>
      <main className="container">
        <div className={Style["main-content"]}>
          <h2 className="text-center">CONTACT SECTION</h2>
          <div className="d-flex justify-content-center align-items-center mb-3 mt-2">
            <span className={Style["line"]}></span>
            <i className="fa-solid fa-star mx-4"></i>
            <span className={Style["line"]}></span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="w-50 p-3 mx-auto mb-4">
          <div className="position-relative mt-4">
            <label
              htmlFor="userName"
              className={`${Style.floatingLabel} ${
                userName ? Style.showLabel : ""
              }`}
            >
              User Name :
            </label>
            <input
              id="userName"
              type="text"
              placeholder="User Name"
              name="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="form-control border-0 border-bottom py-3"
            />
          </div>
          <div className="position-relative mt-4">
            <label
              htmlFor="userAge"
              className={`${Style.floatingLabel} ${
                userAge ? Style.showLabel : ""
              }`}
            >
              User Age :
            </label>
            <input
              id="userAge"
              type="text"
              placeholder="User Age"
              name="userAge"
              value={userAge}
              onChange={(e) => setUserAge(e.target.value)}
              className="form-control border-0 border-bottom py-3"
            />
          </div>
          <div className="position-relative mt-4">
            <label
              htmlFor="userEmail"
              className={`${Style.floatingLabel} ${
                userEmail ? Style.showLabel : ""
              }`}
            >
              User Email :
            </label>
            <input
              id="userEmail"
              type="text"
              placeholder="User Email"
              name="userEmail"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="form-control border-0 border-bottom py-3"
            />
          </div>
          <div className="position-relative mt-4">
            <label
              htmlFor="userPassword"
              className={`${Style.floatingLabel} ${
                userPassword ? Style.showLabel : ""
              }`}
            >
              User Password :
            </label>
            <input
              id="userPassword"
              type="text"
              placeholder="User Password"
              name="userPassword"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              className="form-control border-0 border-bottom py-3"
            />
          </div>
          <button type="submit" className={`${Style["btn-custom"]} btn mt-4`}>
            Send Message
          </button>
        </form>
      </main>
    </>
  );
}

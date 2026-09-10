import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [isScroll, setisScroll] = useState(false);

  window.addEventListener("scroll", function () {
    if (scrollY > 0) {
      setisScroll(true);
    } else {
      setisScroll(false);
    }
  });

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg sticky-top ${
          isScroll ? "" : "py-4"
        } z-2`}
      >
        <div className="container">
          <Link className="navbar-brand" to="">
            START FRAMEWORK
          </Link>
          <button
            className="navbar-toggler text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fa-solid fa-bars custom-toggler"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link mx-2"
                  aria-current="page"
                  to="/about"
                >
                  ABOUT
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link mx-2" to="/portfolio">
                  PORTFOLIO
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link mx-2" to="/contact">
                  CONTACT
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

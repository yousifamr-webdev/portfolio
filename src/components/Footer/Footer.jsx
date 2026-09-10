import React from 'react'

export default function Footer() {
  return (
    <>
      <footer className="position-relative">
        <div className="container">
          <div className="row text-center text-white">
            <div className="col-sm-4 mb-3">
              <h3>LOCATION</h3>
              <p>2215 John Daniel Drive Clark, MO 65243</p>
            </div>
            <div className="col-sm-4 mb-3">
              <h3>AROUND THE WEB</h3>
              <div className="d-flex justify-content-center">
                <span className="icon-circle mx-1">
                  <i className="fa-brands fa-facebook-f"></i>
                </span>
                <span className="icon-circle mx-1">
                  <i className="fa-brands fa-twitter"></i>
                </span>
                <span className="icon-circle mx-1">
                  <i className="fa-brands fa-linkedin-in"></i>
                </span>
                <span className="icon-circle mx-1">
                  <i className="fa-solid fa-globe"></i>
                </span>
              </div>
            </div>
            <div className="col-sm-4 mb-3">
              <h3>ABOUT FREELANCER</h3>
              <p>
                Freelance is a free to use, licensed Bootstrap theme created by
                Route
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 copyright position-absolute bottom-0 start-0 end-0 text-white text-center">
          <span>Copyright © Your Website 2021</span>
        </div>
      </footer>
    </>
  );
}

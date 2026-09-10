import React from "react";
import { useState } from "react";
import Style from "./Portfolio.module.css";
import Card1 from "../../assets/card1.png";
import Card2 from "../../assets/card2.png";
import Card3 from "../../assets/card3.png";

export default function Portfolio() {
  const cards = [
    { id: 1, img: Card1 },
    { id: 2, img: Card2 },
    { id: 3, img: Card3 },
    { id: 4, img: Card1 },
    { id: 5, img: Card2 },
    { id: 6, img: Card3 },
  ];

const [overlay, setOverlay] = useState(null);



  return (
    <>
      <main className={Style["main-content"]}>
        <div className="container d-flex flex-column justify-content-center align-items-center text-center">
          <h2>PORTFOLIO COMPONENT</h2>
          <div className="d-flex justify-content-center align-items-center mb-3 mt-2">
            <span className={Style["line"]}></span>
            <i className="fa-solid fa-star mx-4"></i>
            <span className={Style["line"]}></span>
          </div>
          <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 g-5">
            {cards.map((card) => (
              <div className="col" key={card.id}>
                <div
                  className="card h-100"
                  onClick={() => setOverlay(card.img)}
                >
                  <img
                    src={card.img}
                    className="card-img"
                    alt={`Card ${card.id}`}
                  />
                  <div
                    className={`${Style["card-overlay"]} d-flex justify-content-center align-items-center`}
                  >
                    <i className="fa-solid fa-plus fa-6x text-white"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {overlay ? (
          <div
            className="position-fixed start-0 end-0 top-0 bottom-0 bg-primary bg-opacity-25 d-flex justify-content-center align-items-center z-3"
            onClick={() => setOverlay(null)}
          >
            <img alt="" src={overlay} className={Style["img-overlay"]} />
          </div>
        ) :
          null
        }
      </main>
    </>
  );
}

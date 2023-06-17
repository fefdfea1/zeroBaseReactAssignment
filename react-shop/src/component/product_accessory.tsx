import { useContext, useRef, useState } from "react";
import { userDispatch } from "../App";
import { Link } from "react-router-dom";
import { init, clickSlide } from "../script/productSlide";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/Ai";
import style from "../css/product.module.css";

export default function Product_accessory() {
  const data = useContext(userDispatch);
  const [moveX, setMove] = useState(0);
  const refUl = useRef<HTMLUListElement>(null);
  const filterData = data.Data.filter((item) => {
    return item.category === "jewelery";
  });

  if (refUl.current instanceof HTMLUListElement) {
    init(refUl.current);
  }

  return (
    <>
      <h2
        className={`w-auto text-center text-3xl ${style.productTitleColor} pt-12 font-bold`}
      >
        패션
      </h2>
      <div className={`product flex overflow-hidden pt-7 relative`}>
        <ul
          className={`flex shrink-0 relative ${style.slideUlTransition}`}
          ref={refUl}
        >
          {filterData
            ? filterData.map((item) => {
                return (
                  <li
                    key={item.id}
                    className={`${style.productMargin} shrink-0 ${style.productWidth}`}
                  >
                    <article>
                      <Link to={`/jewelery/detail/${item.id}`}>
                        <figure>
                          <div
                            className={`productImg-bx h-96 bg-white rounded-t-3xl p-24 ${style.productCardBorder}`}
                          >
                            <img src={`${item.image}`} alt="상품이미지" />
                          </div>
                          <div
                            className={`desc w-full h-36 ${style.productTitleColor} font-bold ${style.productBorder} p-5 relative ${style.productCardMargin} ${style.productDescBackgroundColor}`}
                          >
                            <p className="flex align-center">{item.title}</p>
                            <p className="absolute bottom-4 left-1.25">
                              ${item.price}
                            </p>
                          </div>
                        </figure>
                      </Link>
                    </article>
                  </li>
                );
              })
            : null}
        </ul>
        <button
          className={`absolute ${style.leftButtonPosition}`}
          data-event="left"
          onClick={(event) => {
            if (refUl.current instanceof HTMLUListElement) {
              clickSlide(event, refUl.current, setMove, moveX);
            }
          }}
        >
          <AiOutlineArrowLeft
            style={{ width: "30px", height: "30px", pointerEvents: "none" }}
            className={`${style.ArrowColor}`}
          />
        </button>
        <button
          className={`absolute ${style.rightButtonPosition} ${style.rightButtonSize}`}
          data-event="right"
          onClick={(event) => {
            if (refUl.current instanceof HTMLUListElement) {
              clickSlide(event, refUl.current, setMove, moveX);
            }
          }}
        >
          <AiOutlineArrowRight
            style={{ width: "30px", height: "30px", pointerEvents: "none" }}
            className={`${style.ArrowColor}`}
          />
        </button>
      </div>
    </>
  );
}

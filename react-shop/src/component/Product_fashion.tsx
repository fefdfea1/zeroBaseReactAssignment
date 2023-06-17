import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { userDispatch } from "../App";
import { init, clickSlide } from "../script/productSlide";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/Ai";
import style from "../css/product.module.css";
export default function Product_fashion() {
  const [moveX, setMove] = useState(0);
  const refUl = useRef<HTMLUListElement>(null);
  const [createButton, setButton] = useState(false);
  const data = useContext(userDispatch);

  const manFashionDataFilter = data.Data.filter(
    (item) => item.category === "men's clothing"
  );
  const woManFashionData = data.Data.filter((item) => {
    return item.category === "women's clothing";
  });
  const combine = [...manFashionDataFilter, ...woManFashionData];
  if (refUl.current instanceof HTMLUListElement) {
    init(refUl.current);
  }
  window.addEventListener("resize", () => {
    if (refUl.current) {
      init(refUl.current);
    }
  });

  return (
    <>
      <h2
        className={`w-auto text-center text-3xl ${style.productTitleColor} pt-12 font-bold`}
      >
        디지털
      </h2>
      <div className={`product flex overflow-hidden pt-7 relative`}>
        <ul
          className={`slideContainer flex shrink-0 ${style.slideUlTransition}`}
          ref={refUl}
        >
          {combine
            ? combine.map((item) => {
                return (
                  <li
                    key={item.id}
                    className={`${style.productWidth} ${style.productMargin} shrink-0`}
                  >
                    <article>
                      <Link to={`/fashion/detail/${item.id}`}>
                        <figure>
                          <div
                            className={`h-20 productImg-bx h-96 bg-white rounded-t-3xl p-24 ${style.productCardBorder}`}
                          >
                            <img src={`${item.image}`} alt="상품이미지" />
                          </div>
                          <div
                            className={`desc w-full h-36 ${style.productTitleColor} font-bold ${style.productBorder} p-5 relative ${style.productCardMargin}  ${style.productDescBackgroundColor}`}
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

import { clickDotButton, sideButtonClick, init } from "../script/BannerSlide";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";

import {
  FiArrowLeftCircle,
  FiArrowRightCircle,
  FiArrowRight,
} from "react-icons/Fi";

import style from "../css/Banner.module.css";

export default function BannerSlide() {
  const ref = useRef<HTMLUListElement>(null);
  let timer = 0;
  useEffect(() => {
    if (ref.current instanceof HTMLUListElement) {
      init(ref.current);
    }
  }, []);

  window.addEventListener("resize", () => {
    if (timer === 0) {
      timer = setTimeout(() => {
        if (ref.current instanceof HTMLUListElement) {
          init(ref.current);
        }
        timer = 0;
      }, 200);
    }
  });

  return (
    <div className="BannerContainer relative overflow-hidden">
      <ul
        className={`${style.bannerHeight} transition-transform duration-200 flex`}
        ref={ref}
      >
        <li className={`SlideItem  h-full relative w-full`}>
          <Link to={"./fashion"}>
            <div className="img-bx overflow-hidden w-full h-full">
              <img
                src="../public/img/img_shop_fashion.jpeg"
                alt="배너이미지"
                className="w-full h-full"
              />
              <div
                className={`productDesc absolute top-2/4 ${style.bannerTextPotionX} ${style.TranslateY50} leading-loose`}
              >
                <p className="text-4xl text-white font-bold">물빠진 청바지!</p>
                <p className="text-white">
                  이제 막 도착한 패션 청바지를 구경해 보세요.
                </p>
                <button
                  className={`flex
                    items-center
                    text-white
                    py-2
                    px-5
                    mt-3
                    ${style.bannerDescColor}
                    rounded-lg
                    ${style.bannerTextColor}
                    `}
                >
                  바로가기
                  <FiArrowRight />
                </button>
              </div>
            </div>
          </Link>
        </li>
        <li className="SlideItem h-full relative w-full">
          <Link to={"/accessoryData"}>
            <div className="img-bx overflow-hidden w-screen  h-full">
              <img
                src="../public/img/img_shop_digital.jpeg"
                alt="배너이미지"
                className="w-full h-full"
              />
              <div
                className={`productDesc absolute top-2/4  ${style.bannerTextPotionX} ${style.TranslateY50} leading-loose`}
              >
                <p className="text-4xl text-white font-bold">신속한 업무처리</p>
                <p className="text-white">다양한 디지털 상품을 둘러보세요</p>
                <button
                  className={`flex
                    items-center
                    text-white
                    py-2
                    px-5
                    mt-3
                    ${style.bannerDescColor}
                    rounded-lg
                    ${style.bannerTextColor}
                    `}
                >
                  바로가기
                  <FiArrowRight />
                </button>
              </div>
            </div>
          </Link>
        </li>
        <li className="SlideItem h-full relative w-full">
          <Link to={"digitalData"}>
            <div className="img-bx overflow-hidden w-screen  h-full">
              <img
                src="../public/img/img_shop_grocery.jpeg"
                alt="배너이미지"
                className="w-full h-full"
              />
              <div
                className={`productDesc absolute top-2/4 ${style.bannerTextPotionX} ${style.TranslateY50} leading-loose`}
              >
                <p className="text-4xl text-white font-bold">신선한 상품!</p>
                <p className="text-white">
                  농장 직배송으로 더욱 신선한 식료품을 만나보세요.
                </p>
                <button
                  className={`
                  flex
                  items-center
                  text-white
                  py-2
                  px-5
                  mt-3
                  ${style.bannerDescColor}
                  rounded-lg
                  ${style.bannerTextColor}
                    `}
                >
                  바로가기
                  <FiArrowRight />
                </button>
              </div>
            </div>
          </Link>
        </li>
      </ul>
      <button
        className="
        prevButton
        absolute
        top-0
        left-0
        w-7
        h-full
        pl-1
        py-1.5
        "
        data-prev="prevButton"
        onClick={sideButtonClick}
      >
        <FiArrowLeftCircle
          style={{
            width: "30px",
            height: "30px",
            fill: "white",
            stroke: "#c0c0c0",
            pointerEvents: "none",
          }}
        />
      </button>
      <button
        className="
          nextButton
          absolute
          top-0
          right-0
          w-7
          h-full
          pr-8
          py-1.5
          "
        onClick={sideButtonClick}
      >
        <FiArrowRightCircle
          style={{
            width: "30px",
            height: "30px",
            fill: "white",
            stroke: "#c0c0c0",
            pointerEvents: "none",
          }}
        />
      </button>
      <div
        className={`controlDotButton absolute bottom-0 left-2/4 ${style.Transform50_50}`}
      >
        <ul className="flex">
          <li>
            <button
              className="dotButton w-1.5 h-1.5 border rounded-full p-1.5"
              onClick={clickDotButton}
              data-index="0"
            ></button>
          </li>
          <li className="ml-3">
            <button
              className="dotButton w-1.5 h-1.5 border rounded-full p-1.5"
              onClick={clickDotButton}
              data-index="1"
            ></button>
          </li>
          <li className="ml-3">
            <button
              className="dotButton w-1.5 h-1.5 border rounded-full p-1.5"
              onClick={clickDotButton}
              data-index="2"
            ></button>
          </li>
        </ul>
      </div>
    </div>
  );
}

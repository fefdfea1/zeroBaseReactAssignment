import { clickDotButton, init } from "../script/BannerSlide";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import style from "../css/Banner.module.css";

export default function BannerSlide() {
  const ref = useRef<HTMLUListElement>(null);
  let timer = 0;
  const BannerImgPath = [
    { src: "/img/img_shop_fashion.jpeg", url: "fashion", id: 1 },
    { src: "/img/img_shop_digital.jpeg", url: "digital", id: 2 },
    { src: "/img/img_shop_grocery.jpeg", url: "jewery", id: 3 },
  ];
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
        {BannerImgPath.map((item) => (
          <li className={`SlideItem  h-full relative w-full`} key={item.id}>
            <Link to={`/OnlyProduct/${item.url}`}>
              <div className="img-bx overflow-hidden w-full h-full">
                <img
                  src={item.src}
                  alt="배너이미지"
                  className="w-full h-full"
                />
                <div
                  className={`productDesc absolute top-2/4 ${style.bannerTextPotionX} ${style.TranslateY50} leading-loose`}
                >
                  <p className="text-4xl text-white font-bold">
                    물빠진 청바지!
                  </p>
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
        ))}
      </ul>

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

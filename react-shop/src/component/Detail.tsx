import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { userDispatch, increment, AppDispatch } from "../App";
import { productType } from "../componentType/ProductData";
import { useDispatch } from "react-redux";
import { drawStar } from "../script/detail";
import { Link } from "react-router-dom";
import detailStyle from "../css/detail.module.css";
import Header from "./Header";
import Footer from "./Footer";

export default function Detail() {
  const dispach: AppDispatch = useDispatch();
  const data = useContext(userDispatch);
  const { id } = useParams();
  let currentItem: productType[] = [];
  if (typeof id === "string") {
    const nowID = Number(id);
    currentItem = data.Data.filter((item) => {
      return item.id === nowID;
    });
  }
  useEffect(() => {
    window.localStorage.setItem("data", JSON.stringify(currentItem));
    drawStar(currentItem[0].rating);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (data.Data.length === 0) {
    const getLocalData = window.localStorage.getItem("data");
    if (typeof getLocalData === "string") {
      const parseData = JSON.parse(getLocalData);
      currentItem = parseData;
    }
  }
  return (
    <div className={`detailPage ${detailStyle.productBackground}`}>
      <section className={`w-full ${detailStyle.sectionHeight}`}>
        <Header />
        <ul className="flex text-white font-bold text-xl mt-11 mobile:ml-6 md:ml-20">
          <li className={`${detailStyle.liFontColor}`}>
            {currentItem !== undefined ? currentItem[0].category : null}
          </li>
          <li
            className={`ml-9 detailStyle ${detailStyle.arrow} ${detailStyle.liFontColor}`}
          >
            {currentItem !== undefined ? currentItem[0].title : null}
          </li>
        </ul>
        <div className="flex xl:ml-20 md:ml-10 mt-20 mobile:flex-col lg:flex-row items-center">
          <article
            className={`${detailStyle.imgArticleBoxSize} bg-white rounded-3xl shrink-0`}
          >
            <figure
              className={`h-full w-full flex items-center justify-center  py-4 px-11 overflow-hidden`}
            >
              <img
                src={`${currentItem[0].image}`}
                alt="상품이미지"
                className="w-full h-full object-contain"
              />
            </figure>
          </article>
          <div className=" mobile:p-14 md:p-6 xl:p-10 font-semibold">
            <p className={`${detailStyle.FontColor} text-3xl`}>
              {currentItem[0].title}
            </p>
            <p className={`${detailStyle.FontColor} mt-5 text-2xl font-medium`}>
              {currentItem[0].description}
            </p>
            <div className="rating flex mt-5">
              <ul className="flex starContainer">
                <li className={`${detailStyle.blankStar}`}></li>
                <li className={`${detailStyle.blankStar} ml-3`}></li>
                <li className={`${detailStyle.blankStar} ml-3`}></li>
                <li className={`${detailStyle.blankStar} ml-3`}></li>
                <li className={`${detailStyle.blankStar} ml-3`}></li>
              </ul>
              <div className={`survey flex ${detailStyle.FontColor}`}>
                <ul className="flex ml-5">
                  <li className="mr-2">{currentItem[0].rating.rate}</li>
                  <li className="mr-2">/</li>
                  <li className="mr-1">{currentItem[0].rating.count}</li>
                  <li>참여</li>
                </ul>
              </div>
            </div>
            <p className={`price ${detailStyle.FontColor} text-3xl mt-5`}>
              ${currentItem !== undefined ? currentItem[0].price : null}
            </p>
            <div className="actionButton mt-5 flex">
              <button
                className={`button py-1 px-4 ${detailStyle.buttonBackgroundColor} rounded-md text-white`}
                onClick={() => {
                  dispach(increment(currentItem[0].id));
                }}
              >
                장바구니에 담기
              </button>
              <button
                className={` ${detailStyle.button2Color} rounded-md text-white ml-5`}
              >
                <Link to={"/shoppingList"} className="p-3 block">
                  장바구니로 이동
                </Link>
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

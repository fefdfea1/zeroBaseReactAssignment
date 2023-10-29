import { useEffect, useState, useContext, useRef } from "react";
import { BiSun } from "react-icons/bi";
import { BiShoppingBag } from "react-icons/bi";
import { BsMoon } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState, changeNum, userDispatch } from "../App";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "../css/Header.module.css";
import { changeWhiteMode, changeDarkMode } from "../script/header";
import { productType } from "../componentType/ProductData";
import Hamberger from "./Hamberger";
export default function Header() {
  const [darkMode, setDarkMode] = useState(true);
  const [input, setInput] = useState("");
  const [searchResult, setSearchResult] = useState<productType[]>([]);
  const getProductData = useContext(userDispatch);
  const dispatch = useDispatch();
  const getData = useSelector((state: RootState) => {
    return state;
  });
  const ref = useRef<HTMLUListElement>(null);
  let timer = 0;

  const searchResultFun = () => {
    if (timer !== 0) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      let filter = getProductData.Data.filter((item) => {
        return (
          item.title.toLocaleLowerCase().indexOf(input.toLocaleLowerCase()) !==
          -1
        );
      });
      // 텍스트를 모두 지워도 남아있는 searchList를 제거하기 위해추가
      if (input.length <= 1) {
        filter = [];
      }
      setSearchResult(filter);
    }, 300);
  };

  const clickSearchResult = () => {
    setInput("");
    setSearchResult([]);
  };

  useEffect(() => {
    const getLocalData = localStorage.getItem("itemNum");
    const getDarkMode = localStorage.getItem("viewMode");
    if (getLocalData !== null) {
      const parse = JSON.parse(getLocalData);
      dispatch(changeNum(parse));
    }
    if (getDarkMode !== null) {
      const parse = JSON.parse(getDarkMode);
      if (!parse) {
        setDarkMode(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <header
      className={` ${styles.header_color}  mobile:px-10 md:px-20 shadow-lg`}
    >
      <div className="flex justify-between items-center w-auto mx-auto py-3">
        <nav className="navigation">
          <div className="md:hidden sm:block">
            <Hamberger />
          </div>
          <ul className="justify-between items-center mobile:hidden md:flex ">
            <li
              className={`px-3 font-semibold text-lg ${styles.headerFontColor}`}
            >
              <Link to={`/`}>React Shop</Link>
            </li>
            <li
              className={`px-3 font-semibold text-lg ${styles.headerFontColor}`}
            >
              <Link to={`/OnlyProduct/fashion`}>패션</Link>
            </li>
            <li
              className={`px-3 font-semibold text-lg ${styles.headerFontColor}`}
            >
              <Link to={`/OnlyProduct/jewery`}>액세서리</Link>
            </li>
            <li
              className={`px-3 font-semibold text-lg ${styles.headerFontColor}`}
            >
              <Link to={`/OnlyProduct/digital`}>디지털</Link>
            </li>
          </ul>
        </nav>
        <div className="px-2">
          <ul className="flex justify-between items-center">
            <li className="mr-4">
              {darkMode ? (
                <button
                  onClick={() => {
                    changeWhiteMode();
                    setDarkMode(false);
                  }}
                >
                  <BiSun
                    style={{
                      width: "26px",
                      height: "26px",
                    }}
                    className={`inline-flex justify-between items-center pointer-events-none ${styles.svgFill}`}
                  />
                </button>
              ) : (
                <button
                  onClick={() => {
                    changeDarkMode();
                    setDarkMode(true);
                  }}
                >
                  <BsMoon
                    style={{
                      width: "26px",
                      height: "26px",
                    }}
                    className={`inline-flex justify-between items-center pointer-events-none ${styles.svgFill}`}
                  />
                </button>
              )}
            </li>
            <li className="relative">
              <input
                type="text"
                placeholder="검색"
                className={`px-4 h-12 w-60 rounded-md ${styles.inputBackground} text-white`}
                onChange={(event) => {
                  setInput(event.target.value);
                  searchResultFun();
                }}
                value={input}
              />
              <div className="productList relative">
                <ul
                  className="searchProductList absolute top-2 left-0 w-full max-h-80 overflow-auto z-50"
                  ref={ref}
                >
                  {searchResult.map((item) => {
                    return (
                      <li
                        key={item.id}
                        className={`${styles.searchListBorder} ${styles.searchListBackgroundColor}`}
                      >
                        <Link
                          to={`/${item.category}/detail/${item.id}`}
                          data-category={`${item.category}`}
                          onClick={() => {
                            clickSearchResult();
                          }}
                          className="w-full h-full block p-4"
                        >
                          <p
                            className={`${styles.headerFontColor} text-base font-bold pointer-events-none`}
                          >
                            {item.title}
                          </p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
            <li className="pl-4">
              <button className={"h-11 relative"}>
                <Link to={"/shoppingList"}>
                  <span
                    className="absolute px-2 py-1 bg-red-500 top-3 right-0
                            font-bold rounded-full text-xs transform translate-x-1/2 -translate-y-1/2
                            text-white"
                  >
                    {getData.counter1.idList.length}
                  </span>
                  <BiShoppingBag
                    style={{ width: "26px", height: "26px" }}
                    className={`inline-flex justify-between items-center ${styles.svgFill}`}
                  />
                </Link>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

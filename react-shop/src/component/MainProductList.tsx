import { useContext, useEffect, useState } from "react";
import { userDispatch } from "../App";
import { ProductListType } from "../componentType/MainProductList";
import { Link } from "react-router-dom";
import { drawStar } from "../script/MainProductList";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import style from "../css/MainProductList.module.css";

export default function MainProductList() {
  const ProductData = useContext(userDispatch);
  const [ProductList, setProductList] = useState<ProductListType | null>(null);
  useEffect(() => {
    const ProductList: ProductListType = [
      {
        keys: "cloth",
        item: [],
        category: "패션",
      },
      {
        keys: "digital",
        item: [],
        category: "디지털",
      },
      {
        keys: "jewelery",
        item: [],
        category: "악세사리",
      },
    ];
    ProductData.Data.forEach((item) => {
      if (
        item.category === "men's clothing" ||
        item.category === "women's clothing"
      ) {
        ProductList[0].item.push(item);
      } else if (item.category === "electronics") {
        ProductList[1].item.push(item);
      } else {
        ProductList[2].item.push(item);
      }
    });
    setProductList(ProductList);
  }, [ProductData]);

  return (
    <div className="flex flex-col overflow-hidden pt-20 mobile:ml-6 mobile:mr-6 md:ml-20 md:mr-20 SliderContainer ">
      {Array.from({
        length: Object.keys(ProductList !== null ? ProductList : 0).length,
      }).map((_, index) => {
        return (
          <>
            <h2
              className={`text-center font-bold md:text-4xl ${
                index > 0 && "mt-10"
              } ${style.ProductTitleColor}`}
            >
              {ProductList && ProductList[index].category}
            </h2>
            <Swiper
              className={`w-full flex shrink-0 mt-20 SliderItem SliderItem${index}`}
              spaceBetween={50}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },

                760: {
                  slidesPerView: 2,
                },

                980: {
                  slidesPerView: 3,
                },

                1280: {
                  slidesPerView: 4,
                },
              }}
            >
              {ProductList !== null &&
                ProductList[index].item.map((item, i) => {
                  setTimeout(() => {
                    drawStar(item.rating.rate, i, index);
                  }, 1);
                  return (
                    <SwiperSlide
                      className={`w-80 bg-white shrink-0 mr-20 relative ${style.wrapperWidth}`}
                    >
                      <Link to={`/detail/${item.id}`}>
                        <div
                          className={`flex flex-col w-full px-4 py-3 ${style.ProductBackgroundColor}`}
                        >
                          <figure className={`w-full`}>
                            <img
                              src={item.image}
                              alt="상품 이미지"
                              className="w-9/12 h-44 mx-auto"
                            />
                          </figure>
                          <div className="w-full text-left px-4 mt-7 whitespace-nowrap flex flex-col">
                            <h3
                              className={`w-full text-ellipsis overflow-hidden ${style.removeGhost} `}
                            >
                              {item.title}
                            </h3>
                          </div>
                          <div className={`flex px-4 mt-12 relative z-10`}>
                            <span
                              className={`w-full block bottom-0 left-0 box-border ${style.imgposition} z-0 star-${index}-${i}`}
                            ></span>
                            <span>({item.rating.count})</span>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </>
        );
      })}
    </div>
  );
}

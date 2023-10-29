import { Link } from "react-router-dom";
import { productType } from "../componentType/ProductData";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { userDispatch } from "../App";
import { Swiper, SwiperSlide } from "swiper/react";
import Footer from "./Footer";
import style from "../css/only.module.css";
import Header from "./Header";
export default function OnlyProduct() {
  const { productCategory } = useParams();
  const [ProductFilter, setProductFilter] = useState<productType[] | null>(
    null
  );
  const data = useContext(userDispatch);
  const productData: productType[] = [];
  useEffect(() => {
    switch (productCategory) {
      case "fashion":
        data.Data.forEach((item) => {
          if (
            item.category === "women's clothing" ||
            item.category === "men's clothing"
          ) {
            productData.push(item);
          }
        });
        setProductFilter(productData);
        break;
      case "digital":
        data.Data.forEach((item) => {
          if (item.category === "electronics") {
            productData.push(item);
          }
        });
        setProductFilter(productData);
        break;
      case "jewery":
        data.Data.forEach((item) => {
          if (item.category === "jewelery") {
            productData.push(item);
          }
        });
        setProductFilter(productData);
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.Data, productCategory]);
  return (
    <>
      <Header />
      <section
        className={`w-full flex ${style.sectionBackground} ${style.sectionHeight} items-center justify-center`}
      >
        <div className="w-full pl-10 pr-10">
          <Swiper
            className="w-full flex shrink-0"
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
            {ProductFilter &&
              ProductFilter.map((item, i) => {
                return (
                  <SwiperSlide
                    className={`w-full shrink-0 ${style.productItemBackground}`}
                    key={item.id}
                  >
                    <Link to={`/detail/${item.id}`} className="block p-10">
                      <figure className="w-full flex justify-center align-center">
                        <img
                          src={item.image}
                          alt="상품 이미지"
                          className="w-9/12 h-44 block"
                        />
                      </figure>
                      <div className="w-full text-left px-4 mt-7 whitespace-nowrap flex flex-col">
                        <h3
                          className={`w-full text-ellipsis overflow-hidden ${style.removeGhost} ${style.productTitle}`}
                        >
                          {item.title}
                        </h3>
                      </div>
                      <div className={`flex px-4 mt-12 relative z-10`}>
                        <span
                          className={`w-full block box-border ${style.imgposition} z-0 star-0-${i}`}
                        />
                        <span>({item.rating.count})</span>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </section>
      <Footer />
    </>
  );
}

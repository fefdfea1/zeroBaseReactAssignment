import { useDispatch, useSelector } from "react-redux";
import { userDispatch, RootState, clearItem } from "../App";
import { productType } from "../componentType/ProductData";
import { useState, useContext, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Reciept from "./Reciept";
import style from "../css/shopping.module.css";

const changeQuantityPluse = (quality: number[], index: number) => {
  const copy = [...quality];
  copy[index] = copy[index] + 1;
  return copy;
};

const changeQuantityMinuse = (quality: number[], index: number) => {
  const copy = [...quality];
  if (copy[index] > 1) {
    copy[index] = copy[index] - 1;
    return copy;
  } else {
    return copy;
  }
};

const calcAllPrice = (quality: number[], findData: productType[]) => {
  let price = 0;
  for (let i = 0; i < findData.length; i++) {
    price += findData[i].price * quality[i];
  }
  return price;
};

const changeRecieptState = (
  state: React.Dispatch<React.SetStateAction<boolean>>
) => {
  state(true);
};

export default function ShoppingList() {
  const selector = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const data = useContext(userDispatch);
  const findData: productType[] | string = [];
  const [productState, setProductState] = useState(false);
  const [productQuantity, setQuantity] = useState<number[]>([]);
  const [recieptState, setReciept] = useState(false);
  const [Product, setProduct] = useState<productType[]>([]);

  const handleClearItem = () => {
    dispatch(clearItem()); // clearItem 액션을 디스패치
  };

  useEffect(() => {
    const getItemNumData = localStorage.getItem("itemNum");
    //새로고침을 하지 않았을때 상품의 데이터id가 있다면 해당 아이디를 이용하여 상품을 찾고 findData에 push
    if (data.Data.length >= 1) {
      for (let i = 0; i < selector.counter1.idList.length; i++) {
        for (let j = 0; j < data.Data.length; j++) {
          if (data.Data[j].id === selector.counter1.idList[i]) {
            findData.push(data.Data[j]);
            break;
          }
        }
      }
      setProduct(findData);
      localStorage.setItem("shoppingItem", JSON.stringify(findData));
      //중간에 새로고침시 상품의 데이터를 localStorage에서 다시 꺼내옴
    } else {
      const getData = localStorage.getItem("shoppingItem");
      if (getData !== null) {
        const parse: productType[] = JSON.parse(getData);
        findData.push(...parse);
        setProduct(findData);
      }
    }
    //상품이 있을때 새로고침시 모든 상품의 갯수를 1로 다시 맞춤
    if (getItemNumData !== null && getItemNumData.length > 0) {
      const parse = JSON.parse(getItemNumData);
      setQuantity(Array(parse.length).fill(1));
      setProductState(true);
    }
  }, []);

  //중복제거
  return (
    <div>
      {recieptState && <Reciept state={setReciept} />}
      <section
        className={`${style.shoppingHeight} ${style.backgroundColor} relative`}
      >
        <Header />
        <ul className={`w-full mt-10 flex items-center ${style.FontColor}`}>
          <li className="ml-20">홈</li>
          <li className={`ml-6 ${style.arrow} relative`}>장바구니</li>
        </ul>
        <div className="productListContainer mt-28 md:ml-20 flex flex-col justify-center">
          <ul className="flex flex-col max-w-screen-2xl">
            {productState ? (
              Product.map((item, i) => {
                return (
                  <li
                    className={`mobile:mt-10 md:mt-6 ${style.liWidth}`}
                    key={item.id}
                    data-testid="productTitle"
                  >
                    <div
                      className={`productList flex items-center flex mobile:flex-col md:flex-row`}
                    >
                      <div className="left">
                        <figure className="p-10 bg-white rounded-lg">
                          <img
                            src={item.image}
                            alt="상품이미지"
                            style={{ width: "200px", height: "200px" }}
                            className="max-w-none"
                          />
                        </figure>
                      </div>
                      <div className="mobile:w-72 md:w-auto middle md:ml-12 mobile:mt-10">
                        <p
                          className={`${style.FontColor} mb-8 font-bold sm:text-sm lg:text-3xl`}
                        >
                          {item.title}
                        </p>
                        <p
                          className={`${style.FontColor} text-4xl mb-8 font-bold mobile:text-sm lg:text-3xl`}
                          data-testid="price"
                        >
                          {Product
                            ? `$${item.price * productQuantity[i]}`
                            : null}
                        </p>
                        <div className="productQuantity">
                          <button
                            className={`${style.FontColor} ${style.buttonBackgroundColor} p-4  font-bold rounded-l-2xl mobile:text-sm lg:text-3xl`}
                            data-testid="minusButton"
                            onClick={() => {
                              setQuantity(
                                changeQuantityMinuse(productQuantity, i)
                              );
                            }}
                          >
                            -
                          </button>
                          <span
                            className={`ml-7 ${style.FontColor} text-xl font-bold mobile:text-sm lg:text-3xl`}
                            data-testid="productNum"
                          >
                            {productQuantity[i]}
                          </span>
                          <button
                            className={`${style.FontColor}  ${style.buttonBackgroundColor} py-4 px-4 ml-7 font-bold rounded-r-2xl mobile:text-sm lg:text-3xl`}
                            data-testid="plusButton"
                            onClick={() => {
                              setQuantity(
                                changeQuantityPluse(productQuantity, i)
                              );
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })
            ) : (
              <p
                className={`mt-10 ${style.FontColor} mobile:text-sm lg:text-3xl`}
              >
                상품이 존재하지 않습니다
              </p>
            )}
            <div className="ml-auto mb-36">
              {productState && (
                <span
                  className={`${style.FontColor} mobile:text-sm lg:text-3xl`}
                >
                  {`총:`}
                  {calcAllPrice(productQuantity, Product)}$
                </span>
              )}

              {productState && (
                <button
                  className={`ml-5 p-4 text-white ${style.buttonBackgroundColor} rounded-2xl mobile:text-sm lg:text-3xl md: mr-20 lg:mr-0`}
                  onClick={() => {
                    handleClearItem();
                    changeRecieptState(setReciept);
                    setProduct([]);
                    setProductState(false);
                  }}
                  data-tetstid="buyButton"
                >
                  구매하기
                </button>
              )}
            </div>
          </ul>
        </div>
      </section>
      <Footer />
    </div>
  );
}

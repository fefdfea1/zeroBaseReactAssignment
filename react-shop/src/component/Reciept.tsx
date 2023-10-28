import { XbuttonClickEvent } from "../script/reciept";
import style from "../css/reciept.module.css";
import { productType } from "../componentType/ProductData";

export default function Reciept(props: {
  state: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const getData = localStorage.getItem("shoppingItem");
  let parseData: productType[] = [];
  if (typeof getData === "string") {
    parseData = JSON.parse(getData);
    localStorage.setItem("shoppingItem", JSON.stringify([]));
    localStorage.setItem("itemNum", JSON.stringify([]));
  }
  return (
    <div
      className={`w-full h-full fixed ${style.recieptPosition} z-50 ${style.background} flex justify-center items-center`}
    >
      <div
        className={`productContainer w-4/6 pb-10 px-10 ${style.productBackground} relative`}
      >
        <p
          className={`w-full flex justify-center text-4xl mt-10 ${style.FontColor}`}
        >
          구매한 상품목록
        </p>
        <button
          className={`absolute right-10 top-10 text-4xl ${style.FontColor}`}
          onClick={() => {
            XbuttonClickEvent(props.state);
          }}
        >
          X
        </button>
        <ul className={`overflow-y-auto ${style.recieptStyle}`}>
          {parseData.map((item) => {
            return (
              <li key={item.id} className="lg:mt-3 mobile:mt-10">
                <div className="flex items-center mobile:flex-col">
                  <figure className="overflow-hidden">
                    <img
                      src={item.image}
                      alt="상품 이미지 사진"
                      style={{ width: "100px", height: "100px" }}
                    />
                  </figure>
                  <div
                    className={`title ml-5 text-2xl ${style.FontColor} mobile:mt-10`}
                  >
                    {item.title}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

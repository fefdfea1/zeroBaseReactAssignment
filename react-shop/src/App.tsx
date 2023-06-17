import { useState, useEffect } from "react";
import MainPage from "./component/MainPage";
import Product_fashion from "./component/Product_fashion";
import Product_accessory from "./component/product_accessory";
import Product_digital from "./component/product_digital";
import Detail from "./component/Detail";
import React from "react";
import Product_only_fashionItem from "./component/Product_only_fashionItem";
import Product_only_accessoty from "./component/Product_only_accessoty";
import Product_only_digital from "./component/Product_only_digital";
import ShoppingList from "./component/ShoppingList";
import { getProductData } from "./script/fetch";
import { productType } from "./componentType/ProductData";
import { Route, Routes } from "react-router-dom";
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

const initValue: { idList: number[] } = {
  idList: [],
};
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const counterSlice = createSlice({
  name: "counter",
  initialState: initValue,
  reducers: {
    increment(state, action: PayloadAction<number>) {
      if (state.idList.includes(action.payload)) {
        alert("해당상품이 이미 존재합니다");
      } else {
        state.idList.push(action.payload);
        const getData = localStorage.getItem("itemNum");
        const getorderData = localStorage.getItem("orderData");
        if (getData === null) {
          const setData = JSON.stringify([action.payload]);
          localStorage.setItem("itemNum", setData);
        } else {
          const parseData = JSON.parse(getData);
          const combineData = JSON.stringify([...parseData, action.payload]);
          localStorage.setItem("itemNum", combineData);
        }
      }
    },
    decrement(state, action) {
      state.idList.filter((item) => {
        return item !== action.payload;
      });
      const getData = localStorage.getItem("itemNum");
      if (getData !== null) {
        const parse = JSON.parse(getData);
        const filter = parse.filter((item: number[]) => {
          return item !== action.payload;
        });
        localStorage.setItem("itemNum", JSON.stringify(filter));
      }
    },
    changeNum(state, action) {
      state.idList = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    counter1: counterSlice.reducer,
  },
});
export const { increment, decrement, changeNum } = counterSlice.actions;
export const userDispatch = React.createContext<{
  Data: productType[];
}>({ Data: [] });
function App() {
  const [Data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await getProductData();
      const result = await data.json();
      setData(result);
    };
    getData();
  }, []);

  return (
    <div className="wrap">
      <Provider store={store}>
        <userDispatch.Provider value={{ Data }}>
          <Routes>
            <Route path="/" Component={MainPage} />
            <Route path="/fashion" Component={Product_fashion} />
            <Route path="/men's clothing/detail/:id" Component={Detail} />
            <Route path="/women's clothing/detail/:id" Component={Detail} />
            <Route path="/fashion/detail/:id" Component={Detail} />
            <Route path="/fashion/only" Component={Product_only_fashionItem} />
            <Route path="/accessoryData" Component={Product_accessory} />
            <Route path="/jewelery/detail/:id" Component={Detail} />
            <Route path="/accessory/only" Component={Product_only_accessoty} />
            <Route path="/digitalData" Component={Product_digital} />
            <Route path="/electronics/detail/:id" Component={Detail} />
            <Route path="/digital/only" Component={Product_only_digital} />
            <Route path="/shoppingList" Component={ShoppingList} />
          </Routes>
        </userDispatch.Provider>
      </Provider>
    </div>
  );
}

export default App;

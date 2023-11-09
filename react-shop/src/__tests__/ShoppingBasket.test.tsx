import { fireEvent, screen, waitFor } from "@testing-library/dom";
import { renderWithRouterMatch } from "./Header.test";
import { Route } from "react-router-dom";
import ShoppingList from "../component/ShoppingList";
import Detail from "../component/Detail";
import { data } from "../__mock__/mockApi";

describe("장바구니 테스트", () => {
  it("상품이 없을때", () => {
    renderWithRouterMatch(
      () => (
        <>
          <Route path="/shoppingList" element={<ShoppingList />} />
        </>
      ),
      "/shoppingList"
    );
    const noProductText = screen.getByText("상품이 존재하지 않습니다");
    expect(noProductText).toBeInTheDocument();
  });

  it("상품이 존재할때 ui 및 출력 및 구매하기 클릭시 영수증 출력 여부 테스트", async () => {
    renderWithRouterMatch(
      () => (
        <>
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/shoppingList" element={<ShoppingList />} />
        </>
      ),
      "/detail/1"
    );
    const addtoCart = screen.getByText(/장바구니에 담기/);
    const moveCardButton = screen.getByTestId("shoppingBasket");
    fireEvent.click(addtoCart);
    fireEvent.click(moveCardButton);

    await waitFor(() => {
      const productTitle = screen.getByTestId("productTitle");
      const buyButton = screen.getByText(/구매하기/);
      const price = screen.getByTestId("price");
      const FirstDirectory = screen.getByText(/홈/);
      const SecondDirectory = screen.getByText(/장바구니/);
      fireEvent.click(buyButton);
      const recipt = screen.getByTestId("Reciept");
      expect(FirstDirectory).toBeInTheDocument();
      expect(SecondDirectory).toBeInTheDocument();
      expect(productTitle).toHaveTextContent(data.Data[0].title);
      expect(recipt).toBeInTheDocument();
      expect(price).toHaveTextContent(`$${data.Data[0].price}`);
    });
  });

  it("상품이 존재할때 상품 수량 증가 버튼 클릭시 작동여부 테스트", () => {
    renderWithRouterMatch(
      () => (
        <>
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/shoppingList" element={<ShoppingList />} />
        </>
      ),
      "/detail/1"
    );
    const addtoCart = screen.getByText(/장바구니에 담기/);
    const moveCardButton = screen.getByTestId("shoppingBasket");
    fireEvent.click(addtoCart);
    fireEvent.click(moveCardButton);
    const minusButton = screen.getByTestId("minusButton");
    const plusButton = screen.getByTestId("plusButton");
    const productNum = screen.getByTestId("productNum");

    fireEvent.click(plusButton);
    expect(productNum).toHaveTextContent("2");
    fireEvent.click(minusButton);
    expect(productNum).toHaveTextContent("1");
  });
});

import { renderWithRouterMatch } from "./Header.test";
import { screen, waitFor } from "@testing-library/dom";
import { Route } from "react-router-dom";
import Detail from "../component/Detail";
import { data } from "../__mock__/mockApi";

describe("detail 컴포넌트 테스트", () => {
  it("상품 제목, 카테고리 출력 여부", async () => {
    renderWithRouterMatch(
      () => (
        <>
          <Route path="/detail/:id" element={<Detail />} />
        </>
      ),
      "/detail/1"
    );

    await waitFor(() => {
      const productCategory = screen.getByText("men's clothing");
      const productTitle = screen.getAllByText(
        "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
      );
      const productDesc = screen.getByTestId("description");
      expect(productCategory).toBeInTheDocument();
      expect(productTitle).toHaveLength(2);
      expect(productCategory).toHaveTextContent(data.Data[0].category);
      expect(productDesc).toHaveTextContent(data.Data[0].description);
      productTitle.forEach((item) => {
        expect(item).toHaveTextContent(data.Data[0].title);
      });
    });
  });

  it("별점 출력 여부 테스트", () => {
    renderWithRouterMatch(
      () => (
        <>
          <Route path="/detail/:id" element={<Detail />} />
        </>
      ),
      "/detail/1"
    );

    const productStar = screen.getByTestId("fillStar");
    expect(productStar).toBeInTheDocument();
  });

  it("버튼 출력 여부 테스트", () => {
    const buttonText = ["장바구니에 담기", "장바구니로 이동"];
    renderWithRouterMatch(
      () => (
        <>
          <Route path="/detail/:id" element={<Detail />} />
        </>
      ),
      "/detail/1"
    );

    const buttons = screen.getAllByTestId("shoppingButton");
    expect(buttons).toHaveLength(2);
    //버튼 텍스트 체크
    buttons.forEach((item, index) => {
      expect(item).toHaveTextContent(buttonText[index]);
    });
  });

  it("상품가격 출력여부 테스트", () => {
    renderWithRouterMatch(
      () => (
        <>
          <Route path="/detail/:id" element={<Detail />} />
        </>
      ),
      "/detail/1"
    );
    const price = screen.getByTestId("price");
    expect(price).toHaveTextContent(`$${data.Data[0].price}`);
  });
});

jest.mock("swiper/react", () => ({
  Swiper: ({ children }: { children: React.ReactElement }) => (
    <div data-testid="swiperItem">{children}</div>
  ),
  SwiperSlide: ({ children }: { children: React.ReactElement }) => (
    <div>{children}</div>
  ),
  useSwiper: () => ({
    swiper: {
      slideNext: () => {},
    },
  }),
}));

jest.mock("swiper", () => ({
  default: jest.fn(),
  Thumbs: jest.fn(),
}));

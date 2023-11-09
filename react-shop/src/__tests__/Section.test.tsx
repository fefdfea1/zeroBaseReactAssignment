import { screen } from "@testing-library/dom";
import { Route } from "react-router-dom";
import MainProductList from "./../component/MainProductList";
import { renderWithRouterMatch } from "./Header.test";

describe("리엑트 샵 mainProduct 테스트", () => {
  it("상품들 swiper가 정상적으로 생성이 되는가?", () => {
    renderWithRouterMatch(
      () => (
        <>
          <Route path="/" element={<MainProductList />} />
        </>
      ),
      "/"
    );
    const swiper = screen.getAllByTestId("swiperItem");
    expect(swiper.length).toBe(3);
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

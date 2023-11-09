import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import {
  BrowserRouter,
  MemoryRouter,
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import Header from "../component/Header";
import { Provider } from "react-redux";
import { data } from "../__mock__/mockApi";
import { userEvent } from "@testing-library/user-event";
import OnlyProduct from "../component/OnlyProduct";
import { userDispatch } from "../App";
import { store } from "../App";
import ShoppingList from "../component/ShoppingList";

export const renderWithRouterMatch = (
  RouteFn: Function,
  route: string | string[] = "/"
) => {
  return render(
    <MemoryRouter initialEntries={typeof route === "string" ? [route] : route}>
      <Provider store={store}>
        <userDispatch.Provider value={data}>
          <Routes>{RouteFn()}</Routes>
        </userDispatch.Provider>
      </Provider>
    </MemoryRouter>
  );
};

describe("header 테스트", () => {
  it("Header Nav 영역 출력 테스트", () => {
    render(
      <Provider store={store}>
        <userDispatch.Provider value={data}>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </userDispatch.Provider>
      </Provider>
    );
    const logo = screen.getByTestId("mainLink");
    const fashionElement = screen.getByTestId("mainFashion");
    const jewelryElements = screen.getByTestId("mainJewery");
    const digitalElements = screen.getByTestId("mainDigital");

    expect(logo).toBeInTheDocument();
    expect(fashionElement).toBeInTheDocument();
    expect(jewelryElements).toBeInTheDocument();
    expect(digitalElements).toBeInTheDocument();
  });

  it("햄버거 메뉴 출력 여부 확인", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    const hambergerLinkElement = screen.getByTestId("hambergerMainLink");
    const hambergerFashion = screen.getByTestId("hambergerFashion");
    const hambergerJewery = screen.getByTestId("hambergerJewery");
    const hambergerDigital = screen.getByTestId("hambergerDigital");

    expect(hambergerLinkElement).toBeInTheDocument();
    expect(hambergerFashion).toBeInTheDocument();
    expect(hambergerJewery).toBeInTheDocument();
    expect(hambergerDigital).toBeInTheDocument();
  });

  it("일반 NAV logo를 클릭 하였을때 정상적으로 경로 이동이 생기는가?", () => {
    renderWithRouterMatch(
      () => (
        <>
          <Route path="/" element={<Header />} />
        </>
      ),
      "/"
    );

    const logo = screen.getByTestId("mainLink");
    userEvent.click(logo);
    const fashionElement = screen.getAllByText("패션");
    expect(fashionElement).toHaveLength(2);
  });

  it("일반 Nav 패션 클릭시 정상적으로 라우팅이 작동하는가?", () => {
    renderWithRouterMatch(
      () => (
        <>
          <Route path="/" element={<Header />} />
          <Route
            path="/OnlyProduct/:productCategory"
            element={<OnlyProduct />}
          />
        </>
      ),
      "/"
    );

    const fashionButton = screen.getByTestId("mainFashion");
    expect(fashionButton).toBeInTheDocument();
    fireEvent.click(fashionButton);
    const swiperDom = screen.getByTestId("swiper");
    expect(swiperDom).toBeInTheDocument();
  });

  it("헤더 액세서리 클릭시 정상적으로 라우팅 되는가?", () => {
    renderWithRouterMatch(
      () => (
        <>
          <Route path="/" element={<Header />} />
          <Route
            path="/OnlyProduct/:productCategory"
            element={<OnlyProduct />}
          />
        </>
      ),
      "/"
    );

    const fashionButton = screen.getByTestId("mainJewery");
    expect(fashionButton).toBeInTheDocument();
    fireEvent.click(fashionButton);
    const swiperDom = screen.getByTestId("swiper");
    expect(swiperDom).toBeInTheDocument();
  });

  it("헤더 디지털 클릭시 정상적으로 라우팅 되는가?", () => {
    renderWithRouterMatch(
      () => (
        <>
          <Route path="/" element={<Header />} />
          <Route
            path="/OnlyProduct/:productCategory"
            element={<OnlyProduct />}
          />
        </>
      ),
      "/"
    );

    const fashionButton = screen.getByTestId("mainDigital");
    expect(fashionButton).toBeInTheDocument();
    fireEvent.click(fashionButton);
    const swiperDom = screen.getByTestId("swiper");
    expect(swiperDom).toBeInTheDocument();
  });

  it("다크 , 화이트 모드 클릭시 변경이 일어나는가?", () => {
    renderWithRouterMatch(
      () => (
        <>
          <Route path="/" element={<Header />} />
        </>
      ),
      "/"
    );
    const WhiteButton = screen.getByTestId("whiteMode");
    fireEvent.click(WhiteButton);
    const DarkButton = screen.getByTestId("darkMode");
    expect(DarkButton).toMatchInlineSnapshot(`
<button
  data-testid="darkMode"
>
  <svg
    class="inline-flex justify-between items-center pointer-events-none svgFill"
    fill="currentColor"
    height="1em"
    stroke="currentColor"
    stroke-width="0"
    style="width: 26px; height: 26px;"
    viewBox="0 0 16 16"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"
    />
  </svg>
</button>
`);
  });

  it("장바구니를 클릭시 정상적으로 이동이 되는가?", async () => {
    renderWithRouterMatch(
      () => (
        <>
          <Route path="/" element={<Header />} />
          <Route path="/shoppingList" element={<ShoppingList />} />
        </>
      ),
      "/"
    );

    const shoppingBasketbutton = screen.getByTestId("shoppingBasket");
    expect(shoppingBasketbutton).toBeInTheDocument();

    fireEvent.click(shoppingBasketbutton);

    const buyButton = screen.getByText(/장바구니/);
    expect(buyButton).toBeInTheDocument();
  });
});

jest.mock("swiper/react", () => ({
  Swiper: ({ children }: { children: React.ReactElement }) => (
    <div>{children}</div>
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

import Footer from "../component/Footer";
import { screen } from "@testing-library/dom";
import { renderWithRouterMatch } from "./Header.test";
import { Route } from "react-router-dom";

describe("Footer 영역 테스트", () => {
  it("icon및 이미지 출력 테스트", () => {
    renderWithRouterMatch(
      () => (
        <>
          <Route path="/" element={<Footer />} />
        </>
      ),
      "/"
    );
    const visaCard = screen.getByTestId("VisaCard");
    const DiscoverCard = screen.getByTestId("DiscoverCard");
    const MasterCard = screen.getByTestId("MasterCard");
    const PaypalCard = screen.getByTestId("Paypal");
    const FaceBookIcon = screen.getByTestId("FaceBook");
    const InstaGramIcon = screen.getByTestId("Instagram");
    const GithubIcon = screen.getByTestId("Github");

    expect(visaCard).toBeInTheDocument();
    expect(DiscoverCard).toBeInTheDocument();
    expect(MasterCard).toBeInTheDocument();
    expect(PaypalCard).toBeInTheDocument();
    expect(FaceBookIcon).toBeInTheDocument();
    expect(InstaGramIcon).toBeInTheDocument();
    expect(GithubIcon).toBeInTheDocument();
  });
});

import Header from "./Header";
import BannerSlide from "./BannerSlide";
import Footer from "./Footer";
import "../css/main.css";
import style from "../css/main.module.css";
import MainProductList from "./MainProductList";

export default function MainPage() {
  return (
    <div className="relative">
      <Header />
      <BannerSlide />
      <section className={`${style.sectionBackgorund} ${style.sectionPadding}`}>
        <MainProductList />
      </section>
      <Footer />
    </div>
  );
}

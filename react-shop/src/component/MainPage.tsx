import Header from "./Header";
import BannerSlide from "./BannerSlide";
import Product_fashion from "./Product_fashion";
import Product_accessory from "./product_accessory";
import Product_digital from "./product_digital";
import Footer from "./Footer";
import "../css/main.css";
import style from "../css/main.module.css";

export default function MainPage() {
  return (
    <div>
      <Header />
      <BannerSlide />
      <section className={`${style.sectionBackgorund} ${style.sectionPadding}`}>
        <Product_fashion />
        <Product_accessory />
        <Product_digital />
      </section>
      <Footer />
    </div>
  );
}

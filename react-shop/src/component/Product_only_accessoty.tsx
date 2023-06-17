import Header from "./Header";
import Footer from "./Footer";
import Product_accessory from "../component/product_accessory";
import styles from "../css/only.module.css";

export default function Product_only_accessoty() {
  return (
    <div>
      <section
        className={`${styles.sectionBackground} ${styles.sectionHeight} pb-7`}
      >
        <Header />
        <ul className={`w-full mt-10 ${styles.fontColor} flex items-center`}>
          <li className="ml-20">홈</li>
          <li className={`ml-6 ${styles.arrow} relative`}>액세서리</li>
        </ul>
        <Product_accessory />
      </section>
      <Footer />
    </div>
  );
}

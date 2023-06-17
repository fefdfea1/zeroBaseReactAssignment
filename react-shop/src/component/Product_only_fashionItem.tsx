import Header from "./Header";
import Footer from "./Footer";
import Product_fashion from "./Product_fashion";
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
          <li className={`ml-6 ${styles.arrow} relative`}>의류</li>
        </ul>
        <Product_fashion />
      </section>
      <Footer />
    </div>
  );
}

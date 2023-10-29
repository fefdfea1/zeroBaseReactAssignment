import style from "../css/Hamberger.module.css";
import "../css/Hamberger.css";
import { Link } from "react-router-dom";
export default function Hamberger() {
  return (
    <>
      <input type="checkbox" className="bg-transparent hidden" id="hamberger" />
      <label
        htmlFor="hamberger"
        className="block w-10 h-8 relative cursor-pointer z-50"
      >
        <span className={`w-full h-1 rounded-2xl block `} />
        <span
          className={`w-full h-1 rounded-2xl  ${style.initHambergerItem2} block`}
        />
        <span
          className={`w-full h-1 rounded-2xl block  ${style.initHambergerItem3}`}
        />
      </label>
      <div className={`fixed left-0 top-0  w-5/12 h-screen slideMenu z-40`}>
        <ul className="w-full h-full flex flex-col justify-center items-center slideMenuUl">
          <li>
            <Link to={"/"}>메인화면</Link>
          </li>
          <li>
            <Link to={"/OnlyProduct/fashion"}>패션</Link>
          </li>
          <li>
            <Link to={"/OnlyProduct/jewery"}>액세서리</Link>
          </li>
          <li>
            <Link to={"/OnlyProduct/digital"}>디지털</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

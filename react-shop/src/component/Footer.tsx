import style from "../css/footer.module.css";
import { FaGithubAlt, FaFacebookSquare } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai";
export default function Footer() {
  return (
    <footer
      className={`py-6 ${style.footerBackground} w-full ${style.footerBorder}`}
    >
      <div className="footerContainer w-full h-full flex justify-center items-center flex-col">
        <div className="cardList flex justify-center items-center">
          <img src="/public/svg/visaCard.svg" alt="카드" className="w-10" />
          <img src="/public/svg/discoverCard.svg" alt="카드" className="w-10" />
          <img src="/public/svg/masterCard.svg" alt="카드" className="w-10" />
          <img src="/public/svg/PaypalCard.svg" alt="카드" className="w-10" />
        </div>
        <div className="shareOption w-full flex justify-center content-center mt-4">
          <a href="https://www.facebook.com/0base" target="_blank">
            <FaFacebookSquare
              style={{
                width: "25px",
                height: "25px",
                marginRight: "20px",
              }}
              className={`${style.footerSvgColor}`}
            />
          </a>
          <a
            href="https://www.instagram.com/zerobase.official/"
            target="_blank"
          >
            <AiOutlineInstagram
              style={{
                width: "25px",
                height: "25px",
                marginRight: "20px",
              }}
              className={`${style.footerSvgColor}`}
            />
          </a>

          <a href="https://github.com/" target="_blank">
            <FaGithubAlt
              style={{
                width: "25px",
                height: "25px",
              }}
              className={`${style.footerSvgColor}`}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

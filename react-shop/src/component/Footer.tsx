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
          <img
            src="/svg/visaCard.svg"
            alt="카드"
            className="w-10"
            data-testid="VisaCard"
          />
          <img
            src="/svg/discoverCard.svg"
            alt="카드"
            className="w-10"
            data-testid="DiscoverCard"
          />
          <img
            src="/svg/masterCard.svg"
            alt="카드"
            className="w-10"
            data-testid="MasterCard"
          />
          <img
            src="/svg/PayPalCard.svg"
            alt="카드"
            className="w-10"
            data-testid="Paypal"
          />
        </div>
        <div className="shareOption w-full flex justify-center content-center mt-4">
          <a
            href="https://www.facebook.com/0base"
            target="_blank"
            data-testid="FaceBook"
          >
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
            data-testid="Instagram"
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

          <a href="https://github.com/" target="_blank" data-testid="Github">
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

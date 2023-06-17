import detailStyle from "../css/detail.module.css";
type ratingType = (rating: { rate: number; count: number }) => void;

const changeColorStar: ratingType = (rating) => {
  const starContainer = document.querySelectorAll(".starContainer li");
  for (let i = 0; i < Math.floor(rating.rate); i++) {
    if (starContainer[i] instanceof HTMLLIElement) {
      starContainer[i].classList.add(`${detailStyle.Star}`);
    }
  }
};

export const drawStar: ratingType = (rating) => {
  const starContainer = document.querySelectorAll(".starContainer li");
  if (rating.rate >= Math.floor(rating.rate) + 0.5) {
    changeColorStar(rating);
    starContainer[Math.floor(rating.rate)].classList.add(
      `${detailStyle.halfStar}`
    );
  } else {
    for (let i = 0; i < Math.floor(rating.rate); i++) {
      if (starContainer[i] instanceof HTMLLIElement) {
        changeColorStar(rating);
      }
    }
  }
};

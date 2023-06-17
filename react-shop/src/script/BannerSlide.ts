import { dataIndex, ButtonClickType } from "../componentType/Slide";
import { bannerColor } from "../componentColor/bannerColor";
let currentSlide = 0;
const timer = 3000;
let bannerSlideUl: HTMLUListElement;
let bannerSlide: NodeList;
const windowWidth = window.innerWidth;
let timeId = 0;
const initSlideUlWidth = (ref: HTMLUListElement) => {
  bannerSlide = ref.childNodes;
  bannerSlideUl = ref;
  const listLeng = bannerSlide.length;
  if (bannerSlideUl instanceof HTMLUListElement) {
    bannerSlideUl.style.width = listLeng * windowWidth + "px";
  }
  if (timeId === 0) {
    moveinfiniteSlideImage(timer);
    DotButtonInit();
  }
};

const moveinfiniteSlideImage = (timer: number) => {
  timeId = setInterval(imageSlide, timer);
};

const imageSlide = (click?: string | number, index?: number) => {
  let translateX = 0;

  if (index !== undefined) {
    currentSlide = index;
    translateX = currentSlide * windowWidth;
    if (bannerSlideUl instanceof HTMLUListElement) {
      bannerSlideUl.style.transform = `translateX(-${translateX}px)`;
      chageDotSlide(index);
      moveinfiniteSlideImage(timer);
    }
    return;
  }

  if (typeof click === "string") {
    currentSlide--;
    if (currentSlide < 0) {
      currentSlide = 2;
      translateX = currentSlide * windowWidth;
    }

    translateX = -(currentSlide * windowWidth);

    if (bannerSlideUl instanceof HTMLUListElement) {
      bannerSlideUl.style.transform = `translateX(${translateX}px)`;
      chageDotSlide();
    }
    return;
  }
  currentSlide++;
  if (currentSlide > bannerSlide.length - 1) {
    currentSlide = 0;
    translateX = 0;
  }
  if (bannerSlideUl instanceof HTMLUListElement) {
    chageDotSlide();
    translateX = -(currentSlide * windowWidth);
    bannerSlideUl.style.transform = `translateX(${translateX}px)`;
  }
};

const leftButtonClick = (info: string) => {
  imageSlide(info);
};

const rightButtonClick = () => {
  imageSlide();
};

export const clickDotButton = (event: ButtonClickType) => {
  const AllDotButton = document.querySelectorAll(".dotButton");
  const target = event.target;
  clearInterval(timeId);
  if (target instanceof HTMLButtonElement) {
    clearDot();
    let index: dataIndex = target.dataset.index;
    if (typeof index === "string") {
      index = Number(index);
      const targetButton = AllDotButton[index] as HTMLButtonElement;
      targetButton.style.backgroundColor = bannerColor.ActiveDot;
      imageSlide(0, index);
    }
  }
};

const clearDot = () => {
  const AllDotButton = document.querySelectorAll(".dotButton");
  for (const i of AllDotButton) {
    if (i instanceof HTMLButtonElement) {
      i.style.backgroundColor = bannerColor.deActiveDot;
    }
  }
};

const chageDotSlide = (index?: number) => {
  const AllDotButton = document.querySelectorAll(".dotButton");
  if (index !== undefined) {
    const targetNode = AllDotButton[index];
    if (targetNode instanceof HTMLButtonElement) {
      targetNode.style.backgroundColor = bannerColor.ActiveDot;
      return;
    }
  }
  clearDot();

  const targetNode = AllDotButton[currentSlide];
  if (targetNode instanceof HTMLButtonElement) {
    targetNode.style.backgroundColor = bannerColor.ActiveDot;
  }
};

const DotButtonInit = () => {
  const firstDotButton = document.querySelector(".dotButton");
  if (firstDotButton instanceof HTMLButtonElement) {
    firstDotButton.style.backgroundColor = bannerColor.ActiveDot;
  }
};

export const sideButtonClick = (event: ButtonClickType) => {
  const target = event.target;
  if (target instanceof HTMLButtonElement) {
    clearInterval(timeId);
    if (target.classList.contains("prevButton")) {
      const data = target.dataset.prev;
      if (typeof data === "string") {
        leftButtonClick(data);
        moveinfiniteSlideImage(timer);
      }
    } else if (target.classList.contains("nextButton")) {
      rightButtonClick();
      moveinfiniteSlideImage(timer);
    }
  }
};

export const init = (ref: HTMLUListElement) => {
  initSlideUlWidth(ref);
};

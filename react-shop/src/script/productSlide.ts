let slideContainer: HTMLUListElement;
let slideItem: NodeList;

const setInit = (ref: HTMLUListElement) => {
  slideContainer = ref;
  slideItem = ref.childNodes;
  let getMargin: string | number = "";
  const slideItemLength = slideItem.length;
  const imgBox = slideItem[0];
  let imgBoxWidth = 0;
  if (imgBox instanceof HTMLLIElement) {
    imgBoxWidth = Number(getComputedStyle(imgBox).width);
    getMargin = getComputedStyle(imgBox).marginLeft;
    getMargin = Number(getMargin.replace("px", ""));
  }
  if (typeof getMargin === "number") {
    const margin = getMargin * slideItemLength;
    if (slideContainer instanceof HTMLUListElement) {
      if (imgBoxWidth !== null) {
        slideContainer.style.width =
          imgBoxWidth * slideItemLength + margin + "px";
      }
    }
  }
};

export const clickSlide = (
  e: React.MouseEvent<HTMLButtonElement>,
  currentUl: HTMLUListElement,
  setmoveX: React.Dispatch<React.SetStateAction<number>>,
  moveX: number
) => {
  slideContainer = currentUl;
  const target = e.target as HTMLButtonElement;
  const dataset = target.dataset.event;
  if (target instanceof HTMLButtonElement) {
    let targetMove = moveX;
    let moveIndex = 0;
    if (currentUl.childNodes.length >= 8) {
      moveIndex = 20;
    } else {
      moveIndex = 40;
    }
    if (dataset === "left") {
      targetMove = targetMove + moveIndex;
      setmoveX(targetMove);
    }
    if (dataset === "right") {
      targetMove = targetMove - moveIndex;
      setmoveX(targetMove);
    }

    if (targetMove > 0) {
      targetMove = 0;
      setmoveX(targetMove);
    } else if (targetMove <= -100) {
      targetMove = 0;
      setmoveX(targetMove);
    }

    slideContainer.style.transform = `translateX(${targetMove}%)`;
  }
};

export const init = (refUl: HTMLUListElement) => {
  setInit(refUl);
};

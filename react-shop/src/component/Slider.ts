const mousePosition = {
  mouseDownPosition: 0,
  mouseUpPosition: 0,
};

const touchPosition = {
  touchStartPosition: 0,
  touchEndPosition: 0,
};

let translateX = 0;

let mouseClickState = false;

export const mouseDown = (event: any) => {
  mousePosition.mouseDownPosition = 0;
  mouseClickState = true;
  console.log(mouseClickState);
  const nowMouseX = event.clientX;
  mousePosition.mouseDownPosition = nowMouseX;
};

export const mouseUp = (event: any) => {
  mousePosition.mouseUpPosition = 0;
  mouseClickState = false;
  console.log(mouseClickState);
  const nowMouseX = event.clientX;
  mousePosition.mouseUpPosition = nowMouseX;
};

export const mouseMove = (event: any) => {
  if (mouseClickState) {
    const target = event.target.closest(".SliderItem") as HTMLLIElement;
    if (target) {
      const clientX = event.clientX;
      translateX = mousePosition.mouseDownPosition - clientX;
      if (mousePosition.mouseDownPosition - clientX > 0) {
        target.style.transform = `translateX(-${translateX}px)`;
      } else {
        target.style.transform = `translateX(${
          mousePosition.mouseDownPosition - clientX
        }px)`;
      }
      console.log();
    }
  }
};

export const touchStart = (event: any) => {
  touchPosition.touchStartPosition = 0;
  const nowMouseX = event.clientX;
  touchPosition.touchStartPosition = nowMouseX;
};

export const touchEnd = (event: any) => {
  touchPosition.touchEndPosition = 0;
  const nowMouseX = event.clientX;
  touchPosition.touchEndPosition = nowMouseX;
};

export const drawStar = (rating: number, i: number, index: number) => {
  const targetStar = document.querySelector(
    `.star-${index}-${i}`
  ) as HTMLSpanElement;
  if (targetStar) {
    const firstNum = Number(String(rating).slice(0, 1));
    switch (firstNum / 1) {
      case 1:
        targetStar.style.backgroundPosition = `0% 70%`;
        break;
      case 2:
        targetStar.style.backgroundPosition = `0% 57%`;
        break;
      case 3:
        targetStar.style.backgroundPosition = `0% 44%`;
        break;
      case 4:
        targetStar.style.backgroundPosition = `0% 30%`;
        break;
      case 5:
        targetStar.style.backgroundPosition = `0% 17%`;
        break;
    }
  }
};

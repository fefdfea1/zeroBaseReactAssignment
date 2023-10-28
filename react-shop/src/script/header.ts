let darkmode = true;
const getdata = localStorage.getItem("viewMode");
export const changeWhiteMode = () => {
  if (darkmode) {
    darkmode = false;
    localStorage.setItem("viewMode", "false");
  }
  document.documentElement.style.setProperty(
    "--headerColor",
    "rgb(255,255,255)"
  );
  document.documentElement.style.setProperty(
    "--productBackGroundColor",
    "rgb(255,255,255)"
  );
  document.documentElement.style.setProperty(
    "--footerBackgroundColor",
    "rgb(255,255,255)"
  );
  document.documentElement.style.setProperty(
    "--headerSvgFillColor",
    "rgb(0,0,0)"
  );
  document.documentElement.style.setProperty("--headerFontColor", "rgb(0,0,0)");
  document.documentElement.style.setProperty(
    "--headerSearchBoxColor",
    "rgb(209, 212, 219)"
  );
  document.documentElement.style.setProperty(
    "--footerBackgroundColor",
    "rgb(242, 242, 242)"
  );
  document.documentElement.style.setProperty(
    "--productDescBackgroundColor",
    "rgb(243, 244, 246)"
  );
  document.documentElement.style.setProperty(
    "--productBorderColor",
    "rgb(231, 231, 232)"
  );
  document.documentElement.style.setProperty(
    "--productItemBackgorundWhiteMode",
    "rgb(0,0,0)"
  );

  document.documentElement.style.setProperty(
    "--recieptProductBackgroundCoor",
    "rgb(211,211,211)"
  );

  document.documentElement.style.setProperty("--whiteBg", "rgb(211,211,211)");
};

export const changeDarkMode = () => {
  if (!darkmode) {
    darkmode = true;
    localStorage.setItem("viewMode", "true");
  }
  document.documentElement.style.setProperty(
    "--headerColor",
    "rgb(25, 30, 36)"
  );
  document.documentElement.style.setProperty(
    "--productBackGroundColor",
    "rgb(42, 48, 60)"
  );
  document.documentElement.style.setProperty(
    "--productDescBackgroundColor",
    "rgb rgb(56, 65, 82)"
  );
  document.documentElement.style.setProperty(
    "--footerBackgroundColor",
    "rgb(37, 41, 52)"
  );
  document.documentElement.style.setProperty(
    "--headerSvgFillColor",
    "rgb(255, 255, 255)"
  );
  document.documentElement.style.setProperty("--headerFontColor", "rgb(0,0,0)");
  document.documentElement.style.setProperty(
    "--headerSearchBoxColor",
    "rgb(76, 85, 100)"
  );

  document.documentElement.style.setProperty(
    "--productBorderColor",
    "rgb(45, 52, 62)"
  );

  document.documentElement.style.setProperty(
    "--headerFontColor",
    "rgb(255,255,255)"
  );
  document.documentElement.style.setProperty(
    "--productItemBackgorundWhiteMode",
    "rgb(42, 48, 60)"
  );

  document.documentElement.style.setProperty("--whiteBg", "rgb(255,255,255)");

  document.documentElement.style.setProperty(
    "--recieptProductBackgroundCoor",
    "rgb(15, 23, 42)"
  );
};

if (getdata !== null) {
  const parse = JSON.parse(getdata);
  if (!parse) {
    changeWhiteMode();
  }
}

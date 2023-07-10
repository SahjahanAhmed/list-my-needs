//settheme
selectTheme.addEventListener("change", (e) => {
  let themes = {
    theme: true,
    whichTheme: e.target.value,
  };
  localStorage.setItem("themes", JSON.stringify(themes));
});

//setmode
selectMode.addEventListener("change", (e) => {
  let modes = {
    mode: true,
    whichMode: e.target.value,
  };
  localStorage.setItem("modes", JSON.stringify(modes));
});

//getThemeLS
const getThemeLS = () => {
  return localStorage.getItem("themes")
    ? JSON.parse(localStorage.getItem("themes"))
    : null;
};

//getModeLS
const getModeLS = () => {
  return localStorage.getItem("modes")
    ? JSON.parse(localStorage.getItem("modes"))
    : null;
};

window.addEventListener("DOMContentLoaded", () => {
  //theme load
  let themeFromLS = getThemeLS();
  if (themeFromLS.theme && themeFromLS.whichTheme == "default") {
    body.classList.add("theme-default");
    themeOption1.selected = true;
  } else if (themeFromLS.theme && themeFromLS.whichTheme == "dark") {
    body.classList.add("theme-dark");
    themeOption2.selected = true;
  } else if (themeFromLS.theme && themeFromLS.whichTheme == "light") {
    body.classList.add("theme-light");
    themeOption3.selected = true;
  }
});

window.addEventListener("DOMContentLoaded", () => {
  // mode load
  let modeFromLS = getModeLS();
  if (modeFromLS.mode && modeFromLS.whichMode == "dekstop") {
    body.classList.add("mode-dekstop");
    optionDekstop.selected = true;
  } else if (modeFromLS.mode && modeFromLS.whichMode == "tablet") {
    body.classList.add("mode-tablet");
    optionTablet.selected = true;
  } else if (modeFromLS.mode && modeFromLS.whichMode == "mobile") {
    body.classList.add("mode-mobile");
    optionMobile.selected = true;
  }
});

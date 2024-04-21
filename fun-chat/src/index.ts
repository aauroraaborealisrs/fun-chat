import LoginForm from "./components/authentication/login";
import infoPage from "./components/info/info";
import mainPage from "./components/main/main";
import "./style.css";

const enum Pages {
  INFO = "info",
  LOGIN = "login",
  MAIN = "main",
}

export default function renderPage(id: string) {
  // if (sessionStorage.getItem('login') && sessionStorage.getItem('password')) {
  //     id = Pages.MAIN;

  // } else {
  //     id = Pages.LOGIN;
  // }

  let login = sessionStorage.getItem("login") as string;

  document.body.innerHTML = "";
  document.body.innerHTML = `<div id="${id}"></div>`;

  history.pushState(null, "", `#${id}`);

  if (id === Pages.INFO) {
    const info = new infoPage();
  } else if (id === Pages.LOGIN) {
    const loginForm = new LoginForm();
  } else if (id === Pages.MAIN) {
    const main = new mainPage();
  } else {
    const loginForm = new LoginForm();
  }
}

renderPage(Pages.LOGIN);

function enableRouteChange() {
  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.slice(1);
    renderPage(hash);
  });
}

enableRouteChange();

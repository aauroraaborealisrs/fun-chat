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
  let login = sessionStorage.getItem("login") as string;

  document.body.innerHTML = "";
  document.body.innerHTML = `<div id="${id}"></div>`;

  history.pushState(null, "", `#${id}`);

  if (id === Pages.INFO) {
    const info = new infoPage();
  } else if (id === Pages.LOGIN) {
    const loginForm = new LoginForm();
  } else if (id === Pages.MAIN && sessionStorage.getItem('login')) {
    const main = new mainPage();
  } else {
    const loginForm = new LoginForm();
  }
}

// --------------- тут я пыталась сделать контроль дублирования вкладки и если я дублирую вкладку то есть юзер уже залогинен и нужно показывать main
function generateUniqueId() {
 return crypto.randomUUID();
}

let tabId = localStorage.getItem('tabId');

if (!tabId) {
 tabId = generateUniqueId();
 localStorage.setItem('tabId', tabId);
} else {
 console.log('Вкладка была продублирована');
 renderPage(Pages.MAIN);

//но ничего не работает, скорее всего потому что обработчики привязаны на события которые не произошли но неважно

 sessionStorage.setItem('dublicate', 'true');

}

//--------конец попытки


// renderPage(Pages.LOGIN); //чтобы автоматически открывался логин

//-----ещё попытка сделать при наличии логина и пароля открытие мейна

if (sessionStorage.getItem('login') && sessionStorage.getItem('password')) {
      renderPage(Pages.MAIN);
    
  } else {
    renderPage(Pages.LOGIN);
}

//-----ещё попытка сделать при наличии логина и пароля открытие мейна с дублированием вкладки


if (sessionStorage.getItem('login') && sessionStorage.getItem('password')) {
  let tabId = localStorage.getItem('tabId');
  if (!tabId){
    renderPage(Pages.LOGIN);
  } else {
    renderPage(Pages.MAIN);
  }
  // renderPage(Pages.MAIN);
} else {
  renderPage(Pages.LOGIN);
}

// renderPage(Pages.LOGIN);


function enableRouteChange() {
  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.slice(1);
    renderPage(hash);
  });
}

enableRouteChange();

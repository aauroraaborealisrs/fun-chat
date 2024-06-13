import renderPage from "../../index";
import createElement from "../utilities/createElement";

export default function infoPageRenderer() {
  const text = document.createElement("div");
  text.textContent = "Допустим тут какой-то нормальный текст";

  const mainButton = createElement("button", "infoButton", "To Main") as HTMLButtonElement;

  function checkLoginAndEnableButton() {
    const login = sessionStorage.getItem("login");
    if (login && login.trim() !== "") {
      mainButton.disabled = false;
    } else {
      mainButton.disabled = true;
    }
  }

  checkLoginAndEnableButton();

  mainButton.addEventListener("click", () => {
    renderPage("main");
  });

  document.body.appendChild(mainButton);

  const loginButton = createElement("button", "infoButton", "To Login") as HTMLButtonElement;
  loginButton.addEventListener("click", () => {
    renderPage("login");
  });

  const appElement = document.getElementById("info");
  if (appElement) {
    appElement.innerHTML = "";
    appElement.appendChild(text);
    appElement.appendChild(mainButton);
    appElement.appendChild(loginButton);
  }
}

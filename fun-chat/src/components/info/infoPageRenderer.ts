import renderPage from "../../index";

export default function infoPageRenderer() {
  const text = document.createElement("div");
  text.textContent = "Допустим тут какой-то нормальный текст";

  const mainButton = document.createElement("button");
  mainButton.className = "infoButton";

  mainButton.textContent = "To Main";

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

  const loginButton = document.createElement("button");
  loginButton.className = "infoButton";
  loginButton.textContent = "To Login";
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

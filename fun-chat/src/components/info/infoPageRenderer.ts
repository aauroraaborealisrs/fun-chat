import renderPage from "../../index";

export default function infoPageRenderer() {
  const text = document.createElement("div");

  //   const mainButton = document.createElement("button");
  //   mainButton.textContent = "To Main";
  //   mainButton.addEventListener("click", () => {
  //     renderPage('main')
  //  });

  // Создание кнопки
  const mainButton = document.createElement("button");
  mainButton.textContent = "To Main";

  // Функция для проверки и установки состояния кнопки
  function checkLoginAndEnableButton() {
    // Получение значения поля login из sessionStorage
    const login = sessionStorage.getItem("login");

    // Проверка, есть ли поле login и не пустое ли оно
    if (login && login.trim() !== "") {
      // Если поле login существует и не пустое, разблокировать кнопку
      mainButton.disabled = false;
    } else {
      // Если поле login не существует или пустое, заблокировать кнопку
      mainButton.disabled = true;
    }
  }

  // Проверка состояния кнопки при инициализации
  checkLoginAndEnableButton();

  // Добавление обработчика события click к кнопке
  mainButton.addEventListener("click", () => {
    renderPage("main");
  });

  // Добавление кнопки на страницу (предполагается, что это уже сделано где-то в вашем коде)
  document.body.appendChild(mainButton);

  const loginButton = document.createElement("button");
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

import renderPage from "../../index";
import createElement from "../utilities/createElement";

export default function loginFormRenderer() {
  const form = document.createElement("form");
  form.id = "login-form";

  const welcomeMessage = createElement("p", "login__header", "Authentication",  form);

  const loginInput = createElement("input",  "login__input") as HTMLInputElement;
  loginInput.type = "text";
  loginInput.id = "login";
  loginInput.name = "login";
  loginInput.placeholder = "Login";
  loginInput.required = true;
  form.appendChild(loginInput);

  const loginError = createElement("span",  "error-message");
  loginError.id = "loginError";
  form.appendChild(loginError);

  const password = createElement("input",  "login__input") as HTMLInputElement;
  password.type = "text";
  password.id = "password";
  password.name = "password";
  password.placeholder = "Password";
  password.required = true;
  form.appendChild(password);

  const passwordError = createElement("span",  "error-message");
  passwordError.id = "passwordError";
  form.appendChild(passwordError);

  const submitButton = createElement("button", "button__main", "Login", form) as HTMLButtonElement;
  submitButton.id = "submit-button";
  submitButton.type = "submit";
  submitButton.disabled = true;

  const infoButton = createElement("button", "button__main info-button", "Info", form) as HTMLButtonElement;
  infoButton.type = "submit";

  infoButton.addEventListener("click", (event) => {
    event.preventDefault();
    renderPage("info");
  });

  const serverError = document.createElement("span");
  serverError.id = "server-error";
  form.appendChild(serverError);

  const appElement = document.getElementById("login");
  if (appElement) {
    appElement.innerHTML = "";
    appElement.appendChild(form);
  }
}

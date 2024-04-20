import "./login.css";
import loginFormRenderer from "./authPageRender";
import { checkInputs } from "./validation/checkInputs";
import createUser from "../api/createUser";

class LoginForm {
  constructor() {
    this.render();
    this.addEventListeners();
  }

  render() {
    loginFormRenderer();
  }

  addEventListeners() {
    const inputs: NodeListOf<HTMLInputElement> =
      document.querySelectorAll("#login-form input");

    const submitButton = document.getElementById(
      "submit-button",
    ) as HTMLButtonElement;

    const form = document.getElementById("login-form");

    function handleSubmit(event: Event) {
      event.preventDefault();

      const form = document.getElementById("login-form") as HTMLFormElement;
      const formData = new FormData(form);

      const login = formData.get("login") as string;
      const password = formData.get("password") as string;

      if (checkInputs()) {
        createUser(login, password);
      } else {
        console.error("Login or password is missing");
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Enter") {
        const form = document.getElementById("login-form") as HTMLFormElement;
        handleSubmit(new Event("submit", { bubbles: true, cancelable: true }));
      }
    }

    if (form) {
      form.addEventListener("submit", handleSubmit);
      form.addEventListener("keydown", handleKeyDown);
    }

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        if (checkInputs()) {
          submitButton.disabled = false;
        } else {
          submitButton.disabled = true;
        }
      });
    });

    checkInputs();
  }
}

export default LoginForm;

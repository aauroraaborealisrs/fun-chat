import renderPage from "../../index";
import {updateUserListBasedOnSearch } from "./updateUserList";
import createMainPage from "./createMainPage";
import { handleLogoutButtonClick } from "../userEvents/handleLogoutButtonClick";
import { sendingMessage } from "../message/sendingMessage";
import { setupMessagesCanvasHandlers } from "../userEvents/setupMessagesCanvasHandlers";

export default function mainRenderer() {
  const htmlContent = createMainPage();
  const appElement = document.getElementById("main");

  if (appElement) {
    appElement.innerHTML = "";
    appElement.appendChild(htmlContent);
    const existingUserLogin = sessionStorage.getItem("login");
    const userLabelElement = document.querySelector(".header-name");
    if (userLabelElement) {
      userLabelElement.textContent += ` ${existingUserLogin}`;
    }

    const infoButton = document.getElementById("info-button");
    if (infoButton) {
      infoButton.addEventListener("click", (event) => {
        event.preventDefault();
        renderPage("info");
      });
    }

    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
      logoutButton.addEventListener("click", handleLogoutButtonClick);
    }

    const sendButton = document.getElementById("send") as HTMLButtonElement;
    const dialogueMessageInput = document.querySelector(
      ".dialogue-message",
    ) as HTMLInputElement;

    if (dialogueMessageInput && sendButton) {
      const editElement = document.getElementById("edit") as HTMLButtonElement;

      dialogueMessageInput.addEventListener("input", function () {
        sendButton.disabled =
          dialogueMessageInput.value.trim() === "" || !editElement.disabled;
      });
    }

    if (sendButton) {
      sendButton.addEventListener("click", (event) => {
        event.preventDefault();
        sendingMessage();
      });
    }

    const dialogueMessageElement = document.querySelector(
      ".dialogue-message",
    ) as HTMLInputElement;

    if (dialogueMessageElement) {
      dialogueMessageElement.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && sendButton.disabled == false) {
          event.preventDefault();
          sendingMessage();
        }
      });
    }

    const userSearchElement = document.getElementById("user-search");
    if (userSearchElement) {
      updateUserListBasedOnSearch(
        userSearchElement,
        document.querySelectorAll(".user_li"),
      );
    }

    const messagesCanvas = document.querySelector(".messages-canvas");
    setupMessagesCanvasHandlers(messagesCanvas);
  }
}

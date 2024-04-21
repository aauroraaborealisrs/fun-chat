import "./main.css";
import renderPage from "../../index";
import sendMessage from "./sendMessage";
import { markAsRead } from "./markAsRead";
import { responsesArray } from "./socket";
import sendRequest from "./socket";
import { isAutoScrolling } from "./createMessage";
export default function mainRenderer() {
  const htmlContent = `
    <div class="container">
    <header class="header">
        <span class="header-name">Пользователь:</span>
        <span>Fun Chat</span>
        <div class="buttons">
            <button id="info-button">Info</button>
            <button id="logout-button">Log Out</button>
        </div>
    </header>
    <main class="main">
        <section class="users">
            <input type="text" placeholder="Поиск" class="user-search" id="user-search">
            <ul class="users-list">
            </ul>
        </section>
        <section class="dialogue">
            <div class="dialogue-header">
                <span class="dialogue-name">Тут ничего нет. Найдите собеседника из списка слева</span>
                <span class="dialogue-status"></span>
            </div>
            <div class="messages-canvas hidden">
            </div>
            <div class="dialogue-input hidden">
                <input type="text" placeholder="Напишите" class="dialogue-message">
                <button class="button" id="send" disabled>Send</button>
                <button class="button" id="edit" disabled>Edit</button>
            </div>
        </section>
    </main>
    <footer class="footer">
        <span class="footer-rss">RSSchool</span>
        <div class="footer-logo"></div>
        <a href="https://github.com/aauroraaborealisrs" target="_blank" class="footer-link">
            <span class="footer-name">Kate Sharai</span>
        </a>
        <span class="footer-year">2024</span>
    </footer>
</div>
    `;

  const appElement = document.getElementById("main");

  if (appElement) {
    appElement.innerHTML = "";
    appElement.innerHTML = htmlContent;
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
      logoutButton.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("logout");
        const login = sessionStorage.getItem("login");
        const password = sessionStorage.getItem("password");
        const request = {
          id: crypto.randomUUID(),
          type: "USER_LOGOUT",
          payload: {
            user: {
              login: `${login}`,
              password: `${password}`,
            },
          },
        };
        sendRequest(JSON.stringify(request));
      });
    }

    const sendButton = document.getElementById("send") as HTMLButtonElement;

    const dialogueMessageInput = document.querySelector(
      ".dialogue-message",
    ) as HTMLInputElement;

    if (dialogueMessageInput && sendButton) {
      const editElement = document.getElementById("edit") as HTMLButtonElement;

      dialogueMessageInput.addEventListener("input", function () {
        if (dialogueMessageInput.value.trim() !== "" && editElement.disabled) {
          sendButton.disabled = false;
        } else {
          sendButton.disabled = true;
        }
      });
    }

    // if (sendButton) {
    //   sendButton.addEventListener("click", (event) => {
    //     event.preventDefault();
    //     markAsRead(responsesArray);

    //     const dialogueNameElement = document.querySelector(
    //       ".dialogue-name",
    //     ) as HTMLElement;
    //     const name = dialogueNameElement.textContent as string;
    //     const dialogueMessageElement = document.querySelector(
    //       ".dialogue-message",
    //     ) as HTMLInputElement;
    //     const message = dialogueMessageElement.value as string;
    //     sendButton.disabled = true;
    //     sendMessage(name, message);
    //   });
    // }

    if (sendButton) {
      sendButton.addEventListener("click", (event) => {
        event.preventDefault();
        sendTest();
      });
    }

    const dialogueMessageElement = document.querySelector(
      ".dialogue-message",
    ) as HTMLInputElement;

    if (dialogueMessageElement) {
      dialogueMessageElement.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          sendTest();
        }
      });
    }

    function sendTest() {
      markAsRead(responsesArray);

      const dialogueNameElement = document.querySelector(
        ".dialogue-name",
      ) as HTMLElement;
      const name = dialogueNameElement.textContent as string;

      const message = dialogueMessageElement.value.trim();

      if (message !== "") {
        sendButton.disabled = true;
        sendMessage(name, message);
      }
    }

    const userSearchElement = document.getElementById("user-search");
    if (userSearchElement) {
      userSearchElement.addEventListener("input", function (e) {
        const target = e.target as HTMLInputElement;
        const listItems = document.querySelectorAll(".user_li");

        listItems.forEach((item) => {
          if (e.target) {
            const searchValue = (
              e.target as HTMLInputElement
            ).value.toLowerCase();
            const itemText = item.textContent?.toLowerCase() || "";
            if (itemText.includes(searchValue)) {
              (item as HTMLElement).style.display = "";
            } else {
              (item as HTMLElement).style.display = "none";
            }
          }
        });
      });
    } else {
      console.error('Element with ID "user-search" not found');
    }

    const messagesCanvas = document.querySelector(".messages-canvas");
    if (messagesCanvas) {
      let isUserScrolling = false; // Переменная для отслеживания прокрутки пользователя

      messagesCanvas.addEventListener("mousedown", () => {
        isUserScrolling = true;
      });

      messagesCanvas.addEventListener("mouseup", () => {
        isUserScrolling = false;
      });

      messagesCanvas.addEventListener("touchstart", () => {
        isUserScrolling = true;
      });

      messagesCanvas.addEventListener("touchend", () => {
        isUserScrolling = false;
      });

      messagesCanvas.addEventListener("wheel", () => {
        markAsRead(responsesArray);

        isUserScrolling = true;
      });

      messagesCanvas.addEventListener("scroll", () => {
        if (isUserScrolling) {
          markAsRead(responsesArray);
        }
      });

      messagesCanvas.addEventListener("click", () => {
        markAsRead(responsesArray);
      });
    }
  } else {
    console.error('Element with ID "main" not found');
  }
}

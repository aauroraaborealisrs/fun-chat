import renderPage from "../../index";
import nameClick from "./nameClick";
import { createMessage, renderMessage } from "./createMessage";
import {
  renderActiveUserList,
  renderInactiveUserList,
} from "./userListRenderer";
import { markAsRead } from "./markAsRead";

import { MessagePayload, ServerResponse } from "../utilities/interfaces";

let responsesArray: ServerResponse[] = [];

let markToReadFromHistory: MessagePayload[] = [];

let socket = new WebSocket("ws://localhost:4000");

socket.onopen = () => {
  console.log("WebSocket connection opened");
};

socket.onmessage = (event) => {
  const response = JSON.parse(event.data);

  if (response.type === "ERROR" && response.payload && response.payload.error) {
    const serverErrorElement = document.getElementById("server-error");
    if (serverErrorElement) {
      serverErrorElement.textContent = response.payload.error;
    }
  }

  if (
    response.payload &&
    response.payload.user &&
    response.payload.user.isLogined === true
  ) {
    renderPage("main");
  }

  if (response.payload && response.payload.users) {
    const usersList = document.querySelector(".users-list");
    if (usersList) {
      if (response.type === "USER_ACTIVE") {
        renderActiveUserList(response.payload.users, usersList as HTMLElement);
      } else if (response.type === "USER_INACTIVE") {
        renderInactiveUserList(
          response.payload.users,
          usersList as HTMLElement,
        );
      }
    }
    nameClick();
  }

  if (
    response.type === "MSG_SEND" &&
    response.payload &&
    response.payload.message
  ) {
    createMessage(response);
    responsesArray.push(response);
  }

  if (response.type === "MSG_FROM_USER") {
    if (response.payload.messages.length === 0) {
      const dialogue = document.querySelector(".messages-canvas");
      const existingTempElement = dialogue?.querySelector(".temp");

      if (!existingTempElement) {
        const temp = document.createElement("div");
        temp.className = "temp";
        temp.textContent = "Тут ничего пока нет";
        dialogue?.appendChild(temp);
      }
    } else {
      response.payload.messages.forEach((message: MessagePayload) => {
        renderMessage(message);
      });

      const dialogue = document.querySelector(".messages-canvas");
      if (dialogue) {
      }
    }

    let unreadMessagesCount = 0;

    response.payload.messages.forEach((message: MessagePayload) => {
      if (
        !message.status.isReaded &&
        message.to == sessionStorage.getItem("login")
      ) {
        unreadMessagesCount++;
      }
    });
  }

  if (
    response.type === "MSG_READ" &&
    response.payload &&
    response.payload.message
  ) {
    const messageId = response.payload.message.id;

    const messageElement = document.getElementById(messageId);

    if (messageElement) {
      const statusElement = messageElement.querySelector(".message-status");
      if (statusElement) {
        statusElement.textContent = "Прочитано";
      }
    } else {
    }
  }

  if (response.type === "MSG_EDIT") {
    const dialogueMessageElement = document.querySelector(
      ".dialogue-message",
    ) as HTMLInputElement;
    dialogueMessageElement.value = "";
  }
  if (
    response.type === "USER_EXTERNAL_LOGOUT" &&
    response.payload &&
    response.payload.user
  ) {
    const userSpans = document.querySelectorAll(".user_li.user_active");

    userSpans.forEach((span) => {
      if (span.textContent === response.payload.user.login) {
        span.className = "user_li user_inactive";
        console.log(
          `User ${response.payload.user.login} has been logged out externally and their status is now inactive.`,
        );
      }
    });
  }

  if (response.type === "USER_LOGOUT") {
    sessionStorage.removeItem("login");
    sessionStorage.removeItem("password");
    renderPage("login");
  }
};

socket.onerror = (error) => {
  console.error("WebSocket Error:", error);
};

function createModal() {
  const modal = document.createElement("div");
  modal.id = "modal";
  modal.className = "modal";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  const text = document.createElement("p");
  text.textContent =
    "Соединение с сервером было прервано. Попытка восстановления соединения...";

  modalContent.appendChild(text);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  function showModal() {
    modal.style.display = "block";
  }

  function hideModal() {
    modal.style.display = "none";
  }

  return { showModal, hideModal };
}

function showModal() {
  const modal = createModal();
  modal.showModal();
}

function hideModal() {
  const modalElement = document.getElementById("modal");
  if (modalElement) {
    modalElement.style.display = "none";
  } else {
    console.error("Modal element not found");
  }
}

function responsesAnswers() {
  socket.onmessage = (event) => {
    const response = JSON.parse(event.data);

    if (
      response.payload &&
      response.payload.user &&
      response.payload.user.isLogined === true
    ) {
      renderPage("main");
    }

    if (
      response.type === "ERROR" &&
      response.payload &&
      response.payload.error
    ) {
      const serverErrorElement = document.getElementById("server-error");
      if (serverErrorElement) {
        serverErrorElement.textContent = response.payload.error;
      }
    }

    if (response.payload && response.payload.users) {
      const usersList = document.querySelector(".users-list");
      if (usersList) {
        if (response.type === "USER_ACTIVE") {
          renderActiveUserList(
            response.payload.users,
            usersList as HTMLElement,
          );
        } else if (response.type === "USER_INACTIVE") {
          renderInactiveUserList(
            response.payload.users,
            usersList as HTMLElement,
          );
        }
      }
      nameClick();
    }

    if (
      response.type === "MSG_SEND" &&
      response.payload &&
      response.payload.message
    ) {
      createMessage(response);
      responsesArray.push(response);
    }

    if (response.type === "MSG_FROM_USER") {
      markToReadFromHistory.length = 0;
      if (response.payload.messages.length === 0) {
        const dialogue = document.querySelector(".messages-canvas");
        const existingTempElement = dialogue?.querySelector(".temp");

        if (!existingTempElement) {
          const temp = document.createElement("div");
          temp.className = "temp";
          temp.textContent = "Тут ничего пока нет";
          dialogue?.appendChild(temp);
        }
      } else {
        let firstUnreadMessageFound = false;

        response.payload.messages.forEach((message: MessagePayload) => {
          renderMessage(message);
          markToReadFromHistory.push(message);

          if (!firstUnreadMessageFound && !message.status.isReaded) {
            firstUnreadMessageFound = true;
          }
        });
      }

      let unreadMessagesCount = 0;

      response.payload.messages.forEach((message: MessagePayload) => {
        if (
          !message.status.isReaded &&
          message.to == sessionStorage.getItem("login")
        ) {
          unreadMessagesCount++;
        }
      });
    }

    if (
      response.type === "MSG_READ" &&
      response.payload &&
      response.payload.message
    ) {
      const messageId = response.payload.message.id;

      const messageElement = document.getElementById(messageId);

      if (messageElement) {
        const statusElement = messageElement.querySelector(".message-status");
        if (statusElement) {
          statusElement.textContent = "Прочитано";
        }
      } else {
      }
    }

    if (response.type === "MSG_EDIT") {
      const dialogueMessageElement = document.querySelector(
        ".dialogue-message",
      ) as HTMLInputElement;
      dialogueMessageElement.value = "";
    }
    if (
      response.type === "USER_EXTERNAL_LOGOUT" &&
      response.payload &&
      response.payload.user
    ) {
      const userSpans = document.querySelectorAll(".user_li.user_active");

      userSpans.forEach((span) => {
        if (span.textContent === response.payload.user.login) {
          span.className = "user_li user_inactive";
          console.log(
            `User ${response.payload.user.login} has been logged out externally and their status is now inactive.`,
          );
        }
      });
    }

    if (response.type === "USER_LOGOUT") {
      sessionStorage.removeItem("login");
      sessionStorage.removeItem("password");
      renderPage("login");
    }
  };
}

function connectToServer() {
  socket = new WebSocket("ws://localhost:4000");

  socket.onopen = (event) => {
    console.log("Connection opened");
    hideModal();

    let login = sessionStorage.getItem("login") as string;
    let password = sessionStorage.getItem("password") as string;
    if (login && password) {
      const id = crypto.randomUUID();

      const request = {
        id: id,
        type: "USER_LOGIN",
        payload: {
          user: {
            login: `${login}`,
            password: `${password}`,
          },
        },
      };

      sendRequest(JSON.stringify(request));
    }

    responsesAnswers();
  };

  socket.onclose = (event) => {
    if (event.wasClean) {
      console.log(
        `Connection closed cleanly, code=${event.code} reason=${event.reason}`,
      );
    } else {
      console.log("Connection died");
      showModal();
      setTimeout(() => {
        connectToServer();
      }, 5000);
    }
  };
}

socket.onclose = (event) => {
  if (event.wasClean) {
    console.log(
      `Connection closed cleanly, code=${event.code} reason=${event.reason}`,
    );
  } else {
    console.log("Connection died");
    showModal();
    setTimeout(() => {
      connectToServer();
    }, 5000);
  }
};

export default function sendRequest(message: string) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(message);
    responsesAnswers();
  }
}

export { responsesArray };
export { markToReadFromHistory };

function waitForElement(selector: string, callback: () => void) {
  const element = document.querySelector(selector);
  if (element) {
    callback();
  } else {
    setTimeout(() => {
      waitForElement(selector, callback);
    }, 5000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  waitForElement(".messages-canvas", () => {
    const messagesCanvas = document.querySelector(".messages-canvas");

    if (messagesCanvas) {
      messagesCanvas.addEventListener("click", () => {
        markAsRead(responsesArray);
      });
    }
  });
});

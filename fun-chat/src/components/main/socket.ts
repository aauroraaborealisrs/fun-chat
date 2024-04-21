import renderPage from "../../index";
import nameClick from "./nameClick";
import { createMessage, renderMessage } from "./createMessage";
import {
  renderActiveUserList,
  renderInactiveUserList,
} from "./userListRenderer";
import { markAsRead } from "./markAsRead";

interface ServerResponse {
  id: string;
  type: string;
  payload: {
    message: {
      id: string;
      from: string;
      to: string;
      text: string;
      datetime: number;
      status: {
        isDelivered: boolean;
        isReaded: boolean;
        isEdited: boolean;
      };
    };
  };
}

let responsesArray: ServerResponse[] = [];

const socket = new WebSocket("ws://localhost:4000");

// Обработчик открытия соединения
socket.onopen = () => {
  console.log("WebSocket connection opened");
};

// Обработчик получения сообщений
socket.onmessage = (event) => {
  // Парсинг полученных данных
  const response = JSON.parse(event.data);

  if (
    response.payload &&
    response.payload.user &&
    response.payload.user.isLogined === true
  ) {
    renderPage("main");
  }

  if (response.type === "ERROR" && response.payload && response.payload.error) {
    const serverErrorElement = document.getElementById("server-error");
    if (serverErrorElement) {
      serverErrorElement.textContent = response.payload.error;
    }
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
    // markAsRead(responsesArray);
  }

  interface MessageStatus {
    isDelivered: boolean;
    isReaded: boolean;
    isEdited: boolean;
  }

  interface MessagePayload {
    id: string;
    from: string;
    to: string;
    text: string;
    datetime: number;
    status: MessageStatus;
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
        const hr = document.createElement("hr");
        hr.classList.add("hr-separatop");
        dialogue.appendChild(hr);
        //  markAsRead(responsesArray);

        // markAsRead();
      }
    }

    //раздел с количеством сообщений

    let unreadMessagesCount = 0;

    response.payload.messages.forEach((message: MessagePayload) => {
      if (
        !message.status.isReaded &&
        message.to == sessionStorage.getItem("login")
      ) {
        // Проверяем, если isRead равно false
        unreadMessagesCount++; // Увеличиваем счетчик
      }
    });

    console.log(`Количество сообщений с isRead: false: ${unreadMessagesCount}`);
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
      console.log("Message element not found");
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

  // markAsRead(responsesArray);
};

// Обработчик ошибки
socket.onerror = (error) => {
  console.error("WebSocket Error:", error);
};

socket.onclose = (event) => {
  if (event.wasClean) {
    console.log(
      `Connection closed cleanly, code=${event.code} reason=${event.reason}`,
    );
  } else {
    console.log("Connection died");
  }
};

export default function sendRequest(message: string) {
  socket.send(message);
}

// window.addEventListener('click', () => {
//     markAsRead(responsesArray);
// });

// window.addEventListener('scroll', () => {
//   markAsRead(responsesArray);
// });

export { responsesArray };

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
      //   messagesCanvas.addEventListener('scroll', () => {
      //     markAsRead(responsesArray);
      // });

      messagesCanvas.addEventListener("click", () => {
        markAsRead(responsesArray);
      });
    }
  });
});

import renderPage from "../../index";
import nameClick from "../userEvents/nameClick";
import { createMessage } from "../message/createMessage";
import { renderMessage } from "../message/renderMessage";
import {
  renderActiveUserList,
  renderInactiveUserList,
} from "../main/userListRenderer";
import { markAsRead } from "../message/markAsRead";
import { showModal, hideModal } from "../modal/modal";
import { MessagePayload, ServerResponse } from "../utilities/interfaces";
import { markArReadMessages, showEmpty } from "../main/responesHandler";

let responsesArray: ServerResponse[] = [];
let markToReadFromHistory: MessagePayload[] = [];
let socket = new WebSocket("ws://localhost:4000");

socket.onerror = (error) => {
  console.error("WebSocket Error:", error);
};

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
        showEmpty();
      } else {
        response.payload.messages.forEach((message: MessagePayload) => {
          renderMessage(message);
          markToReadFromHistory.push(message);
        });
      }
    }

    if (
      response.type === "MSG_READ" &&
      response.payload &&
      response.payload.message
    ) {
      const messageId = response.payload.message.id;
      markArReadMessages(messageId);
    }

    if (response.type === "MSG_EDIT") {
      const dialogueMessageElement = document.querySelector(
        ".dialogue-message",
      ) as HTMLInputElement;
      dialogueMessageElement.value = "";
    }

    if (response.type === "USER_LOGOUT") {
      sessionStorage.removeItem("login");
      sessionStorage.removeItem("password");
      renderPage("login");
    }
  };
}

responsesAnswers();

function handleSocketClose(event: CloseEvent) {
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

  socket.onclose = handleSocketClose;
}

socket.onclose = handleSocketClose;

export default function sendRequest(message: string) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(message);
    responsesAnswers();
  }
}

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

export { responsesArray };
export { markToReadFromHistory };

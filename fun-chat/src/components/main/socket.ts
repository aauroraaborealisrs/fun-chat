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

interface MessagePayload {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: MessageStatus;
}

interface MessageStatus {
  isDelivered: boolean;
  isReaded: boolean;
  isEdited: boolean;
}



let responsesArray: ServerResponse[] = [];

let markToReadFromHistory: MessagePayload [] = [];

let socket = new WebSocket("ws://localhost:4000");

// Обработчик открытия соединения
socket.onopen = () => {
  console.log("WebSocket connection opened");
};

// Обработчик получения сообщений
socket.onmessage = (event) => {
  // Парсинг полученных данных
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
        // const hr = document.createElement("hr");
        // hr.classList.add("hr-separatop");
        // dialogue.appendChild(hr);
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

    // console.log(`Количество сообщений с isRead: false: ${unreadMessagesCount}`);
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

// Обработчик ошибки
socket.onerror = (error) => {
  console.error("WebSocket Error:", error);
};

// socket.onclose = (event) => {
//   if (event.wasClean) {
//     console.log(
//       `Connection closed cleanly, code=${event.code} reason=${event.reason}`,
//     );
//   } else {
//     console.log("Connection died");
//   }
// };

function createModal() {
 const modal = document.createElement('div');
 modal.id = 'modal';
 modal.className = 'modal';

 // Создание содержимого модального окна
 const modalContent = document.createElement('div');
 modalContent.className = 'modal-content';

 // Создание текста внутри модального окна
 const text = document.createElement('p');
 text.textContent = 'Соединение с сервером было прервано. Попытка восстановления соединения...';

 // Добавление текста в содержимое модального окна
 modalContent.appendChild(text);

 // Добавление содержимого модального окна в модальное окно
 modal.appendChild(modalContent);

 // Добавление модального окна в DOM
 document.body.appendChild(modal);

 // Функция для отображения модального окна
 function showModal() {
    modal.style.display = "block";
 }

 // Функция для скрытия модального окна
 function hideModal() {
    modal.style.display = "none";
 }

 return { showModal, hideModal };
}

function showModal() {
  const modal = createModal();
  modal.showModal();

}

// Функция для скрытия модального окна
function hideModal() {
 const modalElement = document.getElementById('modal');
 if (modalElement) {
    modalElement.style.display = "none";
 } else {
    console.error("Modal element not found");
 }
}

function responsesAnswers(){
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
        let firstUnreadMessageFound = false; // Flag to track the first unread message
    
        response.payload.messages.forEach((message: MessagePayload) => {
          renderMessage(message);
          markToReadFromHistory.push(message);
          console.log(markToReadFromHistory)


    
          // Check if this is the first unread message
          if (!firstUnreadMessageFound && !message.status.isReaded) {
            firstUnreadMessageFound = true; // Set the flag to true
    
            const dialogue = document.querySelector(".messages-canvas");
            if (dialogue) {
              const hr = document.createElement("hr");
              hr.classList.add("hr-separatop");
              dialogue.appendChild(hr); // Append the <hr> element
            }
          }
        });
     }
    
  
      //раздел с количеством сообщений
  
      let unreadMessagesCount = 0;
  
      response.payload.messages.forEach((message: MessagePayload) => {
        if (
          !message.status.isReaded &&
          message.to == sessionStorage.getItem("login")
        ) {
          unreadMessagesCount++;
        }
      });
  
      console.log(`Количество сообщений с isRead: false: ${unreadMessagesCount}`);


      // const messagesCanvas = document.querySelector('.messages-canvas');
      // if (messagesCanvas){      
      //   let hidden = messagesCanvas.classList.contains('hidden');
      //   if (!hidden){
      //     const messages = document.querySelectorAll('.messages-canvas .message');
      //     if (messages.length >= unreadMessagesCount) {
      //      const thirdLastElement = messages[messages.length - unreadMessagesCount];
      //      const hr = document.createElement("hr");
      //      hr.classList.add("hr-separatop");
      //      if(thirdLastElement.parentNode){
      //       thirdLastElement.parentNode.insertBefore(hr, thirdLastElement);
      //      }
      //      console.log(thirdLastElement);
      //     } 
      //   }
      // }

      // const messages = document.querySelectorAll('.messages-canvas .message');
      // console.log(messages);
      // if (messages.length >= unreadMessagesCount) {
      //  const thirdLastElement = messages[messages.length - unreadMessagesCount];
      //  const hr = document.createElement("hr");
      //  hr.classList.add("hr-separatop");
      //  if(thirdLastElement.parentNode){
      //   thirdLastElement.parentNode.insertBefore(hr, thirdLastElement);
      //  }
      //  console.log(thirdLastElement);
      // } 
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
     hideModal()

     
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

     responsesAnswers()

     



    //  const element = document.querySelector('.main, .info, .login');

    //  if (element) {
    //     const className = element.className;
    //     renderPage(`${className}`)
    //  }
  };

  socket.onclose = (event) => {
    if (event.wasClean) {
       console.log(`Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
       console.log("Connection died");
       showModal();
       setTimeout(() => {
         // socket = new WebSocket("ws://localhost:4000");
         connectToServer(); 
       }, 5000);
    }
   };
}

// Обработчик закрытия соединения
socket.onclose = (event) => {
 if (event.wasClean) {
    console.log(`Connection closed cleanly, code=${event.code} reason=${event.reason}`);
 } else {
    console.log("Connection died");
    showModal();
    setTimeout(() => {
      // socket = new WebSocket("ws://localhost:4000");
      connectToServer(); 
    }, 5000);
 }
};

export default function sendRequest(message: string) {
  if (socket.readyState === WebSocket.OPEN){
    socket.send(message);
    responsesAnswers();
    
  }
  // socket.send(message);
}

export { responsesArray };
export {markToReadFromHistory};

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

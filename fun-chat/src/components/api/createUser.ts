import renderPage from "../../index";
import sendRequest from "../main/socket";

export default function createUser(login: string, password: string) {
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

  sessionStorage.setItem("login", login);
  sessionStorage.setItem("password", password);

  sendRequest(JSON.stringify(request));
}

// socket.onmessage = function(event) {
//     const response = JSON.parse(event.data);

//     if (response.type === 'ERROR') {
//         console.error('Server error:', response.payload.error);
//         const errorSpan = document.getElementById('server-error');
//         if (errorSpan) {
//             errorSpan.textContent = `${response.payload.error}`;
//         }
//     } else if (response.type === 'USER_LOGIN') {
//         if (response.payload.success) {
//             console.log('User authenticated successfully');
//         } else {
//             if (response.payload.error) {
//                 console.log('Server error:', response.payload.error);
//             } else {
//                 console.log('Authentication is ok:');
//                 sessionStorage.setItem('login', login);
//                 sessionStorage.setItem('password', password);
//                 renderPage('main');
//             }
//         }
//     }
// };

// socket.onerror = function(error) {
//  console.error('WebSocket Error:', error);
// };

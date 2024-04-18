import renderPage from '../../index';
// const socket = new WebSocket('ws://localhost:4000');

// socket.onopen = function(event) {
//  const request = {
//     id: '1',
//     type: 'USER_LOGIN',
//     payload: {
//       user: {
//         login: 'kate1', 
//         password: '1', 
//       },
//     },
//  };

//  socket.send(JSON.stringify(request));
// };

// socket.onmessage = function(event) {
//  const response = JSON.parse(event.data);

//  if (response.type === 'USER_LOGIN') {
//     if (response.payload.success) {
//       console.log('User authenticated successfully');
//     } else {
//       console.log('Authentication failed:', response.payload.message);
//     }
//  }
// };

// socket.onerror = function(error) {
//  console.error('WebSocket Error:', error);
// };

// socket.onclose = function(event) {
//  if (event.wasClean) {
//     console.log(`Connection closed cleanly, code=${event.code} reason=${event.reason}`);
//  } else {
//     console.log('Connection died');
//  }
// };



export default function createUser (login: string, password: string) {
    const socket = new WebSocket('ws://localhost:4000');

socket.onopen = function(event) {
    const id = crypto.randomUUID();

 const request = {
    id: id,
    type: 'USER_LOGIN',
    payload: {
      user: {
        login: `${login}`, 
        password: `${password}`, 
      },
    },
 };

 socket.send(JSON.stringify(request));
};


socket.onmessage = function(event) {
    const response = JSON.parse(event.data);

    if (response.type === 'ERROR') {
        console.error('Server error:', response.payload.error);
        const errorSpan = document.getElementById('server-error');
        if (errorSpan) {
            errorSpan.textContent = `${response.payload.error}`;
        } 
    } else if (response.type === 'USER_LOGIN') {
        if (response.payload.success) {
            console.log('User authenticated successfully');
        } else {
            if (response.payload.error) {
                console.log('Server error:', response.payload.error);
            } else {
                console.log('Authentication is ok:');
                sessionStorage.setItem('login', login);
                sessionStorage.setItem('password', password);
                renderPage('main');
            }
        }
    }
};

socket.onerror = function(error) {
 console.error('WebSocket Error:', error);
};

socket.onclose = function(event) {
 if (event.wasClean) {
    console.log(`Connection closed cleanly, code=${event.code} reason=${event.reason}`);
 } else {
    console.log('Connection died');
 }
};

}
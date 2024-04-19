// const socket = new WebSocket('ws://localhost:4000');

// socket.onopen = function(event) {
//  const request = {
//     id: '0',
//     type: 'USER_ACTIVE',
//     payload: null,
//  };

//  socket.send(JSON.stringify(request));
// };

// socket.onmessage = function(event) {
//  const response = JSON.parse(event.data);

//  if (response.type === 'USER_ACTIVE') {
//     const users = response.payload;
//     console.log('Authenticated users:', users);
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

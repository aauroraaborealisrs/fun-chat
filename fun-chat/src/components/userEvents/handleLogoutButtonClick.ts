import sendRequest from "../ws/socket";

export function handleLogoutButtonClick(event: MouseEvent) {
    event.preventDefault();
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
  }
  
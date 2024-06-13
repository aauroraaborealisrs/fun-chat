interface User {
  login: string;
  isLogined: boolean;
}
import sendRequest from "./socket";

export function renderActiveUserList(
  users: User[],
  usersListElement: HTMLElement,
) {
  users.forEach((user: User) => {
    const existingUserLogin = sessionStorage.getItem("login");

    const request = {
      id: crypto.randomUUID(),
      type: "MSG_FROM_USER",
      payload: {
        user: {
          login: `${user.login}`,
        },
      },
    };

    sendRequest(JSON.stringify(request));

    const li = document.createElement("li");
    li.textContent = `${user.login}`;
    const userLogin = sessionStorage.getItem("login");

    if (user.login === userLogin) {
      li.classList.add("small");
    }
    li.classList.add("user_li");
    if (user.isLogined) {
      li.classList.add("user_active");
    }
    usersListElement.appendChild(li);
  });
}

export function renderInactiveUserList(
  users: User[],
  usersListElement: HTMLElement,
) {
  users.forEach((user: User) => {
    const li = document.createElement("li");
    li.textContent = `${user.login}`;
    li.classList.add("user_li");
    if (!user.isLogined) {
      li.classList.add("user_inactive");
    }
    usersListElement.appendChild(li);

    const request = {
      id: crypto.randomUUID(),
      type: "MSG_FROM_USER",
      payload: {
        user: {
          login: `${user.login}`,
        },
      },
    };

    sendRequest(JSON.stringify(request));
  });
}

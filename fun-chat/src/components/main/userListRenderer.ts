import { User } from "../utilities/interfaces";
import sendRequest from "../ws/socket";

function createRequest(user: User) {
  return {
    id: crypto.randomUUID(),
    type: "MSG_FROM_USER",
    payload: {
      user: {
        login: `${user.login}`,
      },
    },
  };
}

function createUserListItem(user: User, currentUserLogin: string | null) {
  const li = document.createElement("li");
  li.textContent = `${user.login}`;
  li.classList.add("user_li");
  if (user.login === currentUserLogin) {
    li.classList.add("small");
  }
  if (user.isLogined) {
    li.classList.add("user_active");
  } else {
    li.classList.add("user_inactive");
  }
  return li;
}

function sendUserRequest(user: User) {
  const request = createRequest(user);
  sendRequest(JSON.stringify(request));
}

export function renderActiveUserList(
  users: User[],
  usersListElement: HTMLElement,
) {
  const currentUserLogin = sessionStorage.getItem("login");

  users.forEach((user: User) => {
    sendUserRequest(user);
    const li = createUserListItem(user, currentUserLogin);
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
  const currentUserLogin = sessionStorage.getItem("login");

  users.forEach((user: User) => {
    sendUserRequest(user);
    const li = createUserListItem(user, currentUserLogin);
    if (!user.isLogined) {
      li.classList.add("user_inactive");
    }
    usersListElement.appendChild(li);
  });
}

interface User {
  login: string;
  isLogined: boolean;
}

export function renderActiveUserList(
  users: User[],
  usersListElement: HTMLElement,
) {
  users.forEach((user: User) => {
    const existingUserLogin = sessionStorage.getItem("login");

    const userLabelElement = document.querySelector(".header-name");
    let userLabelText = "";
    if (userLabelElement) {
      const fullText = userLabelElement.textContent?.trim();
      const prefix = "Пользователь:";
      if (fullText) {
        const index = fullText.indexOf(prefix);
        if (index !== -1) {
          userLabelText = fullText.substring(index + prefix.length).trim();
        }
      }
    }

    if (existingUserLogin) {
      // const userLabelElement = document.querySelector('.header-name');
      // if (userLabelElement){    userLabelElement.textContent += ` ${existingUserLogin}`;}
      // return;
    }

    const li = document.createElement("li");
    li.textContent = `${user.login}`;
    const userLogin = sessionStorage.getItem("login");

    if(user.login === userLogin){
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
  });
}

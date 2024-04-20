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

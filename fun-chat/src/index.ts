import LoginForm from "./components/authentication/login";
import infoPage from "./components/info/info";
import mainPage from "./components/main/main"

const enum Pages {
    INFO = "info",
    LOGIN = "login",
    MAIN = "main"
}

export default function renderPage (id: string){
    document.body.innerHTML = '';
    document.body.innerHTML = `<div id="${id}"></div>`;

    if (id === Pages.INFO){
        const info = new infoPage();
    }
    else if (id === Pages.LOGIN){
        const loginForm = new LoginForm();
    }
    else if (id === Pages.MAIN){
        const main = new mainPage();
    }
    else {
        console.log("else")
        const loginForm = new LoginForm();
    }
}

renderPage(Pages.LOGIN);

function enableRouteChange(){
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.slice(1);
        renderPage(hash);
    })
}

enableRouteChange();
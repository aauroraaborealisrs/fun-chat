import LoginForm from "./components/authentication/login";
import infoPage from "./components/info/info";

const enum Pages {
    INFO = "info-page",
    LOGIN = "login-page",
    MAIN = "main-page"
}

function renderPage (id: string){
    document.body.innerHTML = '';
    document.body.innerHTML = `<div id="${id}"></div>`;

    if (id === Pages.INFO){
        const info = new infoPage();
        console.log('info')
    }
    else if (id === Pages.LOGIN){
        const loginForm = new LoginForm();
    }
    else {
        console.log('def')
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
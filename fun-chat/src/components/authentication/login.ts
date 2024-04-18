import './login.css';
import loginFormRenderer from "./authPageRender";
import { checkInputs } from './validation/checkInputs';
import socket from '../api/soсket';
import createUser from '../api/createUser';

class LoginForm {
  constructor() {
    this.render();
    this.addEventListeners();
  }

  render() {
    loginFormRenderer();
  }

  addEventListeners() {
    const inputs: NodeListOf<HTMLInputElement> =
      document.querySelectorAll('#login-form input');

    const form = document.getElementById('login-form');

    // function handleSubmit(event: Event) {
    //  event.preventDefault(); 
    // }
    
function handleSubmit(event: Event) {
    event.preventDefault(); 

    const form = document.getElementById('login-form') as HTMLFormElement;
    const formData = new FormData(form);

    const login = formData.get('login') as string;
    const password = formData.get('password') as string;

    if (login && password) {
        createUser(login, password);
        sessionStorage.setItem('login', login);
        sessionStorage.setItem('password', password);
    } else {
        console.error('Login or password is missing');
    }
}


    // function handleKeyDown(event: KeyboardEvent) {
    //  if (event.key === 'Enter') {
    //     handleSubmit(event);
    //  }
    // }

    function handleKeyDown(event: KeyboardEvent) {
     if (event.key === 'Enter') {
        const form = document.getElementById('login-form') as HTMLFormElement;
        handleSubmit(new Event('submit', { bubbles: true, cancelable: true }));
     }
    }
    
    if (form) {
      form.addEventListener('submit', handleSubmit);
      form.addEventListener('keydown', handleKeyDown);
    }

    inputs.forEach((input) => {
      input.addEventListener('input', checkInputs);
    });

    checkInputs();
  }
}

export default LoginForm;

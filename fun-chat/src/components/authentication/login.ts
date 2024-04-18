import './login.css';
import loginFormRenderer from "./authPageRender";
import { checkInputs } from './validation/checkInputs';

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

    function handleSubmit(event: Event) {
     event.preventDefault(); 
    }
    
    function handleKeyDown(event: KeyboardEvent) {
     if (event.key === 'Enter') {
        handleSubmit(event);
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

export default function loginFormRenderer() {
    const form = document.createElement('form');
    form.id = 'login-form';
  
    const welcomeMessage = document.createElement('p');
    welcomeMessage.className = 'login__header';
    welcomeMessage.textContent = 'Authentication';
    form.appendChild(welcomeMessage);
  
    const loginInput = document.createElement('input');
    loginInput.className = 'login__input';
    loginInput.type = 'text';
    loginInput.id = 'login';
    loginInput.name = 'login';
    loginInput.placeholder = 'Login';
    loginInput.required = true;
    form.appendChild(loginInput);
  
    const loginError = document.createElement('span');
    loginError.id = 'loginError';
    loginError.className = 'error-message';
    form.appendChild(loginError);
  
    const password = document.createElement('input');
    password.className = 'login__input';
    password.type = 'text';
    password.id = 'password';
    password.name = 'password';
    password.placeholder = 'Password';
    password.required = true;
    form.appendChild(password);
  
    const passwordError = document.createElement('span');
    passwordError.id = 'passwordError';
    passwordError.className = 'error-message';
    form.appendChild(passwordError);
  
    const submitButton = document.createElement('button');
    submitButton.className = 'button__main';
    submitButton.id = 'submit-button'
    submitButton.type = 'submit';
    submitButton.textContent = 'Login';
    submitButton.disabled = true;
    form.appendChild(submitButton);

    const infoButton = document.createElement('button');
    infoButton.className = 'button__main info-button';
    infoButton.type = 'submit';
    infoButton.textContent = 'Info';
    form.appendChild(infoButton);
  
    const appElement = document.getElementById('login-page');
    if (appElement) {
      appElement.innerHTML = '';
      appElement.appendChild(form);
    }
  }
  
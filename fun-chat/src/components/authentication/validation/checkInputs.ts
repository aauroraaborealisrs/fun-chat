import { checkInputValidity } from './inputValidation';

function validateInput(
 inputId: string,
 errorId: string,
 regex: RegExp,
 minLength: number,
): boolean {
 const inputElement = document.getElementById(inputId) as HTMLInputElement | null;
 const errorElement = document.getElementById(errorId) as HTMLSpanElement | null;

 let isValid = true;

 if (!inputElement || !errorElement) {
    console.error('Input or error element is null');
    return false;
 }

 if (inputElement.value && inputElement.value.trim() === '') {
    errorElement.textContent = '';
    return false;
 }

 if (!regex.test(inputElement.value)) {
    isValid = false;
    if (inputId === 'login') {
      errorElement.textContent = 'Логин должен состоять только из латинских букв и быть не менее 3 символов';
    } else if (inputId === 'password') {
      if (inputElement.value && inputElement.value.trim() !== '') {
      isValid = false;
      errorElement.textContent = 'Пароль должен содержать минимум 1 латинскую букву и 1 цифру.';}
    } else {
      errorElement.textContent = 'Введенные данные не соответствуют требованиям.';
    }
 } else if (inputElement.value && inputElement.value.length < minLength) {
    isValid = false;
    errorElement.textContent = `Ввод должен содержать не менее ${minLength} символов.`;
 } else {
    errorElement.textContent = '';
 }

 return isValid;
}

function checkInputs() {
  let allFilled = true;
  let formValid = true;

  const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('#login-form input');

  inputs.forEach((input) => {
    const isValid = checkInputValidity(input);
    if (!isValid || !input.value.trim()) { 
      allFilled = false;
    }
  });


  const loginValid = validateInput(
  'login',
  'loginError',
  /^[A-Za-z]{3,}$/,
    3,
  );

  const passwordValid = validateInput(
  'password',
  'passwordError',
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,}$/, 
    1, 
  );

  formValid = loginValid && passwordValid;

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(input);
    });
  });

  const submitButton = document.getElementById(
    'submit-button',
  ) as HTMLButtonElement;

  if (allFilled && formValid && submitButton) {
    submitButton.style.backgroundColor = '6b3f34';
    submitButton.style.color = '6b3f34';
    submitButton.style.cursor = 'pointer';
    submitButton.disabled = false;
  } else if (submitButton) {
    submitButton.style.backgroundColor = 'e1caab';
    submitButton.style.color = 'black';
    submitButton.disabled = true;
  }
}

export { checkInputs };
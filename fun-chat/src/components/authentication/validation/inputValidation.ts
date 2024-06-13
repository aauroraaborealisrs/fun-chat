export default function checkInputValidity(input: HTMLInputElement): {
  isValid: boolean;
  errorMessage: string;
} {
  let isValid = true;
  let errorMessage = "";
  let regex: RegExp;

  if (input.value.trim() === "") {
    input.style.borderColor = "black";
    return { isValid: false, errorMessage: "" };
  }

  if (input.id === "login") {
    regex = /^[A-Za-z]{3,10}$/;
    if (!regex.test(input.value)) {
      isValid = false;
      errorMessage = "Логин должен содержать от 3 до 10 букв (только латиница)";
    }
  } else if (input.id === "password") {
    regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,}$/;
    if (!regex.test(input.value)) {
      isValid = false;
      errorMessage =
        "Пароль должен содержать хотя бы одну букву и одну цифру (только латиница)";
    }
  } else {
    regex = /^[A-Za-z-]+$/;
    if (!regex.test(input.value)) {
      isValid = false;
      errorMessage = "Введите корректные данные";
    }
  }

  if (!isValid) {
    input.style.borderColor = "red";
  } else {
    input.style.borderColor = "green";
  }

  return { isValid, errorMessage };
}

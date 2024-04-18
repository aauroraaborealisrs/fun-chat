function checkInputValidity(input: HTMLInputElement): boolean {
 let isValid = true;
 let regex: RegExp;
 const errors = document.querySelectorAll('.error-message');

 if (input.value.trim() === '') {
    input.style.borderColor = 'black';
    errors.forEach(error => {
      (error as HTMLElement).style.display = 'hidden';
     });
    return true;
 }

 if (input.id === 'login') {
    regex = /^[A-Za-z]{3,}$/;
 } else if (input.id === 'password') {
    regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,}$/;
 } else {
    regex = /^[A-Za-z-]+$/;
 }

 if (!regex.test(input.value)) {
    isValid = false;
 }

 if (!isValid) {
    input.style.borderColor = 'red';
 } else {
    input.style.borderColor = 'green';
 }

 return isValid;
}

export { checkInputValidity };

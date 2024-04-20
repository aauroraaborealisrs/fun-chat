// import checkInputValidity from "./inputValidation";


// function checkInputs() {
//  const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll("#login-form input");

//  inputs.forEach((input) => {
//     const { isValid, errorMessage } = checkInputValidity(input);

//     const errorElement = document.getElementById(`${input.id}Error`) as HTMLElement;
//     if (!isValid) {
//       errorElement.style.display = "block";
//       errorElement.textContent = errorMessage;
//     } else {
//       errorElement.style.display = "none";

//     }
//  });
// }

// export { checkInputs };


// function checkInputs() {
//   const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll("#login-form input");

//   inputs.forEach((input) => {
//     const { isValid, errorMessage } = checkInputValidity(input);

//     const errorElement = document.getElementById(`${input.id}Error`) as HTMLElement;
//     if (!isValid) {
//       errorElement.style.display = "block";
//       errorElement.textContent = errorMessage;
//     } else {
//       errorElement.style.display = "none";
//     }
//   });
// }

import checkInputValidity from "./inputValidation";

function checkInputs(): boolean {
  const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll("#login-form input");
  let allValid = true;
 
  inputs.forEach((input) => {
     const { isValid, errorMessage } = checkInputValidity(input);
 
     const errorElement = document.getElementById(`${input.id}Error`) as HTMLElement;
     if (!isValid) {
       errorElement.style.display = "block";
       errorElement.textContent = errorMessage;
       allValid = false; 
     } else {
       errorElement.style.display = "none";
     }
  });

 console.log(allValid)

 return allValid;
}

export { checkInputs };

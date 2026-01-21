import { post } from "/api.js";
import { validation } from "/helper.js";
import { storageKeys } from "/constants.js";

(() => {
    const loginButton = document.querySelector(".loginButton");

    if(!loginButton) return;

    loginButton.addEventListener("click", async (event) => {
        event.preventDefault();
        
        const loginEmailEl = document.getElementById("loginEmail");
        const loginPasswordEl = document.getElementById("loginPassword");

        const loginEmailValue = loginEmailEl.value.trim();
        const loginPasswordValue = loginPasswordEl.value.trim();
        
        const requestBody = {
            email: loginEmailValue,
            password: loginPasswordValue
        };

        const validationRules = {
            email: { pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/ },
            password: { minLength: 6 }
        }

        const isValid = validation(requestBody, validationRules);
            console.log(isValid);
       
        if(isValid.length > 0) {
            loginErrorMessage(isValid);
            return;
        }
        
        const url = `http://localhost:8080/login`;
        const result = await post(requestBody, url, "include");   
        
        const email = result.email;
        const username = result.username;
        const id = result.id;    

        console.log(localStorage.getItem(storageKeys.userInfoKey));
        
        const userinfo = {
            email: email,
            username: username,
            id: id
        };
        
        if (!userinfo) {
            console.log("bad one");
            return;
        }
        
        localStorage.setItem(storageKeys.userInfoKey, JSON.stringify(userinfo));

        window.location.href = "http://localhost:8080/mainpage";
    })
}) ();

function loginErrorMessage (validInput) {
    validInput.forEach(field => {
        if (field === "email") {
            const loginEmail = document.getElementById("loginEmail");
            loginEmail.style.color = "red";
            loginEmail.style.textShadow = "1px 1px 8px yellow";
            const loginEmailErrorMessage = document.querySelector(".loginEmailErrorMessage");
            loginEmailErrorMessage.innerText = "bad one";
            loginEmailErrorMessage.style.color = "red";
            loginEmailErrorMessage.style.textShadow = "1px 1px 8px yellow";
        }

        if (field === "password") {
            const loginPassword = document.getElementById("loginPassword");
            loginPassword.style.color = "red";
            loginPassword.style.textShadow = "1px 1px 8px yellow";
            const loginPasswordErrorMessage = document.querySelector(".loginPasswordErrorMessage");
            loginPasswordErrorMessage.innerText = "bad one";
            loginPasswordErrorMessage.style.color = "red";
            loginPasswordErrorMessage.style.textShadow = "1px 1px 8px yellow";
        }
    });
}
